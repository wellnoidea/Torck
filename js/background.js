////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawBackground(){

	// Mun
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE + 3000  - offsetX) * 0.1;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 300  - offsetY) * 0.1;
	var img = document.getElementById('mun');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 200,  -100, 250, 250);
	ctx.restore();
	
	// cloud
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE + 3000  - offsetX) * 0.5;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 250  - offsetY) * 0.5;
	var img = document.getElementById('cloud');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 50,  50);
	ctx.restore();

	// grass behind the moving objects
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 800  - offsetX) * 1;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 180  - offsetY) * 1;
	var img = document.getElementById('grassBackground');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 150, 100);
	ctx.restore();

	// red brick wall
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 3500 - offsetX);
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 140 - offsetY);
	var img = document.getElementById('redBrickWall');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 500, 300);
	ctx.restore();/**/

	// shieldBlueSkull
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 3450 - offsetX);
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 190 - offsetY);
	var img = document.getElementById('shieldBlueSkull');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 113, 128);
	ctx.restore();/**/

	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 3150 - offsetX);
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 190 - offsetY);
	var img = document.getElementById('shieldBlueSkull');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 100, 116);
	ctx.restore();/**/

	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 3350 - offsetX);
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 190 - offsetY);
	var img = document.getElementById('rope');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 210, 34);
	ctx.restore();/**/

}

function drawForeground(){

/** /// oscillating ball
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 2900 - offsetX);
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 200 - offsetY);
	var img = document.getElementById('bloeder_ball');
	ctx.save();
	ctx.globalAlpha = Math.sin(oscillationCounter / 100) * Math.sin(oscillationCounter++ / 100);
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 50, 50);
	ctx.restore(); /**/

	if (achievementGained){
	var img = document.getElementById('achievement');
	ctx.drawImage(img, 500, 200);
	}

	// grass in front of the moving objects
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 650 - offsetX) * 1;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 180 - offsetY) * 1;
	var img = document.getElementById('grassBackground');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 150, 100);
	ctx.restore();



	// cloud
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE + 750 - offsetX) * 2;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 70 - offsetY) * 2;
	var img = document.getElementById('cloud');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0);
	ctx.restore();



	// vignette, not moving at all
	var img = document.getElementById('vignette');
	ctx.drawImage(img, 0, 0, 1200, 600);


	// FPS counter
	ctx.font = "bold 16px Arial";
	ctx.fillText(Math.ceil(createjs.Ticker.getMeasuredFPS()), 10, 20);

	// blue brick wall
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 3500 - offsetX);
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 140 - offsetY);
	var img = document.getElementById('blueBrickWall');
	ctx.save();
	var torckIsInside = Boolean ((torck.body.GetPosition().x * SCALE) < -3500
		&& (torck.body.GetPosition().x * SCALE) > -4000);

	if (torckIsInside && blueBrickWallAlpha > 0.01){
		blueBrickWallAlpha = blueBrickWallAlpha - 0.01;
	} 
	else if (blueBrickWallAlpha < 0.01) {
		blueBrickWallAlpha = 0; // !!! otherwise blueBrickWallAlpha lands a fracture of almost nothing in the negative range and this has the
								// same effect as being 1
	}
	if ( ! torckIsInside && blueBrickWallAlpha < 1){
		blueBrickWallAlpha += 0.01;
	} 
	ctx.globalAlpha = blueBrickWallAlpha;
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 500, 300);
	ctx.restore();/**/

}


