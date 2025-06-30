import axios from 'axios';
import { MarketsWidget } from '@glance/shared';

export class MarketsWidgetHandler {
  async fetchData(widget: MarketsWidget): Promise<any> {
    try {
      const symbols = widget.markets.map(market => market.symbol).join(',');
      
      // Using Yahoo Finance API as an example
      const response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbols}?interval=1d&range=1d`
      );
      
      const quotes = response.data.chart.result[0].quote;
      const meta = response.data.chart.result[0].meta;
      
      const marketData = widget.markets.map((market, index) => {
        const currentPrice = quotes.regularMarketPrice[index];
        const previousClose = quotes.regularMarketPreviousClose[index];
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;
        
        return {
          symbol: market.symbol,
          name: market.name,
          price: currentPrice,
          change: change,
          changePercent: changePercent,
          volume: quotes.regularMarketVolume[index],
          high: quotes.regularMarketDayHigh[index],
          low: quotes.regularMarketDayLow[index]
        };
      });
      
      return { markets: marketData };
    } catch (error) {
      console.error('Markets widget error:', error);
      throw error;
    }
  }
} 