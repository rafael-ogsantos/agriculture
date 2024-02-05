import { ValidationStrategy } from "../interfaces/validation";
import { ProducerInput } from "../schema";

export class AreaValidation implements ValidationStrategy {
    validate(producer: ProducerInput) {
        const { totalArea, arableArea, vegetationArea } = producer;
        const sum = Number(arableArea) + Number(vegetationArea);
        if (sum > totalArea) {
            throw new Error('The arable area and vegetation area cannot be greater than the total area');
        }
    }
}