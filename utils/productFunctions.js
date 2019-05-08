
const Product = require('../models/product');
const logger = require('../config/logger').logger;

/// Sequelize ///

var createProduct = (req, res, next) => {
    Product.create(req.body)
        .then(product => {
            logger.info('Product has been added!')
            res.status(200).send(product)
        })
        .catch(err => {
            res.status(404).send('404');
            logger.error('Failed to add product!')
        });

}
var getAllProducts = (req, res, next) => {
    Product.findAll()
        .then(product => {
            res.status(200).send(product);
            logger.info('All products have been returned.');
        })
        .catch(err => {
            res.status(404).send('404');
            logger.error('Failed to get products.');
        });
}
var getProductById = (req, res, next) => {
    Product.findAll({ where: { id: req.body.id } })
        .then(product => {
            logger.info('Product has been successfully taken.')
            res.status(200).send(product[0])
        })
        .catch(err => {
            res.status(404).send('404');
            logger.error('Failed to get product from databese!')
        })

}

var removeProductById = (req, res, next) => {
    Product.destroy({ where: { id: req.body.id } })
        .then(product => {
            res.send('Product has been removed!')
            logger.info('Product has been removed!')
        })
        .catch(err => {
            res.status(404).send('404');
            logger.error('Failed to remove product! - ' + err)
        })
}
var updateProduct = (req, res, next) => {
    Product.findAll({ where: { id: req.body.id } })
        .then(product => {

            product[0].update({
                id: req.body.id,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description
            })
            res.send('Product has been updated!')
        })
        .catch(err => {
            res.status(404).send('404');
            logger.error('Failed to update product!' + err)
        })
}
exports.productComponents = {
    getProductById,
    createProduct,
    getAllProducts,
    removeProductById,
    updateProduct
}