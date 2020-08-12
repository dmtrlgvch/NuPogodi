const options = {
  root: document.getElementById('wolf'),
  rootMargin: '0px',
  threshold: 1.0
}

let count = 0;
const score = document.getElementById('score');
const hp = document.getElementById('hp')
const wolf = document.getElementById('wolf');

const modalGreeting = document.getElementById('modal-greeting');
const modalgameOver = document.getElementById('modal-game-over');
const eggs = document.querySelectorAll('.egg');
let eggInterval = null;
const observer = new IntersectionObserver(eggCollisionObserver, options);


document.addEventListener('click', startGame)

function startGame(e) {
  if (e.target.classList.contains('btn-start-game')) {
    hp.classList = [];
    hp.classList.add('hp');

    modalGreeting.style.display = 'none'
    modalgameOver.style.display = 'none'
    score.innerHTML = 0
    
    eggInterval = setInterval(() => {
      let egg = eggs[randomInteger(0, 3)]
      if (!egg.classList.contains('animated')) {
          egg.classList.remove('hidden')
          egg.classList.add('animated')
      }
    }, 1000);

    eggs.forEach(e => {
      observer.observe(e);
    })
    document.addEventListener('keydown', wolfMove)    
  }
}

function gameOver() {
    
  count = 0
  clearInterval(eggInterval);
  eggs.forEach(e => {
      e.classList.remove('animated')
      e.classList.add('hidden')
  })
  hp.classList = [];
  hp.classList.add('hp');
  hp.classList.add('x0');
  document.removeEventListener('keydown', wolfMove)
  modalgameOver.style.display = 'block'
}


function eggCollisionObserver(entries, observer) {

  entries.forEach(entry => {
    let egg = entry.target;
    let intersection = entry.isIntersecting;
    if (intersection) {

      setTimeout(() => {
        egg.classList.remove('animated')
        egg.classList.add('hidden')
      }, 300);

      let wolfPos = wolf.classList[1];

      if (egg.classList.value.includes(wolfPos)) {
        count++;
        score.innerHTML = count;

      } else {
        if (hp.classList.contains('x2')) {
            hp.classList.remove('x2');
            hp.classList.add('x1');
        } else if (hp.classList.contains('x1')) {
            gameOver()
        } else {
            hp.classList.add('x2');
        }
      }
    }
  });
};


function wolfMove(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    e.preventDefault()
  }

  if (e.keyCode == '38') {
      // up arrow
    if (wolf.classList.contains('bottom-left')) {
      wolf.classList.remove('bottom-left')
      wolf.classList.add('top-left')
    }

    if (wolf.classList.contains('bottom-right')) {
      wolf.classList.remove('bottom-right')
      wolf.classList.add('top-right')
    }
  }

  else if (e.keyCode == '40') {
      // down arrow 
    if (wolf.classList.contains('top-left')) {
      wolf.classList.remove('top-left')
      wolf.classList.add('bottom-left')
    }

    if (wolf.classList.contains('top-right')) {
      wolf.classList.remove('top-right')
      wolf.classList.add('bottom-right')
    }
  }

  else if (e.keyCode == '37') {
      // left arrow
    if (wolf.classList.contains('top-right')) {
      wolf.classList.remove('top-right')
      wolf.classList.add('top-left')
    }

    if (wolf.classList.contains('bottom-right')) {
      wolf.classList.remove('bottom-right')
      wolf.classList.add('bottom-left')
    }

  }
  else if (e.keyCode == '39') {
      // right arrow
    if (wolf.classList.contains('top-left')) {
      wolf.classList.remove('top-left');
      wolf.classList.add('top-right')
    }

    if (wolf.classList.contains('bottom-left')) {
      wolf.classList.remove('bottom-left')
      wolf.classList.add('bottom-right')
    }
  }
}


function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}









