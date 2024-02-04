import { ProducerInput } from "../schema";

export interface ValidationStrategy {
    validate(producer: ProducerInput): void;
}
