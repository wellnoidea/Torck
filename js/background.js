////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawBackground(){

	// Mun
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE + 3000  - offsetX) * 0.2;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 300  - offsetY) * 0.2;
	var img = document.getElementById('bloeder_ball');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 50,  0, 50, 50);
	ctx.restore();
	
	// cloud
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE + 3000  - offsetX) * 0.5;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 250  - offsetY) * 0.5;
	var img = document.getElementById('cloud');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 50,  50);
	ctx.restore();
}

function drawForeground(){

	// cloud
	var x = ((aGroundThing[1].body.GetPosition().x) * SCALE + 2000  - offsetX) * 2;
	var y = ((aGroundThing[1].body.GetPosition().y) * SCALE + 280  - offsetY) * 2;
	var img = document.getElementById('cloud');
	ctx.save();
	ctx.translate(x , y );
	ctx.drawImage(img, 50,  50);
	ctx.restore();


}
