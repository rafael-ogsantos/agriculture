import Joi from 'joi';
import { Crops, ProducerInput } from '../../modules/producers/schema';

export const CreateProducerSchema = Joi.object<ProducerInput>({
    cpfOrCnpj: Joi.string().required(),
    name: Joi.string(),
    farm: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    totalArea: Joi.number().required(),
    arableArea: Joi.number().required(),
    vegetationArea: Joi.number().required(),
    crops: Joi.array().items(Joi.string().valid(Crops.Coffee, Crops.Corn, Crops.Rice, Crops.Soy, Crops.Sugarcane)).required(),
});

export const UpdateProducerSchema = Joi.object<ProducerInput>({
    cpfOrCnpj: Joi.string(),
    name: Joi.string(),
    farm: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    totalArea: Joi.number(),
    arableArea: Joi.number(),
    vegetationArea: Joi.number(),
    crops: Joi.array().items(Joi.string().valid(Crops.Coffee, Crops.Corn, Crops.Rice, Crops.Soy, Crops.Sugarcane)),
});