import { Router } from 'express';
import uraRouter from './ura.js';
import onemapRouter from './onemap.js';

const apiRouter = Router();

apiRouter.use('/ura', uraRouter);
apiRouter.use('/onemap', onemapRouter);

apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'PropRadius Backend Service',
  });
});

export default apiRouter;
