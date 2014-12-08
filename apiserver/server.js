/*

    API Server for Deckbuilder
    Ross Dallaire   @rdallaire

*/

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/apitest'); // connect to our database

var Deck     = require('./app/js/models/deck');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080;		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// allow cross orgin access
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
   // console.log('req', req);
//    console.log('res', res);
//    console.log('next', next);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/decks')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var deck = new Deck();
        deck.name = req.body.name;
        deck.format = req.body.format;
        deck.featuredCard = req.body.featuredCard;
        deck.commander = req.body.featuredCard;
        deck.description = req.body.description;
        deck.tags = req.body.tags;
        deck.dateCreated = req.body.dateCreated;
        deck.dateUpdated = req.body.dateUpdated;
        deck.mainDeck = req.body.mainDeck;
        deck.sideboard = req.body.sideboard;
        deck.maybeboard = req.body.maybeboard;

        // save the bear and check for errors
        deck.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Deck created!' });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Deck.find(function(err, decks) {
            if (err)
                res.send(err);

            res.json(decks);
        });
    });


// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/decks/:deck_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Deck.findById(req.params.deck_id, function(err, deck) {
            if (err)
                res.send(err);
            res.json(deck);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Deck.findById(req.params.deck_id, function(err, deck) {

            if (err)
                res.send(err);

            deck.name = req.body.name;
            deck.format = req.body.format;
            deck.featuredCard = req.body.featuredCard;
            deck.commander = req.body.featuredCard;
            deck.description = req.body.description;
            deck.tags = req.body.tags;
            deck.dateCreated = req.body.dateCreated;
            deck.dateUpdated = req.body.dateUpdated;
            deck.mainDeck = req.body.mainDeck;
            deck.sideboard = req.body.sideboard;
            deck.maybeboard = req.body.maybeboard;

            // save the bear
            deck.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Deck updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Deck.remove({
            _id: req.params.deck_id
        }, function(err, deck) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);