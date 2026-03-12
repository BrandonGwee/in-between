// Provided by Gemini
const shuffleDeck = (deck) => {
    // Create a copy to avoid mutating the original array (functional approach)
    const shuffled = [...deck];

    // Start from the last element and swap upwards
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

const substituteCard = (val) => {
    switch (val) {
        case 1: return 'A';
        case 11: return 'J';
        case 12: return 'Q';
        case 13: return 'K';
        default: return val;
    }
}

// variables
const cardVals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let cardDeck = [];
for (let i = 0; i < 4; i++) {
    cardDeck = cardDeck.concat(cardVals);
}

const shuffledDeck = shuffleDeck(cardDeck);
const discardPile = new Array();

const leftCard = document.getElementById('left-card');
const midCard = document.getElementById('mid-card');
const rightCard = document.getElementById('right-card');
const yesCard = document.getElementById('yes-btn');
const noCard = document.getElementById('no-btn');
const exitBtn = document.getElementById('exit-btn');

const discardDisplay = document.getElementById('discarded');
const cardsLeftDisplay = document.getElementById('remainder');

const discardInner = discardDisplay.querySelector('div');
const remainInner = cardsLeftDisplay.querySelector('div');

leftCard.innerHTML = substituteCard(shuffledDeck[0]);
rightCard.innerHTML = substituteCard(shuffledDeck[1]);

const yesClick = () => {
    midCard.innerHTML = substituteCard(shuffledDeck[2]);

    const cardsDrawn = [shuffledDeck[0], shuffledDeck[1]];

    if (Math.min(...cardsDrawn) < shuffledDeck[2] && shuffledDeck[2] < Math.max(...cardsDrawn)) {
        leftCard.style.color = "#009900";
        midCard.style.color = "#009900";
        rightCard.style.color = "#009900";
    }
    else {
        leftCard.style.color = "#dd0000";
        midCard.style.color = "#dd0000";
        rightCard.style.color = "#dd0000";
    }

    discardPile.push(shuffledDeck[0], shuffledDeck[1], shuffledDeck[2]);
    shuffledDeck.shift();
    shuffledDeck.shift();
    shuffledDeck.shift();

    setTimeout(() => {
        leftCard.innerHTML = "";
        rightCard.innerHTML = "";
        midCard.innerHTML = "";
    }, 1000);

    setTimeout(() => {
        leftCard.style.color = "#000000";
        rightCard.style.color = "#000000";
        midCard.style.color = "#000000";

        leftCard.innerHTML = substituteCard(shuffledDeck[0]);
        rightCard.innerHTML = substituteCard(shuffledDeck[1]);
    }, 1500);
}
const noClick = () => {
    const cardsDrawn = [shuffledDeck[0], shuffledDeck[1]];

    if (Math.min(...cardsDrawn) >= shuffledDeck[2] || shuffledDeck[2] >= Math.max(...cardsDrawn)) {
        leftCard.style.color = "#009900";
        midCard.style.color = "#009900";
        rightCard.style.color = "#009900";
    }
    else {
        leftCard.style.color = "#dd0000";
        midCard.style.color = "#dd0000";
        rightCard.style.color = "#dd0000";
    }

    discardPile.push(shuffledDeck[0], shuffledDeck[1]);
    shuffledDeck.shift();
    shuffledDeck.shift();

    setTimeout(() => {
        leftCard.innerHTML = "";
        rightCard.innerHTML = "";
        midCard.innerHTML = "";
    }, 1000);

    setTimeout(() => {
        rightCard.style.color = "#000000";
        midCard.style.color = "#000000";

        leftCard.innerHTML = substituteCard(shuffledDeck[0]);
        rightCard.innerHTML = substituteCard(shuffledDeck[1]);
    }, 1500);
}

yesCard.onclick = () => {
    console.log(shuffledDeck.length);
    if (shuffledDeck.length > 3) {
        yesClick();
    }
    else {
        // from Gemini
        // 1. Create the button element
        const finishBtn = document.createElement('button');
        finishBtn.type = 'button';
        finishBtn.textContent = 'Finish Game';

        // 2. Assign the actual logic
        finishBtn.onclick = () => {
            window.location.replace('/'); // Put your destination URL here
        };

        // 3. Clear the container and add the button
        exitBtn.innerHTML = '';
        exitBtn.appendChild(finishBtn);

        remainInner.innerHTML = shuffledDeck.map(val => substituteCard(val)).join(', ');
    }
}
noCard.onclick = () => {
    console.log(shuffledDeck.length);
    if (shuffledDeck.length > 3) {
        noClick();
    }
    else {
        // from Gemini
        // 1. Create the button element
        const finishBtn = document.createElement('button');
        finishBtn.type = 'button';
        finishBtn.textContent = 'Finish Game';

        // 2. Assign the actual logic
        finishBtn.onclick = () => {
            window.location.replace('/'); // Put your destination URL here
        };

        // 3. Clear the container and add the button
        exitBtn.innerHTML = '';
        exitBtn.appendChild(finishBtn);


        remainInner.innerHTML = shuffledDeck.map(val => substituteCard(val)).join(', ');
    }
}

{   //cheat sheet funcs
    discardDisplay.onmousedown = () => {
        discardInner.innerHTML = (discardPile.length > 0 ? (discardPile.map(val => substituteCard(val)).join(', ')) : "(No cards)");
    }
    discardDisplay.onmouseup = () => {
        discardInner.innerHTML = "";
    }

    cardsLeftDisplay.onmousedown = () => {
        remainInner.innerHTML = (shuffledDeck.length > 0 ? (shuffledDeck.slice(2, shuffledDeck.length + 1).map(val => substituteCard(val)).join(', ')) : "(No cards)");
    }
    cardsLeftDisplay.onmouseup = () => {
        remainInner.innerHTML = "";
    }
}