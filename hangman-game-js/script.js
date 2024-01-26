const keyboardDiv = document.querySelector('.keyboard')
const wordBox = document.querySelector('.word_box ')
const attemptText = document.querySelector('.attempt_text span')
const hangmanBox = document.querySelector('.hangman_box img')
const modal = document.querySelector('.modal')
const playAgain = document.querySelector('.again')

let currentWord
let wrong = 0
const maxWrong = 6
let correctLetters = []

const resetGame = () => {
	correctLetters = []
	wrong = 0
	hangmanBox.src = `/images/hangman-${wrong}.svg`
	attemptText.innerText = `${wrong} / ${maxWrong}`
	keyboardDiv
		.querySelectorAll('button')
		.forEach((btn) => (btn.disabled = false))
	wordBox.innerHTML = currentWord
		.split('')
		.map(() => '<li class="letter"></li>')
		.join('')
	modal.classList.remove('show')
}

const getRandomWord = () => {
	const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
	currentWord = word
	console.log(word)
	document.querySelector('.hint_text').innerHTML = hint
	resetGame()
}

const gameOver = (isVictory) => {
	setTimeout(() => {
		const modalText = isVictory
			? 'You win, the word was:'
			: 'You lose, the word was: '
		modal.querySelector('img').src = `images/${
			isVictory ? 'victory.gif' : 'lost.gif'
		}`
		modal.querySelector('h4').innerText = `${isVictory ? 'Victory' : 'Lose'}`
		modal.querySelector(
			'p'
		).innerHTML = `${modalText}<span>${currentWord}</span>`
		modal.classList.add('show')
	}, 300)
}

const initGame = (button, clickedLetter) => {
	if (currentWord.includes(clickedLetter)) {
		;[...currentWord].forEach((letter, index) => {
			if (letter === clickedLetter) {
				correctLetters.push(letter)
				wordBox.querySelectorAll('li')[index].innerText = letter
			}
		})
	} else {
		wrong++

		hangmanBox.src = `/images/hangman-${wrong}.svg`
	}
	button.disabled = true
	attemptText.innerText = `${wrong} / ${maxWrong}`
	if (wrong === maxWrong) return gameOver(false)
	if (correctLetters.length === currentWord.length) return gameOver(true)
}

for (let index = 97; index <= 122; index++) {
	const button = document.createElement('button')
	button.innerText = String.fromCharCode(index)
	keyboardDiv.appendChild(button)
	button.addEventListener('click', (e) =>
		initGame(e.target, String.fromCharCode(index))
	)
}
getRandomWord()

playAgain.addEventListener('click', getRandomWord)
