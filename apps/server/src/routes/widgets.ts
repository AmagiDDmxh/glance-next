import { Hono } from 'hono';
import { getWidgetData } from '../services/widgets';

const router = new Hono();

// Get widget data by ID
router.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await getWidgetData(id);
    
    if (!data) {
      return c.json({ error: 'Widget not found' }, 404);
    }
    
    return c.json(data);
  } catch (error) {
    return c.json({ error: 'Failed to load widget data' }, 500);
  }
});

// Update widget (for interactive widgets like todo)
router.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    
    // TODO: Implement widget update logic
    return c.json({ message: 'Widget updated successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to update widget' }, 500);
  }
});

export { router as widgetsRouter }; 