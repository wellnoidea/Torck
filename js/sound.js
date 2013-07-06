////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// And Some Sound //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
SOUND:

http://cssdeck.com/labs/ping-pong-game-tutorial-with-html5-canvas-and-sounds
*/

// It got pretty annoying over time, so here's THE central sound 'button':
var sound_is_active = false;

// The background music
// Script source: 		http://stackoverflow.com/questions/3273552/html-5-audio-looping
// Sound source: 		http://opengameart.org/content/weltherrscher
myAudio = document.getElementById("backgroundTheme"); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

if (sound_is_active) {
	myAudio.play(); // reenable for the background sound
}

// Initialise the collision sound
// Will be played on iteration of the collision counter
// Initial inspiration: http://cssdeck.com/labs/ping-pong-game-tutorial-with-html5-canvas-and-sounds
// Sound source:		http://www.pacdv.com/sounds/mechanical_sounds.html 			'Metal Button'
collision = document.getElementById("collide"); // reenable for the collision sound
