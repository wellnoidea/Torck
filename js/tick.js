////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// The Ticker //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// The tick function called from the Ticker property, this is an easeljs feature
function tick() {

	torck.move();


	// the offset gives the screen the delayed smooth following of torck, increase the last number for longer delays
	// before the offset calculation was in the torck.draw function, but that caused an artificial position difference between positions of 
	// objects beeing drawn before and after the calculation
	offsetX = offsetX + (torck.body.GetPosition().x * SCALE - offsetX) / 10;
	offsetY = offsetY + (torck.body.GetPosition().y * SCALE - offsetY) / 10;
	
	// update the easeljs stage
	stage.update();

	//world.DrawDebugData();
	
	drawBackground(); // ooohhhhh bad practice, not even an object!

	// Draw what's comin from the Debug
	// Increment or step our physics world forward
		// Time step here equal to the FPS
		// Velocity iterations, higher = more accurate but slower
		// Position Iterations, ~
	// How about a for heh?
	for (var key in aGroundThing) {
		aGroundThing[key].draw();
	}

	torck.draw();
	drawForeground();

	world.Step(1/60, 10, 10);
	world.ClearForces(); // ???

}