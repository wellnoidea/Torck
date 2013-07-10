
/*
keycodes:
http://mikemurko.com/general/jquery-keycode-cheatsheet/
useful:
$('#textbox').keyup(function (e) {
	alert(e.keyCode);
});


*/

function debugInfo() {
	console.log('Position of Torck: x = ' + (torck.body.GetPosition().x * SCALE) + ', y = ' + (torck.body.GetPosition().y * SCALE));
	debugInfoCalled = false;
	console.log('torck:');//#delendum
	console.log(torck);//#delendum
	console.log(torck.body.GetFixtureList().GetFilterData());//#delendum
	//console.log(torck.moveY);//#delendum

}