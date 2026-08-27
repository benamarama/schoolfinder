import { Router } from 'express';
import uraRouter from './ura.js';

const apiRouter = Router();

apiRouter.use('/ura', uraRouter);

apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'PropRadius Backend Service',
  });
});

export default apiRouter;
