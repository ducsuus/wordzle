// Wordzle JavaScript

/* Websockets */
var address = 'ws://wordzle.ducsuus.com:8888/wordzlenew/' + game_id;

var wordDiv = document.getElementById('words');

// Create a new websocket connection
var connection = new WebSocket(address);

// Is it our turn right now?
var isTurn = false;

// When the connection is open, send some data to the server
connection.onopen = function () {
  console.log('opened!');
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);

  if(e.data == 'switch_turn'){
  	isTurn = true;
  	document.getElementById("status-container").style.background = "#2EB82E";
    document.getElementById("status-container").innerHTML = "Your Turn";
  }else{
  	wordDiv.innerHTML += e.data + ' ';
  }

};

/* Send a word to the server */
function addWord(){

	var word_box = document.getElementById('word-input');

	if(isTurn && word_box.value !== ''){

		connection.send(word_box.value);
		word_box.value = '';
		
		isTurn = false;
	}

	document.getElementById("status-container").style.background = "#FF0000";
    document.getElementById("status-container").innerHTML = "Waiting For Players";

    word_box.select();

}

/* General functions */
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }else{
    	return true;
    }
}

function isAcceptableChar(event){
	// Allow for all upper-case letters, all lower-case letters, and the return key
	if ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || event.charCode == 13 || event.charCode == 44 || event.charCode == 46 || event.charCode == 39){return true;}else{return false;}
}