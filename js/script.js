let colors = ['yellow','red','blue','violet','green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');

function createBalloon(){
	let div = document.createElement('div');
	let rand = Math.floor(Math.random() * colors.length);
	div.className = 'balloon balloon-'+colors[rand];

	rand = Math.floor(Math.random() * (windowWidth - 100));

	div.style.left = rand + 'px';
	div.dataset.number = currentBalloon;
	currentBalloon++;
	document.body.appendChild(div);
	animateBalloon(div);
}

function deleteBalloon(elem){
		elem.remove();
		num++;
		updateScore();
		playBallSound();
}

function updateScore(){
	for(let i = 0; i < scores.length; i++){
		scores[i].textContent = num;
	}
}

function animateBalloon(elem){
	let pos = 0;
	let interval = setInterval(frame, 10 - Math.floor(num /10));
	// gameOver = true;

	function frame(){
		if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)){
			clearInterval(interval);
			gameOver = true;
		} else {
			pos++;
			elem.style.top = windowHeight - pos +'px';
		}
	}
}

function startGame(){
	restartGame();
	let timeout = 0;
	let loop = setInterval(function(){
		timeout = Math.floor(Math.random() * 600 - 100);
		if(!gameOver && num !== total){
			createBalloon();
		}else if( num !== total ){
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.loose').style.display = 'block';
		}else{
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.win').style.display = 'block';
		}
	
	}, 800 + timeout);
}

function restartGame(){
	let forRemoving = document.querySelectorAll('.balloon');
	for(let i = 0; i < forRemoving.length ; i++){
		forRemoving[i].remove();
	}
	gameOver=false;
	num = 0;
	updateScore();
}

function playBallSound(){
	let audio = document.createElement('audio');
	audio.src = 'sounds/pop.mp3';
	audio.play();
}

document.addEventListener('click', function(event){
	// console.log(event);
	if(event.target.classList.contains('balloon'))
	{
		deleteBalloon(event.target);
	}
})

document.querySelector('.restart').addEventListener('click', function(){
	totalShadow.style.display = 'none';
	totalShadow.querySelector('.win').style.display = 'none';
	totalShadow.querySelector('.loose').style.display = 'none';
	startGame();
})

document.querySelector('.cancel').addEventListener('click', function(){
	totalShadow.style.display = 'none';
})

startGame();