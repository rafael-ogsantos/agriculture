import { Crops } from "../modules/producers/schema";

export const fieldMapping = {
    id: 'id',
    cpfOrCnpj: 'cpf_or_cnpj',
    name: 'producer_name',
    farm: 'farm_name',
    city: 'city',
    state: 'state',
    totalArea: 'total_area_hectares',
    arableArea: 'arable_area_hectares',
    vegetationArea: 'vegetation_area_hectares',
    crops: 'crops',
};

export function toDbFormat(input: any, fieldMapping: any): any {
    const output: any = {};
    for (const key in input) {
        if (input.hasOwnProperty(key) && fieldMapping.hasOwnProperty(key)) {
            if (key === 'crops') {
                output[fieldMapping[key]] = JSON.stringify(input[key].map((crop: Crops) => Crops[crop]));
            } else if (typeof input[key] === 'object' && !Array.isArray(input[key])) {
                output[fieldMapping[key]] = toDbFormat(input[key], fieldMapping);
            } else {
                output[fieldMapping[key]] = input[key];
            }
        }
    }
    return output;
}

export function toCamelCase(obj: any) {
    if (Array.isArray(obj)) {
      return obj.map(item => toCamelCase(item));
    }
  
    const newObj: any = {};
    const keyMap: { [key: string]: string } = {
      cpf_or_cnpj: 'cpfOrCnpj',
      producer_name: 'name',
      farm_name: 'farm',
      total_area_hectares: 'totalArea',
      arable_area_hectares: 'arableArea',
      vegetation_area_hectares: 'vegetationArea',
    };
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = keyMap[key] || key;
        newObj[newKey] = obj[key];
      }
    }
  
    return newObj;
}

export const producerWithNumbers = (producer) => {
   if (Array.isArray(producer)) {
        return producer.map(producerWithNumbers);       
   }

   return {
        ...producer,
        totalArea: Number(producer.total_area_hectares),
        arableArea: Number(producer.arable_area_hectares),
        vegetationArea: Number(producer.vegetation_area_hectares),
   }
};