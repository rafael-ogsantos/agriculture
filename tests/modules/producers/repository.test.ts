import knex from "knex";
import knexConfig from "../../../knexfile";
import { producerCreationMock } from "../../../src/modules/producers/mocks/producer.mock";
import Repository from "../../../src/modules/producers/repository";

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

describe('ProducersRepository', () => {
    let repository: Repository;;
    beforeEach(async () => {
        const hasTable = await db.schema.hasTable('producers');

        if (!hasTable) {
            await db.schema.createTable('producers', function (table) {
                table.increments();
                table.string('cpf_or_cnpj').unique().notNullable();
                table.string('producer_name').notNullable();
                table.string('farm_name').notNullable();
                table.string('city').notNullable();
                table.string('state').notNullable();
                table.decimal('total_area_hectares').notNullable();
                table.decimal('arable_area_hectares').notNullable();
                table.decimal('vegetation_area_hectares').notNullable();
                table.json('crops').notNullable(); // Changed from table.enu to table.json
                table.timestamps(true, true);
            });
        } else {
            await db('producers').delete();
        }

        repository = new Repository(db);
    });

    it('should create a producer', async () => {
        const producerCreated = await repository.create(producerCreationMock);

        expect(producerCreated).toHaveProperty('id');
        expect(producerCreated).toHaveProperty('cpfOrCnpj', producerCreationMock.cpfOrCnpj);
    });

    it('should not create a producer with the same cpf_or_cnpj', async () => {
        await repository.create(producerCreationMock);

        try {
            await repository.create(producerCreationMock);
        } catch (error) {
            expect(error).toHaveProperty('message', 'A producer with this CPF or CNPJ already exists');
        }
    });

    it('should update a producer', async () => {
        const producerCreated = await repository.create(producerCreationMock);
        const producerUpdated = await repository.update(producerCreated.id, { ...producerCreationMock, name: 'Updated Name' });

        expect(producerUpdated).toHaveProperty('id', producerCreated.id);
        expect(producerUpdated).toHaveProperty('name', 'Updated Name');
    });

    it('should not update a producer that does not exist', async () => {
        try {
            await repository.update(33232323, producerCreationMock);
        } catch (error) {
            expect(error).toHaveProperty('message', 'Producer not found');
        }
    });
});