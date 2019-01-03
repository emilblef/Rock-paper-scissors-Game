// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/

const gameResults = {
    games: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const gameInformations = {
    playerChoice: '',
    aiChoice: '',
}

hands = [...document.querySelectorAll('.select img')];

function selectHand() {
    gameInformations.playerChoice = this.dataset.option;
    // console.log(gameInformations.playerChoice);
    hands.forEach(hand => hand.style.boxShadow = '0 0 0 2px black');
    hands.forEach(hand => hand.style.transform = 'scale(1)');
    this.style.boxShadow = '0 0 5px 4px lightgreen';
    this.style.transform = 'scale(1.1)';
}

hands.forEach(hand => hand.addEventListener('click', selectHand));

function computerChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function gameScore(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === 'nożyce') || (player === 'nożyce' && ai === 'papier')) {
        return 'win';
    } else {
        return 'loss';
    }
}

function gameInformation(player, ai, result) {
    document.querySelector("[data-summary='your-choice']").textContent = player;
    document.querySelector("[data-summary='ai-choice']").textContent = ai;

    document.querySelector('.numbers span').textContent = ++gameResults.games;

    if (result === 'win') {
        document.querySelector("[data-summary='who-win']").textContent = "Brawo, Ty wygrałeś!!!"
        document.querySelector("[data-summary='who-win']").style.color = 'green';
        document.querySelector('.wins span').textContent = ++gameResults.wins;
    } else if (result === 'draw') {
        document.querySelector("[data-summary='who-win']").textContent = "Ajj... było blisko, remis :|";
        document.querySelector("[data-summary='who-win']").style.color = 'gray';
        document.querySelector('.draws span').textContent = ++gameResults.draws;
    }
    if (result === 'loss') {
        document.querySelector("[data-summary='who-win']").textContent = "Smuteczek, przegrałeś... :(";
        document.querySelector("[data-summary='who-win']").style.color = 'red';
        document.querySelector('.losses span').textContent = ++gameResults.losses;
    }
}

function endGame() {
    document.querySelector(`[data-option="${gameInformations.playerChoice}"]`).style.boxShadow = '0 0 0 2px black';
    document.querySelector(`[data-option="${gameInformations.playerChoice}"]`).style.transform = 'scale(1)';
    gameInformations.playerChoice = '';
    gameInformations.aiChoice = '';
}

function gameStart() {
    if (gameInformations.playerChoice === '') {
        alert('Wybierz papier, kamień lub nożyce');
    } else {
        gameInformations.aiChoice = computerChoice();
        // console.log(gameInformations.aiChoice);
        const gameResult = gameScore(gameInformations.playerChoice, gameInformations.aiChoice);
        // console.log(gameResult);
        gameInformation(gameInformations.playerChoice, gameInformations.aiChoice, gameResult);
        endGame();
    }
}

document.querySelector('.start').addEventListener('click', gameStart);