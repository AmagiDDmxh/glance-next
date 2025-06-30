// Weather data types
export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  currentColumn: number;
  sunriseColumn: number;
  sunsetColumn: number;
  columns: WeatherColumn[];
  location: string;
  weatherCodeAsString: string;
  humidity?: number;
  windSpeed?: number;
}

export interface WeatherColumn {
  temperature: number;
  scale: number;
  hasPrecipitation: boolean;
}

export interface OpenMeteoPlace {
  name: string;
  area: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
}

export interface OpenMeteoPlacesResponse {
  results: OpenMeteoPlace[];
}

export interface OpenMeteoWeatherResponse {
  daily: {
    sunrise: number[];
    sunset: number[];
  };
  hourly: {
    temperature_2m: number[];
    precipitation_probability: number[];
  };
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
  };
}

// Weather code mapping
export const weatherCodeTable: Record<number, string> = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime Fog",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  56: "Drizzle",
  57: "Drizzle",
  61: "Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Freezing Rain",
  71: "Snow",
  73: "Moderate Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Rain",
  81: "Moderate Rain",
  82: "Heavy Rain",
  85: "Snow",
  86: "Snow",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

// Country abbreviations
const commonCountryAbbreviations: Record<string, string> = {
  US: "United States",
  USA: "United States",
  UK: "United Kingdom",
};

// Utility functions
function expandCountryAbbreviations(name: string): string {
  const expanded = commonCountryAbbreviations[name.trim()];
  return expanded || name;
}

function parsePlaceName(name: string): [string, string] {
  const parts = name.split(",");

  if (parts.length === 1) {
    return [name, ""];
  }

  if (parts.length === 2) {
    return [`${parts[0]}, ${expandCountryAbbreviations(parts[1])}`, ""];
  }

  return [
    `${parts[0]}, ${expandCountryAbbreviations(parts[2])}`,
    parts[1].trim(),
  ];
}

// API functions
export async function fetchOpenMeteoPlaceFromName(
  location: string
): Promise<OpenMeteoPlace> {
  const [parsedLocation, area] = parsePlaceName(location);
  const requestUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    parsedLocation
  )}&count=20&language=en&format=json`;

  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch places data: ${response.statusText}`);
  }

  const responseJson: OpenMeteoPlacesResponse = await response.json();

  if (responseJson.results.length === 0) {
    throw new Error(`No places found for ${location}`);
  }

  let place: OpenMeteoPlace;

  if (area) {
    const areaLower = area.toLowerCase();
    place =
      responseJson.results.find(
        (result) => result.area.toLowerCase() === areaLower
      ) || responseJson.results[0];

    if (!place) {
      throw new Error(`No place found for ${location} in ${area}`);
    }
  } else {
    place = responseJson.results[0];
  }

  return place;
}

export async function fetchWeatherForOpenMeteoPlace(
  place: OpenMeteoPlace,
  units: string
): Promise<WeatherData> {
  const temperatureUnit = units === "imperial" ? "fahrenheit" : "celsius";

  const query = new URLSearchParams({
    latitude: place.latitude.toString(),
    longitude: place.longitude.toString(),
    timeformat: "unixtime",
    timezone: place.timezone,
    forecast_days: "1",
    current: "temperature_2m,apparent_temperature,weather_code",
    hourly: "temperature_2m,precipitation_probability",
    daily: "sunrise,sunset",
    temperature_unit: temperatureUnit,
  });

  const requestUrl = `https://api.open-meteo.com/v1/forecast?${query.toString()}`;

  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  const responseJson: OpenMeteoWeatherResponse = await response.json();

  const now = new Date();
  const currentBar = Math.floor(now.getHours() / 2);

  const sunriseTime = new Date(responseJson.daily.sunrise[0] * 1000);
  const sunsetTime = new Date(responseJson.daily.sunset[0] * 1000);

  const sunriseBar = Math.floor(sunriseTime.getHours() / 2);
  const sunsetBar = Math.max(0, Math.floor((sunsetTime.getHours() - 1) / 2));

  const bars: WeatherColumn[] = [];

  if (responseJson.hourly.temperature_2m.length === 24) {
    const temperatures: number[] = [];
    const precipitations: boolean[] = [];

    const t = responseJson.hourly.temperature_2m;
    const p = responseJson.hourly.precipitation_probability;

    for (let i = 0; i < 24; i += 2) {
      if (i / 2 === currentBar) {
        temperatures[i / 2] = responseJson.current.temperature_2m;
      } else {
        temperatures[i / 2] = Math.round((t[i] + t[i + 1]) / 2);
      }

      precipitations[i / 2] = (p[i] + p[i + 1]) / 2 > 75;
    }

    const minT = Math.min(...temperatures);
    const maxT = Math.max(...temperatures);
    const temperaturesRange = maxT - minT;

    for (let i = 0; i < 12; i++) {
      bars.push({
        temperature: temperatures[i],
        hasPrecipitation: precipitations[i],
        scale:
          temperaturesRange > 0
            ? (temperatures[i] - minT) / temperaturesRange
            : 1,
      });
    }
  }

  const weatherCode = responseJson.current.weather_code;
  const description = weatherCodeTable[weatherCode] || "Unknown";

  return {
    temperature: Math.round(responseJson.current.temperature_2m),
    apparentTemperature: Math.round(responseJson.current.apparent_temperature),
    weatherCode,
    currentColumn: currentBar,
    sunriseColumn: sunriseBar,
    sunsetColumn: sunsetBar,
    columns: bars,
    location: place.name,
    weatherCodeAsString: description,
  };
}

// Main weather fetching function
export async function fetchWeatherData(
  location: string,
  units = "metric"
): Promise<{ weather: WeatherData; place: OpenMeteoPlace }> {
  try {
    const place = await fetchOpenMeteoPlaceFromName(location);
    const weather = await fetchWeatherForOpenMeteoPlace(place, units);
    return { weather, place };
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error}`);
  }
}
