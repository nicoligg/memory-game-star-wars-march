document.addEventListener('DOMContentLoaded', () => {

  //Audios
  const error = `sounds/error.mp3`;
  const uhoh = `sounds/uh-oh.mp3`;
  const vct = `sounds/victory.mp3`;
  const crt = `sounds/correct.mp3`;

  const audioERROR = new Audio(error);
  const audioUHOH = new Audio(uhoh);
  const audioVCT = new Audio(vct);
  const audioCRT = new Audio(crt);

  //List all card options
  const cardArray = [
    {
      name: 'vader',
      img: 'images/vader.png',
      effect: true
    },
    {
      name: 'leia',
      img: 'images/leia.png',
      effect: true
    },
    {
      name: 'chewbacca',
      img: 'images/chewbacca.jpg',
      effect: true
    },
    {
      name: 'r2d2',
      img: 'images/r2d2.png',
      effect: true
    },
    {
      name: 'c3p0',
      img: 'images/c3p0.png',
      effect: true
    },
    {
      name: 'luke',
      img: 'images/luke.png',
      effect: true
    },
    {
      name: 'grogu',
      img: 'images/grogu.png',
      effect: true
    },
    {
      name: 'han-solo',
      img: 'images/han-solo.png',
      effect: true
    },
    {
      name: 'rey',
      img: 'images/rey.png',
      effect: true
    },
    {
      name: 'vader',
      img: 'images/vader.png',
      effect: true
    },
    {
      name: 'leia',
      img: 'images/leia.png',
      effect: true
    },
    {
      name: 'chewbacca',
      img: 'images/chewbacca.jpg',
      effect: true
    },
    {
      name: 'r2d2',
      img: 'images/r2d2.png',
      effect: true
    },
    {
      name: 'c3p0',
      img: 'images/c3p0.png',
      effect: true
    },
    {
      name: 'luke',
      img: 'images/luke.png',
      effect: true
    },
    {
      name: 'grogu',
      img: 'images/grogu.png',
      effect: true
    },
    {
      name: 'han-solo',
      img: 'images/han-solo.png',
      effect: true
    },
    {
      name: 'rey',
      img: 'images/rey.png',
      effect: true
    }
  ]

  //Texts
  const texts = [
    "Você clicou na mesma imagem!",
    "Você encontrou o par!",
    "Não foi dessa vez, tente novamente!",
  ];

  //Timer
  let timer;
  let isRunning = false;
  let seconds = 0;

  function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').innerText =
      `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function playPause() {

    if (isRunning) {
      clearInterval(timer);
    } else {
      timer = setInterval(updateTimer, 1000);
    }
    isRunning = !isRunning;
  };

  //Playlist
  $(document).ready(function () {
    $('#selection').on('change', function () {
      change($(this).val());
    });
  });

  function change(sourceUrl) {
    var audio = document.getElementById("player");
    var source = document.getElementById("mp3_src");

    audio.pause();

    if (sourceUrl) {
      source.src = sourceUrl;
      audio.load();
      audio.play();
    }
  }

  //Create card board
  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/carta.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      card.addEventListener('mouseover', () => addEffect(i));
      card.addEventListener('mouseout', () => removeEffect(i));
      grid.appendChild(card);
    }
  }

  //Add or remove effect when hovering mouse over card
  const addEffect = (cardId) => {
    if (cardArray[cardId].effect == true) {
      const card = document.querySelector(`[data-id="${cardId}"]`);
      card.classList.add("active");
    }
  }

  const removeEffect = (cardId) => {
    const card = document.querySelector(`[data-id="${cardId}"]`);
    card.classList.remove("active");
  }

  //Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('.grid img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/carta.png')
      cards[optionTwoId].setAttribute('src', 'images/carta.png')
      audioUHOH.play()

      const divMessage = document.querySelector(".alert");
      const msg = texts[0];
      function messactivate(msg) {
        const message = document.createElement("div");
        message.classList.add("messageeq");
        message.innerText = msg;
        divMessage.appendChild(message);
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      }
      messactivate(msg);

      removeEffect(optionOneId);
      removeEffect(optionTwoId);
    }
    else if (cardsChosen[0] === cardsChosen[1]) {

      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardArray[optionOneId].effect = false;
      cardArray[optionTwoId].effect = false;
      removeEffect(optionOneId);
      removeEffect(optionTwoId);
      audioCRT.play()

      const divMessage = document.querySelector(".alert");
      const msg = texts[1];
      function messactivate(msg) {
        const message = document.createElement("div");
        message.classList.add("messageacer");
        message.innerText = msg;
        divMessage.appendChild(message);
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      }
      messactivate(msg);

      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/carta.png')
      cards[optionTwoId].setAttribute('src', 'images/carta.png')
      audioERROR.play()

      const divMessage = document.querySelector(".alert");
      const msg = texts[2];
      function messactivate(msg) {
        const message = document.createElement("div");
        message.classList.add("messageerr");
        message.innerText = msg;
        divMessage.appendChild(message);
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      }
      messactivate(msg);

      removeEffect(optionOneId);
      removeEffect(optionTwoId);

    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      playPause()
      resultDisplay.innerHTML = 'Parabéns!  Você encontrou todos!';
      audioVCT.play()
    }
  }

  //Flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }

    if (isRunning == false) {
      playPause()
      isRunning = true;
    }

  }
  createBoard()
})