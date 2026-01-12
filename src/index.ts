import { Hono } from 'hono';
import { loggingMiddleware } from './middleware/logger';
import { registerRoutes } from './routes';

const app = new Hono();

app.use('*', loggingMiddleware);

registerRoutes(app);

export default app;
