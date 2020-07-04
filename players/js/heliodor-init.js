
/* global Deck */

var prefix = Deck.prefix

var transform = prefix('transform')

var translate = Deck.translate

var $container = document.getElementById('container')
var $topbar = document.getElementById('topbar')

var $sort = document.createElement('button')
var $shuffle = document.createElement('button')
var $bysuit = document.createElement('button')
var $fan = document.createElement('button')
var $poker = document.createElement('button')
var $flip = document.createElement('button')

$shuffle.textContent = 'Shuffle'
$sort.textContent = 'Sort'
$bysuit.textContent = 'By suit'
$fan.textContent = 'Fan'
$poker.textContent = 'Poker'
$flip.textContent = 'Flip'

$topbar.prepend($flip)
$topbar.prepend($shuffle)
// $topbar.appendChild($bysuit)
// $topbar.prepend($fan)
$topbar.prepend($poker)
// $topbar.appendChild($sort)

var deck = Deck(14)
console.log("this is deck14");
console.log(Deck(14));


deck.cards.forEach(function (card, i) {
  card.enableDragging()
  card.enableFlipping()
})


$shuffle.addEventListener('click', function () {
  deck.shuffle()
  deck.shuffle()
})
$sort.addEventListener('click', function () {
  deck.sort()
})
$bysuit.addEventListener('click', function () {
  deck.sort(true) // sort reversed
  deck.bysuit()
})
$fan.addEventListener('click', function () {
  deck.fan()
})
$flip.addEventListener('click', function () {
  deck.flip()
})
$poker.addEventListener('click', function () {
  deck.queue(function (next) {
    deck.cards.forEach(function (card, i) {
      setTimeout(function () {
        card.setSide('back')
      }, i * 7.5)
    })
    next()
  })
  deck.shuffle()
  deck.shuffle()
  deck.poker()
})

deck.mount($container)

//   var _deck3 = Array.from(document.querySelectorAll("#heliodor .card:not([class*='rank'])"));
// console.log("initarray" + _deck3)

deck.intro()
deck.sort()
deck.shuffle()
// deck.shuffle()


// var unFlipped = document.querySelectorAll("#heliodor .card:not([class*='rank'])");
// deck.shuffle(unFlipped)

//var cards = Array.from(document.querySelectorAll("#heliodor .card:not([class*='rank'])"));

        // Discard pile?
    
    // var discard = ["pizza", "chicken", "apple"];
    // console.log("discard pile");
    // console.log(discard);