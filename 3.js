const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let flippedCards = 0;

function flipCard(e) {
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add("flip");

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	secondCard = this;
	checkForMatch();
}

function checkForMatch() {
	if (firstCard.dataset.hero === secondCard.dataset.hero) {
		disableCards();
		flippedCards += 2;
		if (flippedCards === cards.length) alert("You Won!");
		return;
	} else {
		unflipCards();
	}
}

function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	resetBoard();
}

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		resetBoard();
	}, 1500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

	["0", "1", "2", "3","4", "5"].forEach((index) => {
		let selectedDiv = document.getElementById(index)
		selectedDiv.innerHTML = cards[+index].innerHTML
	});


	
})();

for (let card of cards) {
	card.addEventListener("click", flipCard);
}
