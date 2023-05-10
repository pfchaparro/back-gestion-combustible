require('dotenv').config();

module.exports = {

    // Conection
    username: process.env.USERNAME || "root",
    password: process.env.PASSWORD || "password",
    database: process.env.DATABASE || "fuel_management",
    host: process.env.HOST || "localhost",
    dialect: "mysql",

    // Configurar Seeds
    seederStorage: "sequelize",
    //seederStoragePath: "sequelizeSeeds.json",
    seederStorageTableName: "seeds",

    // Configurar Migraciones
    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations",

    define: {
        timestamps: false,

        // Genera claves foraneas de este tipo user_id en vez de userId
        underscored: true
    }
}