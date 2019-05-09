const Product = require('../models/product.js');
const logger = require('../logger');

module.exports.createProduct = (req, res, next) => {
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

module.exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(product => {
            res.status(200).send(product);
            logger.info('All products have been fetched.');
        })
        .catch(err => {
            res.status(404).send('404');
            logger.error('Failed to get products.');
        });
}
module.exports.getProductById = (req, res, next) => {
    Product.findAll({ where: { id: req.body.id } })
        .then(product => {
            logger.info('Product has been fetched.')
            res.status(200).send(product[0])
        })
        .catch(err => {
            res.status(404).send('404');
            logger.error('Failed to get product !')
        })

}