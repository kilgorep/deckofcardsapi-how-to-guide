var baseAPIURL = "https://deckofcardsapi.com/api/";
var newDeck;

// Assume we have a button with id = "newDeckGet" in our HTML
document.getElementById('newDeckGet').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var newDeckURL = baseAPIURL + "new/";		// https://deckofcardsapi.com/api/new/
    req.open('GET', newDeckURL, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        newDeck = JSON.parse(req.responseText);
        document.getElementById('newDeckResponse').textContent = "Response: " + JSON.stringify(newDeck, null, 2);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    event.preventDefault();
  });
  
  document.getElementById('shuffleDeck').addEventListener('click', function(event){
	var req = new XMLHttpRequest();
    var shuffleURL = baseAPIURL + "deck/" + newDeck.deck_id + "/shuffle/";
    req.open('GET', shuffleURL, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        newDeck = JSON.parse(req.responseText);
        document.getElementById('deckShuffleResponse').textContent = "Response: " + JSON.stringify(newDeck, null, 2);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    event.preventDefault();
  });
  
  var newShuffledDeck;
  
  document.getElementById('newShuffledDeck').addEventListener('click', function(event){
	var req = new XMLHttpRequest();
	var nDecks = 1;
    var shuffleURL = baseAPIURL + "deck/new/shuffle/?deck_count=" + nDecks;
    req.open('GET', shuffleURL, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        newShuffledDeck = JSON.parse(req.responseText);
        //document.getElementById('newShuffledDeckResponse').textContent = "Response: " + req.responseText;
		document.getElementById('newShuffledDeckResponse').textContent = "Response: " + JSON.stringify(newShuffledDeck, null, 2);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    event.preventDefault();
  });
  
  var drawnCards;
  
  document.getElementById('drawCards').addEventListener('click', function(event){
	var req = new XMLHttpRequest();
	var nCards = 3;
    var drawURL = baseAPIURL + "deck/"+ newShuffledDeck.deck_id + "/draw/?count=" + nCards;
    req.open('GET', drawURL, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        drawnCards = JSON.parse(req.responseText);
		document.getElementById('drawnCards').textContent = "Response: " + JSON.stringify(drawnCards, null, 2);
		for (var i = 0; i < nCards; i++) {
			var cardImg = document.createElement("img");
			cardImg.setAttribute("src", drawnCards.cards[i].image);
			cardImg.setAttribute("height", "150");
			document.getElementById("drawnCardImgs").appendChild(cardImg);
		}
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    event.preventDefault();
  });
  
  document.getElementById('addPile').addEventListener('click', function(event){
	var req = new XMLHttpRequest();
	var nCards = 3;
    var pileAddURL = baseAPIURL + "deck/"+ newShuffledDeck.deck_id + "/pile/hand1/add/?cards=";
	for (var i = 0; i < nCards; i++){
		pileAddURL += drawnCards.cards[i].code;
		if (i < nCards - 1)
			pileAddURL += ",";
	}
    req.open('GET', pileAddURL, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var hand1Pile = JSON.parse(req.responseText);
		document.getElementById('addedToPile').textContent = "Response: " + JSON.stringify(hand1Pile, null, 2);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    event.preventDefault();
  });
  
  document.getElementById('drawPile').addEventListener('click', function(event){
	var req = new XMLHttpRequest();
    var drawURL = baseAPIURL + "deck/"+ newShuffledDeck.deck_id + "/pile/hand1/draw/?cards=";
	// draw from the bottom of the hand1 pile stack, i.e. drawnCards.cards[0]
	drawURL += drawnCards.cards[0].code;
    req.open('GET', drawURL, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var drawnPileCards = JSON.parse(req.responseText);
		document.getElementById('drawnFromPile').textContent = "Response: " + JSON.stringify(drawnPileCards, null, 2);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    event.preventDefault();
  });