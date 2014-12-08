MTG-Deckbuilder
===============

_Still work in progress_

Magic: The Gathering Deckbuilder built in AngularJS.

This repo includes files to run the API server and the deckbuilder built in AngularJS.

Featured card will show that image as the background on the top of the deck ui

Currently the decks only take this format
```
12x   Swamp
3x   Dragonskull Summit
3x   Godless Shrine
2x   Drowned Catacomb
2x   Tectonic Edge
```

#### Installation

**Requirements**
- MongoDB
- Node
- Bower?

_Need to update these steps better_
* cd `apiserver`
* run `npm install`
* cd `deckbuilder`
* run `npm install`

##### Running it
* start mongodb
* run `npm start` in `apiserver`
* run `npm start` in `deckbuilder`
* go to http://localhost:8000/app/

##### Todo
* cleanup files
* make one npm install?
* make one npm start (if possible?)
* integrate gulp
* fix input formats
