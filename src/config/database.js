 const configDatabase = {
    dialect: 'postgres',
    host:'localhost',
    port: '5434',
    database: 'Devburger',
    username: 'postgres',
    password: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        underscoreAll: true,
},
}
export default configDatabase