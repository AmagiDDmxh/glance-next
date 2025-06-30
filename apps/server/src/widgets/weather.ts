import axios from 'axios';
import { WeatherWidget } from '@glance/shared';

export class WeatherWidgetHandler {
  async fetchData(widget: WeatherWidget): Promise<any> {
    try {
      // Using OpenWeatherMap API as an example
      const apiKey = process.env.OPENWEATHER_API_KEY || '';
      const units = widget.units === 'imperial' ? 'imperial' : 'metric';
      
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(widget.location)}&units=${units}&appid=${apiKey}`
      );
      
      const data = response.data;
      return {
        location: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000)
      };
    } catch (error) {
      console.error('Weather widget error:', error);
      throw error;
    }
  }
} 