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