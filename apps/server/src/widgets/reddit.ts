import axios from 'axios';
import { RedditWidget } from '@glance/shared';

export class RedditWidgetHandler {
  async fetchData(widget: RedditWidget): Promise<any> {
    try {
      const url = `https://www.reddit.com/r/${widget.subreddit}/hot.json?limit=${widget.limit || 10}`;
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Glance-Dashboard/1.0'
        }
      });
      
      const posts = response.data.data.children.map((child: any) => ({
        title: child.data.title,
        url: `https://reddit.com${child.data.permalink}`,
        author: child.data.author,
        score: child.data.score,
        comments: child.data.num_comments,
        thumbnail: child.data.thumbnail,
        created: child.data.created_utc,
        subreddit: child.data.subreddit
      }));
      
      return { posts };
    } catch (error) {
      console.error('Reddit widget error:', error);
      throw error;
    }
  }
} 