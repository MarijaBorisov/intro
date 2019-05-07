var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var logger = require('../util/logger');
var conn= require('../util/databaseMySQL');

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
