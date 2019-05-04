/*
 * Create a list that holds all of your cards
 *
 * Cards object:
 * all - all cards available for play
 * deck - cards contained in the current game
 *        this allows for a changing card set between games
 * 
 * 
 * 
 */

const cards = {
    all: [
        {name: "fa fa-diamond"},
        {name: "fa fa-paper-plane-o"},
        {name: "fa fa-anchor"},
        {name: "fa fa-bolt"},
        {name: "fa fa-cube"},
        {name: "fa fa-anchor"},
        {name: "fa fa-leaf"},
        {name: "fa fa-bicycle"},
        {name: "fa fa-diamond"},
        {name: "fa fa-bomb"},
        {name: "fa fa-leaf"},
        {name: "fa fa-bomb"},
        {name: "fab fa-angular"},
        {name: "fab fa-aviato"},
        {name: "fab fa-aws"},
        {name: "fas fa-atom"},
        {name: "fab fa-bitcoin"},
        {name: "fas fa-cat"},
        {name: "fas fa-chess-knight"},
        {name: "fas fa-code"},
        {name: "fas fa-dharmachakra"},
        {name: "fas fa-dragon"},
        {name: "fas fighter-jet"},
        {name: "fab fa-firefox"},
        {name: "fab fa-github"},
        {name: "fas fa-gem"},
        {name: "fab fa-gitlab"},
        {name: "fab fa-html5"},
        {name: "fab fa-js"},
        {name: "fab fa-node"},
        {name: "fab fa-react"},
        {name: "fas fa-space-shuttle"},
        {name: "fab fa-css3-alt"},
    ],
    deck: [],

};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
