/* 
  Comments

  I was unable to have the png color change into a rainbow gif. I attempted filter: invert 1 to 
  see if I could invert the black and transparency of the gir, but it did not work. Next time,
  I would use SVG to create a mask color for the icon images on 'playing'.

*/


// use constant variables to track state
var app = document.getElementById('app');
var audioList = document.getElementById('audio');
var nowPlaying = null;
var activeButton = null;

// generate sounds array
var sounds = [
  {
    type: 'blues',
    img: "https://recordbricks.herokuapp.com/images/icons/asteroid@2x.png",
    src: 'http://ia600804.us.archive.org/15/items/WilliamMooreoneWayGal/WilliamMoore-OneWayGal.mp3'
  },
  {
    type: 'classical',
    img: 'https://recordbricks.herokuapp.com/images/icons/axe@2x.png',
    src: 'http://ia800202.us.archive.org/31/items/BeethovenPianoConcertoNo.5emperormoiseivitch/1.I.Allegro.mp3'
  },
  {
    type: 'country',
    img: 'https://recordbricks.herokuapp.com/images/icons/bicycle@2x.png',
    src: 'http://cdn.music2ten.com/mp3/BrandyHarris-DrunkWithYou.mp3'
  },
  {
    type: 'dubstep',
    img: 'https://recordbricks.herokuapp.com/images/icons/train@2x.png',
    src: "http://cdn.music2ten.com/mp3/Diplo(feat.LilJon)-UDon'tLikeMe(DatsikRemix).mp3"
  },
  {
    type: 'hiphop',
    img: 'https://recordbricks.herokuapp.com/images/icons/tomato@2x.png',
    src: 'http://cdn.music2ten.com/mp3/Music2eleven/RichBoy_DropRemix.mp3'
  },
  {
    type: 'jazz',
    img: 'https://recordbricks.herokuapp.com/images/icons/skull@2x.png',
    src: 'http://cdn.music2ten.com/mp3/GordonJames-OneNationUnderAGroove.mp3'
  },
  {
    type: 'pop',
    img: 'https://recordbricks.herokuapp.com/images/icons/owl@2x.png',
    src: 'http://cdn.music2ten.com/mp3/OKGo_Here_Comes_the_Fire.mp3'
  },
  {
    type: 'mexican',
    img: 'https://recordbricks.herokuapp.com/images/icons/milk@2x.png',
    src: 'http://cdn.music2ten.com/mp3/01_01_Carnaval.mp3'
  },
  {
    type: 'rock',
    img: 'https://recordbricks.herokuapp.com/images/icons/cactus@2x.png',
    src: 'http://cdn.music2ten.com/mp3/DJ_iwantyoutoknow.mp3'
  },
];



// generate the row using the sounds object
var generateIconRow = (array) => {
  var row = document.createElement('div');
  row.className = 'row';

  for (let i = 0; i < array.length; i++) {
    // add an audio element
    var audio = document.createElement('audio');
    audio.className = `${array[i].type + ' ' + i}`
    audio.dataset.index = i;
    audio.src = array[i].src;
    audioList.appendChild(audio);

    // create one item in the grid
    var item = document.createElement('div');
    item.classList = `item ${array[i].type + ' ' + i}`;
    item.dataset.id = i;
    var img = document.createElement('img');
    img.src = array[i].img;
    item.appendChild(img);

    // add song playing listener to each div
    item.addEventListener('click', (e) => playSong(i, e))
    row.appendChild(item);

  }

  return row;
}

// quick throttle function 
var throttle = function(fn, t) {
  var called = false;

  return () => {
    if (!called) {
      called = true;
      fn.apply(Array.prototype.slice(arguments));

      setTimeout(() => called = false, t)
    } 
  }
}

// append the grid to the app, set as variable
app.appendChild(generateIconRow(sounds));
var divs = document.querySelectorAll('.item');

// function that handles animation and song playing
function playSong(index, e) {
  if (nowPlaying) {
    nowPlaying.pause();
    nowPlaying.currentTime = 0;

    activeButton.classList.toggle('playing');
  }

  //animate flashing
  e.target.animate([
    { opacity: 0 },
    { opacity: 1 }
  ], {
    duration: 200,
    iterations: 4
  })

  // set timeout so that music plays after animation
  setTimeout( () => {
    // toggle the playing class of the active element and the clicked element
    activeButton = e.target;
    activeButton.classList.toggle('playing');

    // reset the audio to 0:00 and play it
    var audio = document.querySelector(`audio[data-index="${index}"]`)
    audio.currentTime = 0;
    audio.play();

    // set current audio to the one playing
    nowPlaying = audio;
  }, 800)
}
