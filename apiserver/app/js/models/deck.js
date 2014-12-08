var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DeckSchema   = new Schema({
    name:           String,
    format:         String,
    featuredCard:   String,
    commander:      String,
    description:    String,
    tags:           Array,
    dateCreated:    Date,
    dateUpdated:    Date,
    mainDeck:       [{name: String, qty: Number}],
    sideboard:      [{name: String, qty: Number}],
    maybeboard:     [{name: String, qty: Number}]
});

module.exports = mongoose.model('Deck', DeckSchema);