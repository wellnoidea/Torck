////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// The Ticker //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// The tick function called from the Ticker property, this is an easeljs feature
function tick() {

	if (debugInfoCalled){
		debugInfo();
	}

	if (superTorckMode){
		for (var i=0;i<=numberOfTorcks;i++){ 
			torck[i].moveX = torck[currentTorck].moveX;
			torck[i].moveY = torck[currentTorck].moveY;
			torck[i].move();
		}
	} else {
		torck[currentTorck].move();
	}
	
	jumpLock--;
	if (torck[currentTorck].body.GetPosition().x < -350 || torck[currentTorck].body.GetPosition().x > 150) { achievementGained = true };

	// the offset gives the screen the delayed smooth following of torck, increase the last number for longer delays
	// before the offset calculation was in the torck[currentTorck].draw function, but that caused an artificial position difference between positions of 
	// objects beeing drawn before and after the calculation
	offsetX = offsetX + (torck[currentTorck].body.GetPosition().x * SCALE - offsetX) / 10;
	// decentreY moves the point where torck sits on the screen
	var decentreY = 100;
	offsetY = offsetY + decentreY;
	offsetY = offsetY + (torck[currentTorck].body.GetPosition().y * SCALE - offsetY) / 10;
	offsetY = offsetY - decentreY;
	// update the easeljs stage
	stage.update();

	
	drawBackground(); // ooohhhhh bad practice, not even an object!



	for (var key in aGroundThing) {
		aGroundThing[key].draw();
	}

		for (var key in aWritingOnTheWall) {
		aWritingOnTheWall[key].draw();
	}

	for (var i=0;i<=numberOfTorcks;i++){ 
		torck[i].draw();
	}
	
	drawForeground();

	if (debugDrawMode){
		var x = ((aGroundThing[1].body.GetPosition().x) * SCALE + 500 - offsetX);
		var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 300 - offsetY);
		var img = document.getElementById('mun');
		ctx.save();
		ctx.translate(x , y );
		world.DrawDebugData();
		ctx.restore();
	}

	// Increment or step our physics world forward
		// Time step here equal to the FPS
		// Velocity iterations, higher = more accurate but slower
		// Position Iterations, ~
	world.Step(1/60, 10, 10);
	world.ClearForces(); // ??? It basically seems to do what it says, bad idea to remove it. If you want to try, you have been warned!

}