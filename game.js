let playerScore = 0;
let computerScore = 0;

function displayResults() {
	score.textContent = playerScore + ':' + computerScore;
}

function endGame() {
	buttons.forEach(button => button.setAttribute('disabled', 'disabled'));
	restart.removeAttribute('hidden');
}

function computerPlay() {
	let randomNumber = Math.random();
	return (randomNumber < 1/3) ? 'rock' :
		   (randomNumber < 2/3) ? 'paper' :
				 				  'scissors';
}

function playRound(playerSelection, computerSelection = computerPlay()) {
	playerSelection = playerSelection.toLowerCase();
	const loss = (playerSelection === 'rock') && (computerSelection === 'paper') ||
	   		   (playerSelection === 'paper') && (computerSelection === 'scissors') ||
	   		   (playerSelection === 'scissors') && (computerSelection === 'rock');
	const win = (playerSelection === 'rock') && (computerSelection === 'scissors') ||
			  (playerSelection === 'paper') && (computerSelection === 'rock') ||
			  (playerSelection === 'scissors') && (computerSelection === 'paper'); 
	if (win) {
			playerScore += 1;
			return ('Great! Your ' + playerSelection + ' beats my ' + computerSelection);
		} else if (loss) {
			computerScore += 1;
			return ('Sorry, but my ' + computerSelection + ' beats your ' + playerSelection);
		} else {
			return ('Try again, I have ' + computerSelection + ' too');
		}
}

//start game

const message = document.querySelector('.message');
const score = document.querySelector('.score');
const buttons = Array.from(document.querySelectorAll('.choise'));
const restart = document.querySelector('.restart');

displayResults();
message.textContent = 'The first to reach 5 points wins'

buttons.forEach(button => 
	button.addEventListener('click', function(e) {
		message.textContent = playRound(e.target.getAttribute('id'));
		displayResults();

		if (computerScore === 5) {
			message.textContent = 'You are looser!';
			message.style.color = '#dc143c';
			score.style.color = '#dc143c';
			endGame();
		} else if (playerScore === 5) {
			message.textContent = 'You are winner!';
			message.style.color = '#32cd32';
			score.style.color = '#32cd32';
			endGame();
		}
	})
)

restart.addEventListener('click', function() {
	playerScore = 0;
	computerScore = 0;
	displayResults();
	restart.setAttribute('hidden', 'hidden');
	buttons.forEach(button => button.removeAttribute('disabled'));
	message.textContent = 'The first to reach 5 points wins';
	message.style.color = 'black';
	score.style.color = 'black';
})




