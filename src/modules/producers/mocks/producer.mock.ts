import { pick } from 'lodash';
import { Crops, Producer } from "../schema";

export const producerMock: Producer = {
    id: 1,
    cpfOrCnpj: '12345678909',
    name: 'John Doe',
    farm: 'Happy Farm',
    city: 'Happy City',
    state: 'Happy State',
    totalArea: 100,
    arableArea: 50,
    vegetationArea: 50,
    crops: [Crops.Soy, Crops.Corn],
}


export const producerCreationMock = pick(producerMock, [
    'cpfOrCnpj', 
    'name',
    'farm',
    'city',
    'state',
    'totalArea',
    'arableArea',
    'vegetationArea',
    'crops',
]) as Producer;