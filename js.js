// Websocket testing, let's test some websockets!

console.log("Websocket testing starting");

var address = 'ws://localhost:8888/websocket';
address = 'ws://ducsuus.com:8888/websocket';

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

function addWord(){
	connection.send(prompt('message: '));
}