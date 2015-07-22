// Wordzle JavaScript


/* Websockets */
var address = 'ws://ducsuus.com:8888/websocket';

var wordDiv = document.getElementById('words');

// Create a new websocket connection
var connection = new WebSocket(address);

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

  wordDiv.innerHTML += e.data + '<br>';

};

/* Send a word to the server */
function addWord(){

	var word_box = document.getElementById('word-input');
    
    if(isPlayerAllowedToPost === true){
        if(word_box.value !== ''){
            connection.send(word_box.value);

            word_box.value = '';
        }
    }
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
	if ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 13)){return true;}else{return false;}
}

/* Functions and variables to allow or disallow the user */
var isPlayerAllowedToPost = false;

function allowPlayer(){
    isPlayerAllowedToPost = true;
    document.getElementById("status-container").style.background = "green";
    console.log(isPlayerAllowedToPost);
}

function disallowPlayer(){
    isPlayerAllowedToPost = false;
    console.log(isPlayerAllowedToPost);
    document.getElementById("status-container").style.background = "red";
}