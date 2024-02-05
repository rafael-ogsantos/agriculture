import express from 'express';
import request from 'supertest';
import { CreateProducerSchema, UpdateProducerSchema } from '../../../src/api/producers/schema';
import { validation } from '../../../src/infra/middlewares/validation';
import { producerCreationMock } from '../../../src/modules/producers/mocks/producer.mock';


describe('Validation Middleware', () => {
    let app;
  
    beforeEach(() => {
      app = express();
      app.use(express.json());
      app.post('/', validation(CreateProducerSchema), (req, res) => res.status(200).json({ message: 'Success' }));
    //   app.put('/:id', validation(UpdateVehicleSchema), (req, res) => res.status(200).json({ message: 'Success' }));
    });
  
    it('should return 400 for invalid data', async () => {
      const vehicleData = {
          brand: 'Ferrari',
      };
  
      const res = await request(app)
        .post('/')
        .send(vehicleData);
  
      expect(res.status).toBe(400);
    });
  
    it('should return 200 for valid data', async () => {  
      const res = await request(app)
        .post('/')
        .send(producerCreationMock);
  
      expect(res.status).toBe(200);
    });
  
  
    it('should validate fields when editing a producer', async () => {
      app.put('/:id', validation(UpdateProducerSchema), (req, res) => res.status(200).json({ message: 'Success' }));
  
      const producerData = {
        state: 'Happy State',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        crops: ['Soy', 'invalid'],
      };
  
      const res = await request(app)
        .put('/1')
        .send(producerData);
  
      expect(res.status).toBe(400);
    });
  });