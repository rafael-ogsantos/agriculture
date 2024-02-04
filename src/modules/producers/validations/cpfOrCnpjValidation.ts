import { validateCpfOrCnpj } from "../../../utils/validateCpfOrCnpj";
import { ValidationStrategy } from "../interfaces/validation";
import { ProducerInput } from "../schema";

export class CpfOrCnpjValidation implements ValidationStrategy {
    validate(producer: ProducerInput) {
        if (!validateCpfOrCnpj(producer.cpfOrCnpj)) {
            throw new Error('Invalid CPF or CNPJ');
        }
    }
}