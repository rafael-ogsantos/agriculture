import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('producers', function(table) {
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
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('producers');
}