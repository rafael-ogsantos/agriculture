import ProducerRepository from "./interfaces/repository";
import { ValidationStrategy } from './interfaces/validation';
import { Producer, ProducerInput } from './schema';

export default class Service {
    constructor(
        private producerRepository: ProducerRepository,
        private validations: ValidationStrategy[],
    ) {}

    async create(producer: ProducerInput): Promise<Producer> {
        for (const validation of this.validations) {
            validation.validate(producer);
        }

        return this.producerRepository.create(producer);
    }

    async findAll(): Promise<Producer[]> {
        return this.producerRepository.findAll();
    }

    async findById(id: number): Promise<Producer | null> {
        return this.producerRepository.findById(id);
    }

    async update(id: number, producer: Producer): Promise<Producer> {
        
        let existingProducer = await this.producerRepository.findById(id);
        if (producer.cpfOrCnpj) {
            const existingProducer = await this.producerRepository.findByCpfOrCnpj(producer.cpfOrCnpj);
            if (existingProducer && existingProducer.id !== id) {
                throw new Error('A producer with this CPF or CNPJ already exists');
            }
        }
        
        const updatedProducer = { ...existingProducer, ...producer } as unknown as ProducerInput;
        for (const validation of this.validations) {
            validation.validate(updatedProducer);
        }

        return this.producerRepository.update(id, producer);
    }

    async delete(id: number): Promise<void> {
        return this.producerRepository.delete(id);
    }
}