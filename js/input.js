////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// The Keyboard Input //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

Keycodes:
http://www.mediaevent.de/javascript/Extras-Javascript-Keycodes.html

*/

// This is the only part requiring jQuery this far, upon exchange with sole JavaScript jQuery may be removed

$(document).keydown(function(e) {
	switch(e.keyCode) {
		case 37:
			torck[currentTorck].moveX = 1;
			break;
		case 38:
			torck[currentTorck].moveY = -1;
			break;
		case 39:
			torck[currentTorck].moveX = -1;
			break;
		case 40:
			torck[currentTorck].moveY = 1;
			break;
		case 49: // key: 1
			debugInfoCalled = true;
			break;
		case 50: // key: 2
			debugInfoCalled = true;
			break;
		case 51: // key: 3
			debugDrawMode = ! debugDrawMode;
			break;	
		case 13: // key: enter		
			if (superTorckMode){
				superTorckMode = false;
			} else {
				currentTorck++;	
			}

			if (currentTorck>numberOfTorcks){
				currentTorck = 0;
				superTorckMode = true;
			}
			console.log(superTorckMode);
			break;		/**/
	}
	return false;
});

$(document).keyup(function(e){
	switch(e.keyCode) {
		case 37:
			torck[currentTorck].moveX = 0;
			break;
		case 38:
			torck[currentTorck].moveY = 0;
			break;
		case 39:
			torck[currentTorck].moveX = 0;
			break;
		case 40:
			torck[currentTorck].moveY = 0;
			break;
	}
	return false;
});
