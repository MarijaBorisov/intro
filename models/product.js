const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const logger = require('../util/logger');
const Sequelize = require('sequelize');
const sequelize = require('../util/databaseMySQL');

const Product = sequelize.define('product',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;

/*

module.exports = class Product {
    constructor(id, title, price, description){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    save() {

    }
    static deleteById(id){
        return conn.execute('DELETE FROM products WHERE products.product_id = ?', [id]);
    }
    static fetchAll(){
        return conn.execute('SELECT * FROM products');
    }
    static fetchById(id){
        return conn.execute('SELECT * FROM products WHERE products.product_id = ?', [id]);
    }
    static createProduct(product){
        return conn.execute('INSERT INTO products (title,price,description) VALUES (?,?,?)', [product.title, product.price, product.description]);
    }
    static update(product){
        return conn.execute('UPDATE products SET products.title = ?, products.price = ?, products.description = ? WHERE products.product_id = ?',[product.title, product.price, product.description, product.id]);
    }
}
*/
