const logger = require('../logger');
const Author = require('../models/Author').AuthorModel;



// create new author
// **
var createNewAuthor = (req, res, next) => {
    logger.info('Create new author fired. ' + Date(Date.now()));

    Author.create({
            name: req.body.name,
            books: req.body.books,
            birthYear: req.body.birthYear,
            prizes: req.body.prizes,
            date: new Date()
        },
        (err, author) => {
            if (err) return res.status(500).send(err.errmsg);
            res.status(200).send(author);
        });
};


// get average and sum of birth years of all authors
// **
var getAvg = (req, res, next) => {
    logger.info("get authors avg and sum of years. " + Date(Date.now()));
    Author.aggregate([{
            $match: {}
        },
        {
            $group: {
                _id: null,
                sum: {
                    $sum: "$birthYear"
                },
                avg: {
                    $avg: "$birthYear"
                }
            }
        },
        {
            $project: {
                _id: 0,
                sum: 1,
                avg: 1
            }
        }
    ]).then(author => {
        res.status(200).send(author);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
};



module.exports = {
    createNewAuthor,
    getAvg
}