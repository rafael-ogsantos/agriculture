const knexfile = {
  development: {
    client: 'postgres',
    connection: {
      host: 'postgres',
      user: 'postgres',
      password: 'root',
      database: 'agriculture',
      port: 5432,
    },
    migrations: {
      directory: './migrations'
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'mysql',
      user: 'raizen',
      password: 'raizen',
      database: 'raizen',
      port: 33006,
    },
    migrations: {
      directory: './migrations'
    },
  }
}

export default knexfile;