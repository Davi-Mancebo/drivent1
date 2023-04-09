import { Router } from 'express';
import cepFinder from '@/controllers/cep-controller';

const cepRouter = Router();

cepRouter.get('/sign-in', cepFinder);

export { cepRouter };
