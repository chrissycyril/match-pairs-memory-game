/*
 * Create a list that holds all of your cards
 */


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
let allCards= document.querySelector('.deck');
let moves= 0;
let clickCount=0;
let matchCounter=0;
let openCards=[];
let restart=document.querySelector('.restart');
let sec = 0;
let min = 0;
let timer;
let timeOn= false;

allCards.addEventListener('click',function(e){
    console.log(e.target);
    clickCount++;
    if(clickCount===1){
        startCount();
    }
    if(e.target.classList.contains('card')&& openCards.length<2){
        toggleCard(e.target);
        openCards.push(e.target);
        if(openCards.length===2){
            console.log('2 cards!');
            cardMatch();
            moveCount();
        }
    }
    
});

// Creates a list that holds all your cards

function shuffleDeck(){
 const cardsToShuffle=Array.from(document.querySelectorAll('.deck li'));
 console.log('Cards to shuffle', cardsToShuffle);
 const shuffledCards=shuffle(cardsToShuffle);
    for(card of shuffledCards){
    allCards.appendChild(card);
    }
}

// Checking whether the cards are matching or not
function cardMatch(){
    if(openCards[0].firstElementChild.className===
        openCards[1].firstElementChild.className
        ){
        openCards[0].classList.toggle('match');
        openCards[1].classList.toggle('match');
        openCards=[];
        console.log('Match!');
        matchCounter+=2;
        console.log(matchCounter);
        // If matchcounter=16, call stopCount, starRating and toggleModal functions
        if(matchCounter>0){
            stopCount();
            starRating(moves);
            toggleModal();
           
        }
    } else{
      setTimeout(function() {
            console.log('Not a match!');
            toggleCard(openCards[0]);
            toggleCard(openCards[1]);
            openCards=[];
      },1000);
      
    }
}



function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// Each moves are counted here
function moveCount(){
    moves++;
    const allMoves=document.querySelector('.moves');
    allMoves.innerHTML=moves+ ' Moves';
    if(moves===1){
        startCount();
    }
}

function starRating(count){
    if(count<=16){
       document.getElementById("1").className = "fa fa-star"; 
       document.getElementById("2").className = "fa fa-star";
       document.getElementById("3").className= "fa fa-star"; 
   }else if(count<20){
       document.getElementById("1").className = "fa fa-star"; 
       document.getElementById("2").className = "fa fa-star";
       document.getElementById("3").className= "fa fa-star-o";
   }else if(count>=20){
        document.getElementById("1").className = "fa fa-star"; 
       document.getElementById("2").className = "fa fa-star-o";
       document.getElementById("3").className= "fa fa-star-o";
    }
}

//Timer starts

function startCount(){
    if(timeOn==false){
        timer= setInterval(insertTime,1000);
        timeOn =true;
    }
    
}    


function stopCount(){
   clearInterval(timer);
   sec=0;
   min=0; 
   timeOn=false;
}

function insertTime(){
    sec++;

    if(sec<10){
        sec= `0${sec}`;
    }
    if (sec >= 60) {
        min++;
        sec = "00";
    }

    // Displays time
    document.querySelector('.timer').innerHTML = "0" + min + ":" + sec;
}

// Restart the game
restart.addEventListener('click',function(){
    window.location.reload();
});

// Modal
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
let closeicon = document.querySelector(".close");

function toggleModal() {
    modal.classList.toggle("show-modal");
    let starsList = document.querySelector(".modal-stars");
    let totalMoves= document.querySelector(".modal-moves");
    let finalTime = document.querySelector(".modal-time");
    finalTime.innerHTML= "Time = "+ document.querySelector('.timer').innerHTML + "<br/>";
    totalMoves.innerHTML= "Moves = "+ moves + "<br/>";
    starsList.innerHTML = document.querySelector(".stars").innerHTML + "<br/>";
    
}

// Close the modal box
closeButton.addEventListener("click", toggleModal);

shuffleDeck();
