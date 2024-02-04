import { Producer, ProducerInput } from "../schema";

export const ProducerRepositoryToken = 'ProducerRepository';

export default interface RepositoryInterface {
    create(producer: ProducerInput): Promise<Producer>;
    findAll(): Promise<Producer[]>;
    findByCpfOrCnpj(cpfOrCnpj: string): Promise<Producer | null>;
    findById(id: number): Promise<Producer | null>;
    update(id: number, producer: Producer): Promise<Producer>;
    delete(id: number): Promise<void>;
}