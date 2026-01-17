import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import healthRoutes from './routes/health';
import webhookRoutes from './routes/webhooks';
import apiRoutes from './routes/api.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(morgan('combined'));

// Raw Body é CRÍTICO para validar a assinatura do Zaprite
app.use(express.json({
  limit: '10mb',
  verify: (req: any, res, buf) => {
    if (req.url.startsWith('/webhook-zaprite')) {
      req.rawBody = buf;
    }
  }
}));

// Rotas
app.use('/health', healthRoutes);

// Rota específica solicitada para o Webhook
app.use('/webhook-zaprite', webhookRoutes);

// Rotas da API principal
app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;