var Product = require('../../models/product');
var logger = require('../../util/logger');
// var conn= require('../../util/databaseMySQL');

//MySQL

var getAllProducts = (req, res, next) => {
    
    Product.fetchAll()
    .then(product => {
        
        res.status(200).send(product);
        logger.info('All products has been successfully taken.');
    })
    .catch(err => {
        
        res.status(404).send('404');
        logger.error('Failed to add user.');
    });
}
var createProduct = (req, res, next) => {
    
    Product.createProduct(req.body) 
    .then(product => {
        logger.info('Successfully added product!')
         res.status(200).send(product)
    })
    .catch(err => {
        res.status(404).send('404');
      logger.error('Failed to add product!')
   });

}
var removeProductById = (req,res,next) => {

  Product.deleteById(req.params.id)
   .then(product => {
         logger.info('Successfully removed product!')
         res.status(200).send(product)

   })
   .catch(err => {
        res.status(404).send('404');
      logger.error('Failed to remove product!')
   })
}
var getProductPageById = (req,res,next) => {
    Product.fetchById(req.params.id)
   .then(product => {
         logger.info('Product has been successfully taken.')
         res.status(200).send(product[0])

   })
   .catch(err => {
      res.status(404).send('404');
      logger.error('Failed to take product from databese!')
   })
}

var updateProduct = (req,res,next) => {
    Product.update(req.body)
   .then(product => {
         logger.info('Product has been successfully updated.')
         res.status(200).send(product[0])

   })
   .catch(err => {
      res.status(404).send('404');
      logger.error('Failed to update product!')
   })


}

exports.productComponents = {
    getProductPageById,
    createProduct,
    getAllProducts,
    removeProductById,
    updateProduct  
}