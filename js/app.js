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

//this is the main game object it contains all the metadata about the game 
const game = {
    moves: 0,
    matches: [],
    time: 0,
    rating: 5,
    difficulty: 8,
    deck: [],
    previousSelection: "",
    intervalId: null,
    //timer functions
    setTimer: function () {
        this.intervalId = setInterval(this.formattedTimer, 1000);
    },
    stopTimer: function () {
        clearInterval(this.intervalId)
    },
    //formats time to the HH:MM style of time where H is hours and M is minutes
    formattedTimer: function () {
        game.time++;
        const minutes = (game.time / 60).toString()[0];
        const seconds = game.time % 60;
        const formattedSeconds = (seconds) < 10 ? `0${seconds}` : `${seconds}`;
        const formattedTime = `${minutes}:${formattedSeconds}`;
        document.getElementById("gameTimer").innerHTML = formattedTime;
    }
}

//object containing cards with their metadata

const cards = {
    all: [
        { name: "fa fa-paper-plane" },
        { name: "fa fa-bolt" },
        { name: "fa fa-cube" },
        { name: "fa fa-anchor" },
        { name: "fa fa-bicycle" },
        { name: "fa fa-bomb" },
        { name: "fa fa-leaf" },
        { name: "fab fa-angular" },
        { name: "fab fa-aviato" },
        { name: "fab fa-aws" },
        { name: "fas fa-atom" },
        { name: "fab fa-bitcoin" },
        { name: "fas fa-cat" },
        { name: "fas fa-chess-knight" },
        { name: "fas fa-code" },
        { name: "fas fa-dharmachakra" },
        { name: "fas fa-dragon" },
        { name: "fas fa-fighter-jet" },
        { name: "fab fa-firefox" },
        { name: "fab fa-github" },
        { name: "fas fa-gem" },
        { name: "fab fa-gitlab" },
        { name: "fab fa-html5" },
        { name: "fab fa-js" },
        { name: "fab fa-node" },
        { name: "fab fa-react" },
        { name: "fas fa-space-shuttle" },
        { name: "fab fa-css3-alt" },
    ]
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const createDeck = () => {
    //here we are adding card pairs based on the difficulty

    for (let i = 0; i < game.difficulty;) {
        //add a pair cards to the deck
        let randomNum = Math.floor(Math.random() * 26);
        if (game.deck.indexOf(cards.all[randomNum]) === -1) {
            game.deck.push(cards.all[randomNum], cards.all[randomNum]);
            i++;
        }

    }

}

const dealCards = () => {
    //shuffle the game deck
    const shuffledDeck = shuffle(game.deck);
    const fragment = document.createDocumentFragment();
    //create cards
    shuffledDeck.forEach((card, i) => {
        const newCard = createCard(card.name, i);
        fragment.append(newCard);
    });
    document.getElementById("deck").append(fragment);
    //add cards to screen
    document.getElementById("deck").addEventListener('click', select);
}

const createCard = (cardName, i) => {
    //create card element
    const newCard = document.createElement("li");
    //add card styling
    newCard.classList.add("card");
    //add card id
    newCard.id = `card-${i}`;
    //create image element
    const cardImg = document.createElement("i");
    //add font awesome icon classes
    cardImg.classList.add(`${cardName.split(" ")[0]}`);
    cardImg.classList.add(`${cardName.split(" ")[1]}`);
    //add image to card
    newCard.append(cardImg);
    //return new card
    return newCard;
}

const select = e => {
    //listening for clicks on the deck element
    if (
        //a card is clicked
        e.target.classList.contains("card") &&
        //and is not matched
        e.target.classList.contains("match") === false &&
        //and is not already showing
        e.target.classList.contains("show") === false
    ) {
        //show the card
        e.target.classList.add("open", "show");
        //compare the cards
        compareCards(e.target);
        //increment the game moves variable
        game.moves++;
        //update the game variable on screen
        document.getElementById("moves").textContent = game.moves;

    }
}

//sets a user's star rating based on the number of moves they make
const setRating = () => {

    const starElem = `<li><i class="fa fa-star"></i></li>`;
    const ratingElem = document.getElementById("rating");

    if (game.moves < 16) {
        //set 5 stars
        ratingElem.innerHTML = starElem + starElem + starElem + starElem + starElem;
    } else if (game.moves < 20) {
        //set 4 stars
        ratingElem.innerHTML = starElem + starElem + starElem + starElem;
    } else if (game.moves < 24) {
        //set 3 stars
        ratingElem.innerHTML = starElem + starElem + starElem;
    } else if (game.moves < 28) {
        //set 2 stars
        ratingElem.innerHTML = starElem + starElem;
    } else {
        ratingElem.innerHTML = starElem;
    }
}

//evaluates current game state for winning condition
const checkWin = () => {

    const cardElems = document.getElementById("deck").children;
    const matchElems = [];
    const matchNames = [];

    //loop through each card 
    for (let i = 0; i < cardElems.length; i++) {
        const card = cardElems[i];
        //add matched cards to the matchElems array
        if (card.classList.contains("match")) matchElems.push(card);
    }
    //now that we have all the matches lets id them and add them to the game obj
    matchElems.forEach(match => {
        let exists = matchNames.indexOf(match.children[0].classList.value);
        if (exists === -1) matchNames.push(match.children[0].classList.value);
    })

    //if all the cards have been matched run win function else set rating
    if (matchNames.length === game.difficulty) {
        win();
    } else {
        setRating();
    }
}

//initiates game win logic
const win = () => {
    game.stopTimer();
    const gameModal = document.getElementById("gameModal");
    //set modal stats component data
    document.getElementById("end-time").innerHTML = document.getElementById("gameTimer").innerHTML;
    document.getElementById("end-moves").innerHTML = document.getElementById("moves").innerHTML;
    document.getElementById("end-rating").innerHTML = document.getElementById("rating").innerHTML;
    document.getElementById("end-rating").classList.add("stars");
    gameModal.classList.remove("hide");
}

// evaluates user selection(s)
const compareCards = (currentSelection) => {
    if (game.previousSelection !== "") {
        const cardOne = game.previousSelection;
        const cardTwo = currentSelection;
        const cardOneIcon = cardOne.children[0].classList.toString();
        const cardTwoIcon = cardTwo.children[0].classList.toString();
        if (cardOneIcon === cardTwoIcon) {
            cardOne.classList.remove("open", "show");
            cardTwo.classList.remove("open", "show");
            cardOne.classList.add("match");
            cardTwo.classList.add("match");
        } else {
            unflipCards(cardOne, cardTwo)
        }
        checkWin();
        game.previousSelection = "";
    } else {
        game.previousSelection = currentSelection;
    }
}

//unflips a pair of selected cards
const unflipCards = (cardOne, cardTwo) => {
    setTimeout(() => {
        cardOne.classList.remove("open", "show");
        cardTwo.classList.remove("open", "show");
    }, 1000)
}

//game restart logic
const setRestartButton = () => {
    document.getElementById("restart").addEventListener("click", e => {
        document.getElementById("deck").innerHTML = "";
        game.stopTimer();
        game.time = 0;
        document.getElementById("gameTimer").textContent = "0:00";
        document.getElementById("moves").textContent = "0";
        play();
    })
}

//this function initiates game play logic
const play = () => {
    //remove play button
    const playButton = document.getElementById("play-button");
    //remove play button
    if (playButton !== null) playButton.remove();
    //ensure deck is clear of content 
    document.getElementById("deck").innerHTML = "";
    //reset the game obj data just in case there is data from a previous game
    game.deck = [];
    game.time = 0;
    game.matches = 0;
    game.moves = 0;
    game.previousSelection = "";
    document.getElementById("moves").innerHTML = game.moves;
    setRestartButton();
    setRating();
    game.setTimer();
    //create new random deck
    createDeck();
    //add card to screen
    dealCards();
    
}

const init = () => {

    //wait for DOM Content to load
    const deck = document.getElementById("deck");
    //add play button to screen
    deck.innerHTML = `<button id="play-button" class="button">PLAY</button>`;

    document.getElementById("play-button").addEventListener("click", () => {
        //start game
        play();
    })
    document.getElementById("modal-close").addEventListener("click", () => {
        //add listener to modal close
        document.getElementById("gameModal").classList.add("hide");
    });
    document.getElementById("playAgain").addEventListener("click", () => {
        //add listener to modal play button
        document.getElementById("gameModal").classList.add("hide");
        play();
    });


}

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
//initialize game sequence
document.addEventListener('DOMContentLoaded', function () {
    init();
});
