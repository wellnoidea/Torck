
/*
keycodes:
http://mikemurko.com/general/jquery-keycode-cheatsheet/
useful:
$('#textbox').keyup(function (e) {
	alert(e.keyCode);
});


*/

function debugInfo() {
	console.log('Position of Torck: x = ' + (torck[currentTorck].body.GetPosition().x * SCALE) + ', y = ' + (torck[currentTorck].body.GetPosition().y * SCALE));
	debugInfoCalled = false;
	console.log('torck:');//#delendum
	console.log(torck[currentTorck]);//#delendum
	console.log(torck[currentTorck].body.GetFixtureList().GetFilterData());//#delendum
	//console.log(torck[currentTorck].moveY);//#delendum
	console.log(numberOfTorcks);
	console.log(currentTorck);
	console.log(torck[currentTorck].contacts);

	console.log('playing with new box2d.b2Vec2(0 / SCALE, 20 / SCALE)');

	var a = new box2d.b2Vec2(10, 20);
	console.log(a);
	console.log(a.Length());
	var b = a.Normalize();

	console.log(a);
	console.log(b);
		console.log(a.Length());
}