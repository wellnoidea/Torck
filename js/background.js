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

}

function drawForeground(){

	if (achievementGained){
		var img = document.getElementById('achievement');
		ctx.drawImage(img, 500, 200);
	}

	// grass in front of the moving objects
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE - 650  - offsetX) * 1;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 180  - offsetY) * 1;
	var img = document.getElementById('grassBackground');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0, 150, 100);
	ctx.restore();



	// cloud
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE + 750  - offsetX) * 2;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 70  - offsetY) * 2;
	var img = document.getElementById('cloud');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 0, 0);
	ctx.restore();



	// vignette, not moving at all
	var img = document.getElementById('vignette');
	ctx.drawImage(img, 0, 0, 1200, 600);
}


