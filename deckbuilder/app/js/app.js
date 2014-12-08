'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
])
.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/decks', {templateUrl: 'partials/viewdecks.html', controller: 'AllDecks'});
    $routeProvider.when('/create', {templateUrl: 'partials/createdeck.html', controller: 'CreateDeck'});
    $routeProvider.when('/deck/:_id', {templateUrl: 'partials/deck.details.html', controller: 'DeckDetails'});
    $routeProvider.otherwise({redirectTo: '/decks'});

}]);
