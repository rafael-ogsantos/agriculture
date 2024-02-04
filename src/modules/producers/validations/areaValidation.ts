import { ValidationStrategy } from "../interfaces/validation";
import { ProducerInput } from "../schema";

export class AreaValidation implements ValidationStrategy {
    validate(producer: ProducerInput) {
        const { totalArea, arableArea, vegetationArea } = producer;
        if (totalArea < arableArea + vegetationArea) {
            throw new Error('The arable area and vegetation area cannot be greater than the total area');
        }
    }
}