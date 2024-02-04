import { Knex } from "knex";
import { fieldMapping, toDbFormat } from "../../utils/fieldMapping";
import RepositoryInterface from "./interfaces/repository";
import { Producer, ProducerInput } from "./schema";


export default class Repository implements RepositoryInterface {
    constructor(private knex: Knex) {}

    public async create(producer: ProducerInput): Promise<Producer> {
        const existingProducer = await this.knex('producers').where('cpf_or_cnpj', producer.cpfOrCnpj).first();
    
        if (existingProducer) {
            throw new Error('A producer with this CPF or CNPJ already exists');
        }
    
        const producerInDbFormat = toDbFormat(producer, fieldMapping);
        const [createdProducer] = await this.knex('producers').insert(producerInDbFormat).returning('*');
    
        return createdProducer as Producer;
    }

    public async update(id: number, producer: ProducerInput): Promise<Producer> {
        const existingProducer = await this.knex('producers').where('id', id).first();

        if (!existingProducer) {
            throw new Error('Producer not found');
        }

        const producerInDbFormat = toDbFormat(producer, fieldMapping);
        const [updatedProducer] = await this.knex('producers').where('id', id).update(producerInDbFormat).returning('*');
    
        return updatedProducer;
    }

    public async findAll(): Promise<Producer[]> {
        const producers = await this.knex('producers');
    
        return producers;
    }

    public async findById(id: number): Promise<Producer | null> {
        const producer = await this.knex('producers').where('id', id).first();
    
        return producer;
    }

    public async delete(id: number): Promise<void> {
        await this.knex('producers').where('id', id).delete();
    }

    public async findByCpfOrCnpj(cpfOrCnpj: string): Promise<Producer | null> {
        const producer = await this.knex('producers').where('cpf_or_cnpj', cpfOrCnpj).first();
    
        return producer;
    }
}