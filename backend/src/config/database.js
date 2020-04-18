module.exports = {
    username: 'root', //not final
    password: 'root', //not final
    database: 'testeDatabase', //not final
    host: '127.0.0.1', //not final
    dialect: 'mysql',
  //logging: false, //don't show in console the sql statement that is being executed
  operatorsAliases: 0,
  query: { raw: true },
  define: {
    timestamps: false //Don't use created_at and updated_at
  }
}