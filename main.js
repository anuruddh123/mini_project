    const icons = [
        "🍎","🍎","🍌","🍌","🍇","🍇",
        "🍓","🍓","🍑","🍑","🍉","🍉",
        "🥝","🥝","🍒","🍒"
    ];

    const gameBoard = document.getElementById("gameBoard");
    const restartBtn = document.getElementById("restartBtn");

    let flippedCards = [];
    let lockBoard = false;

    function shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    function generateCards() {
        gameBoard.innerHTML = "";
        const arr = shuffle([...icons]);

        arr.forEach(icon => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-face card-front">${icon}</div>
                    <div class="card-face card-back">?</div>
                </div>
            `;

            card.addEventListener("click", () => flipCard(card));
            gameBoard.appendChild(card);
        });
    }

    function flipCard(card) {
        if (lockBoard || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) checkMatch();
    }

    function checkMatch() {
        const [c1, c2] = flippedCards;
        const i1 = c1.querySelector(".card-front").textContent;
        const i2 = c2.querySelector(".card-front").textContent;

        if (i1 === i2) {
            flippedCards = [];
        } else {
            lockBoard = true;
            setTimeout(() => {
                c1.classList.remove("flipped");
                c2.classList.remove("flipped");
                flippedCards = [];
                lockBoard = false;
            }, 700);
        }
    }

    restartBtn.addEventListener("click", generateCards);

    generateCards();

