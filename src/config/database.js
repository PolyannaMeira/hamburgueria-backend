const configDatabase = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL || undefined,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5434',
  database: process.env.DB_NAME || 'Devburger',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  dialectOptions: process.env.DATABASE_URL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  define: {
    timestamps: true,
    underscored: true,
    underscoreAll: true,
  },
};

export default configDatabase;
