
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// The Init Function, Let's Get Things Started /////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
	// The easeljs world, containing the DOM reference to the canvas element
	stage = new createjs.Stage(document.getElementById("canvas"));
	// The physics world
	setupPhysics();

	////////// Torck! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Since it's the player torck gets his own definition
	// Singleton style
	torck = new aBall;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	//function aGroundII(imageID, isSquare, posX, posY, sizeX, sizeY, isDynamic, density, restitution, friction, filterCategory, filterMask) {
	// an artifact requires i to start from zero 

	// Lowest Ground
	aGroundThing[++i] = new aGroundII("eroded_wood", true, 2000, 600, 2000, 20, false, 1, 0, 1, 3, -1); 
	// Left wall
	aGroundThing[++i] = new aGroundII("eroded_wood", true, 10, 300, 10, 1000, false, 1, 0, 1, 3, -1); 
	//some blocks
//	aGroundThing[++i] = new aGroundII("schaumstoff", true, 70, -1000, 30, 30, true, 0.1, 0.5, 1, 2, -1); 
//	aGroundThing[++i] = new aGroundII("concrete", true, 100, 0, 25, 25, true, 50, 0, 1, 2, -1); 
//	aGroundThing[++i] = new aGroundII("bloeder_ball", false, 600, 250, 25, 25, true, 0.1, 0.8, 1, 2, -1); 
 
	////////// Testing a Rotationally Locked Object //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/** /
	// the left trunk is not locked
	aGroundThing[++i] = new aGroundII("eroded_wood", true, 400, 300, 5, 30, true, 0.1, 0.3, 1, 2, -1);
	aGroundThing[i].body.SetAngle(0.5); 
	//  the right trunk is locked, which makes for some really weird physics    oO           may be VERY useful for sensors
	aGroundThing[++i] = new aGroundII("eroded_wood", true, 550, 300, 5, 30, true, 0.1, 0.3, 1, 2, -1);
	aGroundThing[i].body.SetFixedRotation(true);
	aGroundThing[i].body.SetAngle(0.5);
	/**/


	////////// Let's Make Some Joints! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	// http://blog.sethladd.com/2011/09/box2d-and-joints-for-javascript.html
	/**/
	aGroundThing[++i] = new aGroundII("oldGreyWood", true, 600, 250, 100, 5, true, 0.1, 0.3, 1, 2, -1);
	aGroundThing[++i] = new aGroundII("wagonWheel_01", false, 500, 250, 40, 0, true, 0.1, 0.1, 1, 2, -1);
	aGroundThing[++i] = new aGroundII("wagonWheel_02", false, 700, 250, 40, 0, true, 0.1, 0.1, 1, 2, -1);

	var joint = new box2d.b2RevoluteJointDef();
	// GetWorldCenter gives me the exact middle of my body, here the wheel
	var worldCenter = aGroundThing[i - 1].body.GetWorldCenter();
	// and now I move the point slightly off to have a nicely wobbling wheel
	worldCenter.y = worldCenter.y + 4 / SCALE
	joint.Initialize(aGroundThing[i - 2].body, aGroundThing[i - 1].body, worldCenter);
	this.world.CreateJoint(joint)

	var joint = new box2d.b2RevoluteJointDef();
	var worldCenter = aGroundThing[i].body.GetWorldCenter();
	console.log(worldCenter);//#delendum
	worldCenter.y = worldCenter.y - 2 / SCALE
	joint.Initialize(aGroundThing[i - 2].body, aGroundThing[i].body, aGroundThing[i].body.GetWorldCenter());
	this.world.CreateJoint(joint)

	console.log(i);//#delendum
	console.log(aGroundThing[i]);//#delendum
	/**/

	////////// Filtered Apples! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// those apples are not only mere decoration but also a test for filtering
	// best enjoyed on the cart from the Let's Make Some Joints! section
	/**/
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 8, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 9, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 9, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 10, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 10, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 11, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleRed", false, 600, 250, 11, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleRed", false, 600, 250, 12, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleRed", false, 600, 250, 13, 25, true, 0.1, 0.2, 1, 2, 2);

	aGroundThing[++i] = new aGroundII("appleGreen", false, 800, 250, 10, 25, true, 0.1, 0.2, 1, 1, 5);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 800, 250, 11, 25, true, 0.1, 0.2, 1, 1, 5);
	aGroundThing[++i] = new aGroundII("appleRed", false, 800, 250, 11, 25, true, 0.1, 0.2, 1, 1, 5);
	/**/

	////////// Aaand Now to a Decent Jump Sensor! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	/* the jump sensor needs to be situated underneath torck all the time
	 * thus additional fixtures on it are not going to work since they will rotate with torck in unisono
	 * therefore I'll use a revolute joint putting a fixed rotation sensor on torck 
	 *		// argh, the internetz gets me distracted every time...   *_*
	 * the current configuration prevents wall crawling and sticking on ceilings, but at least the latter should be reintroduced   :)
	 * DO NOT COMMENT THIS SECTION! or jumping will fail
	 */
	// the sensor is slightly smaller (-1) than torck to avoid a feedback when next to walls to avoid wall crawling
	// the sensor is placed slightly below torck (+1) to stick out and get an overlap with the ground
	aGroundThing[++i] = new aSensor("bloeder_ball", false, torck.startX, torck.startY + 1, torck.size - 1, 0, true, 0.1, 0.3, 1, 2, -1); 
	// fix the rotational degree of freedom to always have it underneath
	aGroundThing[i].body.SetFixedRotation(true);
	aGroundThing[i].body.SetUserData('infraSensor'); // the infra- is the lower sensor, the jump sensor
	console.log(aGroundThing[i].body);//#delendum
	// pin it onto torck with a slight offset downwards (to-do)
	var joint = new box2d.b2RevoluteJointDef();
	joint.Initialize(aGroundThing[i].body, torck.body, torck.body.GetWorldCenter());
	this.world.CreateJoint(joint)

	////////// A One Sided Platform, a True Classic //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// http://www.emanueleferonato.com/2010/03/02/understanding-box2ds-one-way-platforms-aka-clouds/
	// for the actual functionality see listeners.js
	// off topi: http://encosia.com/first-class-functions-as-an-alternative-to-javascripts-switch-statement/

	aGroundThing[++i] = new aGroundII("metal", true, 900, 450, 100, 10, false, 0.1, 0, 1, 1, -1);
	aGroundThing[i].body.SetUserData('oneSidedUpDown'); // UpDown states the solid direction

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    this.world.SetContactListener(listener);

}