const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const outputDiv = document.getElementById('output');

let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else {
    console.log('Speech recognition not supported in this browser.');
}

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US'; // Set the language, change it as needed

let finalTranscript = '';

recognition.onstart = function () {
    console.log('Speech recognition started.');
};

recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
};

recognition.onend = function () {
    console.log('Speech recognition ended.');
};

recognition.onresult = function (event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }
    outputDiv.innerHTML = finalTranscript + '<span style="color: gray;">' + interimTranscript + '</span>';
};

startButton.addEventListener('click', function () {
    recognition.start();
});

stopButton.addEventListener('click', function () {
    recognition.stop();
});