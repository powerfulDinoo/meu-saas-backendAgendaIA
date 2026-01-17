import app from './app';
import { config } from './config/env';
import { logger } from './utils/logger';
import process from 'process';

const PORT = config.port;

const server = app.listen(PORT, () => {
  logger.info(`🚀 AgendaIA Backend rodando na porta ${PORT}`);
  logger.info(`Ambiente: ${config.nodeEnv}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM recebido. Encerrando graciosamente.');
  server.close(() => {
    logger.info('Servidor encerrado.');
    process.exit(0);
  });
});