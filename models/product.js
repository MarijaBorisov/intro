// const db = require("../config/dbMySql");

// module.exports = class Product {
//     constructor(id, name) {
//         this.id = id;
//         this.name = name;
//     }
//     save() {

//     }

//     static findAll() {
//         return db.execute('SELECT * FROM products');
//     }

//     static createProduct(prod) {
//         return db.execute('INSERT INTO products (name) VALUES (?)', [prod.name]);
//     }
//     static deleteProduct(id) {
//         return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
//     }
//     static findByID(id) {
//         return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//     }

//     static updateProduct(name, id) {
//         return db.execute('UPDATE products SET products.name = ? WHERE products.id = ?', [name, id]);
//     }
// }
const Sequelize = require('sequelize');
const sequelize = require('../config/dbMySql');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = Product;