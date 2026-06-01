import { Hono } from 'hono';
import { cors } from 'hono/cors';
import categoriesRoute from './routes/categories';
import quizzesRoute from './routes/quizzes';
import submitRoute from './routes/submit';
import resultsRoute from './routes/results';
import lookupsRoute from './routes/lookups';
import numerologyRoute from './routes/numerology';

type Env = {
  Bindings: {
    DB: D1Database;
  };
};

const app = new Hono<Env>();

app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

app.route('/api', categoriesRoute);
app.route('/api', quizzesRoute);
app.route('/api', submitRoute);
app.route('/api', resultsRoute);
app.route('/api', lookupsRoute);
app.route('/api', numerologyRoute);

export default app;
