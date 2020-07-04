
/* global Discard */

var prefix = Discard.prefix

var transform = prefix('transform')

var translate = Discard.translate

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

var discard = Discard(14)

discard.cards.forEach(function (card, i) {
  card.enableDragging()
  card.enableFlipping()
})


$shuffle.addEventListener('click', function () {
  discard.shuffle()
  discard.shuffle()
})
$sort.addEventListener('click', function () {
  discard.sort()
})
$bysuit.addEventListener('click', function () {
  discard.sort(true) // sort reversed
  discard.bysuit()
})
$fan.addEventListener('click', function () {
  discard.fan()
})
$flip.addEventListener('click', function () {
  discard.flip()
})
$poker.addEventListener('click', function () {
  discard.queue(function (next) {
    discard.cards.forEach(function (card, i) {
      setTimeout(function () {
        card.setSide('back')
      }, i * 7.5)
    })
    next()
  })
  discard.shuffle()
  discard.shuffle()
  discard.poker()
})

discard.mount($container)

//   var _discard3 = Array.from(document.querySelectorAll("#heliodor .card:not([class*='rank'])"));
// console.log("initarray" + _discard3)

discard.intro()
discard.sort()
//discard.shuffle()
// discard.shuffle()


// var unFlipped = document.querySelectorAll("#heliodor .card:not([class*='rank'])");
// discard.shuffle(unFlipped)

//var cards = Array.from(document.querySelectorAll("#heliodor .card:not([class*='rank'])"));

        // Discard pile?
    
    // var discard = ["pizza", "chicken", "apple"];
    // console.log("discard pile");
    // console.log(discard);