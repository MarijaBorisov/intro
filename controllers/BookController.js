const logger = require('../logger');
const {
    BookModel
} = require('../models/Book');


// CREATE NEW BOOK
// **
var newBook = (req, res, next) => {
    logger.info('Create new book fired. ' + Date(Date.now()));

    BookModel.create({
            author: req.body.author,
            title: req.body.title,
            genre: req.body.genre,
            pages: req.body.pages,
            copies: req.body.copies,
            date: new Date()
        },
        (err, book) => {
            console.log(err);
            if (err) return res.status(500).send(err.errmsg);

            res.status(200).send(book);
        });
};


// get difference in the pages from two last added books in db
// **
var getDiff = (req, res, next) => {
    logger.info("getDiff fired. " + Date(Date.now()));

    BookModel.aggregate([{
            $match: {}
        },
        {
            $sort: {
                _id: -1
            }
        },
        {
            $limit: 2
        },
        {
            $group: {
                _id: null,
                min: {
                    $first: "$pages" //or use $min and $max
                },
                max: {
                    $last: "$pages"
                },
            }
        },
        {
            $project: {
                _id: 0,
                'Page difference': {
                    $subtract: ['$max', '$min']
                },
            }
        }
    ]).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
};


// DATE DIFFERENCE
// **
var dateDiff = (req, res, next) => {
    logger.info("dateDiff fired. " + Date(Date.now()));

    BookModel.aggregate([{
            $sort: {
                _id: -1
            }
        },
        {
            $limit: 2
        },
        {
            $group: {
                _id: null,
                min: {
                    $last: "$date" //or use $min and $max
                },
                max: {
                    $first: "$date"
                },
                copies: {
                    $sum: "$copies"
                }
            }
        },
        {
            $project: {
                _id: 0,
                'Date difference': {
                    $toDate: {
                        $subtract: ['$max', '$min']
                    }
                },
                'Total copies issued': '$copies'
            }
        }
    ]).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
}



// GET HOURS, MINUTES, ETC... SEPATARE
// **
var getSpecificTimestamps = (req, res, next) => {
    logger.info("getSpecificTimestamps fired. " + Date(Date.now()));

    BookModel.aggregate([{
            $sort: {
                _id: -1
            }
        },
        {
            $limit: 2
        },
        {
            $project: {
                _id: 0,
                'Full date': {
                    $toDate: '$date'
                },
                Year: {
                    $year: '$date'
                },
                Week: {
                    $week: '$date'
                },
                Month: {
                    $month: '$date'
                },
                'Day of month': {
                    $dayOfMonth: '$date'
                },
                Hour: {
                    $hour: '$date'
                },
                Minute: {
                    $minute: '$date'
                },
                Seconds: {
                    $second: '$date'
                },
            }
        }
    ]).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
};


// get timezone specific date and time
// **
var timezone = (req, res, next) => {
    logger.info("timezone fired. " + Date(Date.now()));

    BookModel.aggregate([{
            $sort: {
                _id: -1
            }
        },
        {
            $limit: 2
        },
        {
            $project: {
                _id: 0,
                'Date default': '$date',
                date_timezone: {
                    $dateToParts: {
                        date: "$date",
                        timezone: "Europe/Belgrade"
                    }
                }

            }
        }
    ]).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
};


module.exports = {
    newBook,
    getDiff,
    dateDiff,
    getSpecificTimestamps,
    timezone
}