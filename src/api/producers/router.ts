import express, { Request, Response, Router } from 'express';
// import knex from '../../../knex';
import knex from 'knex';
import knexfile from '../../../knexfile';
import { validation } from '../../infra/middlewares/validation';
import ProducerRepository from '../../modules/producers/repository';
import ProducersService from '../../modules/producers/service';
import { AreaValidation } from '../../modules/producers/validations/areaValidation';
import { CpfOrCnpjValidation } from '../../modules/producers/validations/cpfOrCnpjValidation';
import { ValidateCropType } from '../../modules/producers/validations/validateCropType';
import { CreateProducerSchema, UpdateProducerSchema } from './schema';
;

const validations = [
  new CpfOrCnpjValidation(),
  new AreaValidation(),
  new ValidateCropType(),
];

const knexConfig = knexfile.development;
const db = knex(knexConfig);
console.log('Knex initialized with config:', knexConfig);

const service = new ProducersService(new ProducerRepository(db), validations);

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const producers = await service.findAll();
  res.status(200).json(producers)
});

router.post('/', validation(CreateProducerSchema), async (req: Request, res: Response) => {
  try {
    const producer = await service.create(req.body);
    res.status(201).json(producer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const producer = await service.findById(Number(req.params.id));
    res.status(200).json(producer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.put('/:id', validation(UpdateProducerSchema), async (req: Request, res: Response) => {
  try {
    const producer = await service.update(Number(req.params.id), req.body);
    res.status(200).json(producer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await service.delete(Number(req.params.id));
    res.status(204).send({ message: 'Producer deleted'});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

export default router;