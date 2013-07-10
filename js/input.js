////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// The Keyboard Input //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This is the only part requiring jQuery this far, upon exchange with sole JavaScript jQuery may be removed

$(document).keydown(function(e) {
	switch(e.keyCode) {
		case 37:
			torck.moveX = 1;
			break;
		case 38:
			torck.moveY = -1;
			break;
		case 39:
			torck.moveX = -1;
			break;
		case 40:
			torck.moveY = 1;
			break;
		case 13: // return
			debugInfoCalled = true;
			break;
	}
	return false;
});

$(document).keyup(function(e){
	switch(e.keyCode) {
		case 37:
			torck.moveX = 0;
			break;
		case 38:
			torck.moveY = 0;
			break;
		case 39:
			torck.moveX = 0;
			break;
		case 40:
			torck.moveY = 0;
			break;
	}
	return false;
});
