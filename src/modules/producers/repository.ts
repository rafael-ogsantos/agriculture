import { Knex } from "knex";
import { fieldMapping, producerWithNumbers, toCamelCase, toDbFormat } from "../../utils/fieldMapping";
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
    
        return toCamelCase(producerWithNumbers(createdProducer)) as unknown  as Producer;
    }

    public async update(id: number, producer: ProducerInput): Promise<Producer> {
        const existingProducer = await this.knex('producers').where('id', id).first();

        if (!existingProducer) {
            throw new Error('Producer not found');
        }

        const producerInDbFormat = toDbFormat(producer, fieldMapping);
        const [updatedProducer] = await this.knex('producers').where('id', id).update(producerInDbFormat).returning('*');
    
        return toCamelCase(producerWithNumbers(updatedProducer)) as unknown  as Producer;
    }

    public async findAll(): Promise<Producer[]> {
        const producers = await this.knex('producers').orderBy('id', 'asc');

        return toCamelCase(producerWithNumbers(producers)) as unknown as Producer[];
    }

    public async findById(id: number): Promise<Producer | null> {
        const producer = await this.knex('producers').where('id', id).first();
        if (!producer) {
            throw new Error('Producer not found');;
        }

        return toCamelCase(producerWithNumbers(producer)) as unknown as Producer;
    }

    public async delete(id: number): Promise<void> {
        await this.knex('producers').where('id', id).delete();
    }

    public async findByCpfOrCnpj(cpfOrCnpj: string): Promise<Producer | null> {
        const producer = await this.knex('producers').where('cpf_or_cnpj', cpfOrCnpj).first();
    
        return producer;
    }
}