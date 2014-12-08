'use strict';

angular.module('myApp.controllers', [])

    // view all decks page
    .controller('AllDecks', ['$scope', '$http', function ($scope, $http) {

        // get list of deck data
        $http.get('http://localhost:8080/api/decks').success(function(data) {
            $scope.decks = data;
            console.log($scope.decks);
        });

        $scope.deleteDeck = function(deckId){

            $http.delete('http://localhost:8080/api/decks/' + deckId).success(function() {

                // refresh list after deck is deleted
                $http.get('http://localhost:8080/api/decks').success(function(data) {
                    $scope.decks = data;
                    // console.log($scope.decks);
                });

            });

        };

    }])

    .controller('DeckDetails',['$scope','$routeParams','$http', function($scope,$routeParams,$http) {

        $http.get('http://localhost:8080/api/decks/' + $routeParams._id).success(function(data) {

            $scope.deck = data;
            console.log(data);

        });

    }])

    // create deck page
    .controller('CreateDeck',  ['$scope', '$http', function ($scope, $http) {

        $scope.createDeck = function() {

            /* while compiling form , angular created this object*/
            var data = $scope.deck;

            // build deckInfo with data from the form
            var deckInfo = {
                name: data.name,
                format: data.format,
                featuredCard: data.featuredCard,
                mainDeck: [],
                sideboard: []
            }

            // split each new line into the array
            var cards = $scope.deck.cards.split("\n");
            // var cardsSideboard = $scope.deck.sbcards.split("\n");

            // go through each line and break apart card and number
            cards.map(function(line) {

                // remove any whitespace on the ends
                line = line.trim();

                // skip empty lines
                if (!line)
                    return false;

                // split card name and qty into seperate arrays
                var splat = line.split('x ');

                // set qty and name from the split array
                var card = {
                  qty: +splat[0],
                  name: splat[1]
                };

                // build the mainDeck array
                deckInfo.mainDeck.push(card);

            });

/*            cardsSideboard.map(function(line) {

                // remove any whitespace on the ends
                line = line.trim();

                // skip empty lines
                if (!line)
                    return false;

                // split card name and qty into seperate arrays
                var splat = line.split('x ');

                // set qty and name from the split array
                var card = {
                  qty: +splat[0],
                  name: splat[1]
                };

                // build the mainDeck array
                deckInfo.sideboard.push(card);

            });*/

            // post deck to the api server
            $http.post('http://localhost:8080/api/decks', deckInfo);

        };

    }]);
