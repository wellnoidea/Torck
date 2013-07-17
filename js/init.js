////////// Some Notes /////////////////////////////////////////////////////////////////////////////////////////////
/*

http://www.box2d.org/manual.html
	6.2 Fixture Creation
	Filtering

"Box2D supports 16 collision categories. For each fixture you can specify which category it belongs to. 
You also specify what other categories this fixture can collide with."
Also see category and group filtering

Not implemented yet!

Fluff is for objects interacting with the world but not torck
Maybe a second category interacting with the static but not dynamic objects might be interesting
I'm not quite sure if three categories are really necessary, or if two might be enough

I have no idea what cinematic objects are...

Bit 		used by 				in use
 1 	    1 	Torck 					-
 2 	    2 	Ground I 				-
 3 	    4 	Ground II 				-
 4 	    8 	Ground III (?) 			-
 5 	   16 	Sensors I 				-
 6 	   32 	Sensors II (?)			-
 7 	   64 	Sensors III (?)			-
 8 	  128 	Fluff I 				-
 9 	  256 	Fluff II (?)			-
10 	 1024 	Fluff III (?)			-
11   2048 	Physics Objects I 		-
12   4096 	Physics Objects II 		-	
13 			Physics Objects III 	-
14 	
15 	
16 	

*/

////////// Something to Read and Ponder /////////////////////////////////////////////////////////////////////////////////////////////
/*
http://www.ajohnstone.com/test/hackday/CreateJS-EaselJS-b262a85/tutorials/Animation%20and%20Ticker/

*/







// Canvas definition
var c=document.getElementById("canvas"); 
var ctx=c.getContext("2d");
ctx.fillStyle="#773311";
ctx.fillRect(0,0,150,75);

// stage: the easeljs stage to be used
// world: the box2d world
// Defined on the global scope for referencing elsewhere this is for demonstration reasons only, normally better capsulated (?)
var stage, world, thingy,  debugDraw;
var aGroundThing = new Array(); // Better take an object in the long run
var torck = new Array();
var aWritingOnTheWall = new Array(); // Better take an object in the long run
//var groundElements = new Array();
var offsetX = 0;
var offsetY = 0;
var i = 0;
var j = 0;
var jumpLock = -1;
var blueBrickWallAlpha = 1; // this should really not be on the global scale

var achievementGained = false;
var debugInfoCalled = false;
var oscillationCounter = 0;
var debugDrawMode = false;
var currentTorck = 0;
var numberOfTorcks = 0;
var superTorckMode = false;

//The tick function provided by easeljs
// Lookin for a global function called tick on the global scope
createjs.Ticker.addListener(this)
createjs.Ticker.setFPS(60);
// Boolean property for request animation frame in easeljs. Yay!
createjs.Ticker.useRAF = true;



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// The Init Function, Let's Get Things Started /////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
	// The easeljs world, containing the DOM reference to the canvas element
	stage = new createjs.Stage(document.getElementById("canvas"));
	// The physics world
	setupPhysics();

	// zero object
	aGroundThing[++i] = new aGroundII("eroded_wood", true, 0, 0, 10, 10, false, 1, 0, 1, 3, -1);

	////////// Torck! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//	WET WET WET !!!!

	torck[currentTorck] = new aBall(2.345);
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
	aGroundThing[++i] = new aSensor("bloeder_ball", false, torck[currentTorck].startX, torck[currentTorck].startY + 1, torck[currentTorck].size - 1, 0, true, 0.1, 0.3, 1, 2, -1); 
	// fix the rotational degree of freedom to always have it underneath
	aGroundThing[i].body.SetFixedRotation(true);
	aGroundThing[i].body.SetUserData('infraSensor'); // the infra- is the lower sensor, the jump sensor
	aGroundThing[i].body.helloMyNumberIs = currentTorck;
	console.log(aGroundThing[i].body);//#delendum
	// pin it onto torck with a slight offset downwards (to-do)
	var joint = new box2d.b2RevoluteJointDef();
	joint.Initialize(aGroundThing[i].body, torck[currentTorck].body, torck[currentTorck].body.GetWorldCenter());
	this.world.CreateJoint(joint)





	torck[++currentTorck] = new aBall(0.01);
	torck[currentTorck].jumpImpulse = 4;
	torck[currentTorck].torque = 5;
	torck[currentTorck].speedLimiter = 0.8;
	torck[currentTorck].skin = 'skull';
	torck[currentTorck].skinStretchY = 45; 
	torck[currentTorck].skinPosY = -21;
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
	aGroundThing[++i] = new aSensor("bloeder_ball", false, torck[currentTorck].startX, torck[currentTorck].startY + 1, torck[currentTorck].size - 1, 0, true, 0.1, 0.3, 1, 2, -1); 
	// fix the rotational degree of freedom to always have it underneath
	aGroundThing[i].body.SetFixedRotation(true);
	aGroundThing[i].body.SetUserData('infraSensor'); // the infra- is the lower sensor, the jump sensor
	aGroundThing[i].body.helloMyNumberIs = currentTorck;
	console.log(aGroundThing[i].body);//#delendum
	// pin it onto torck with a slight offset downwards (to-do)
	var joint = new box2d.b2RevoluteJointDef();
	joint.Initialize(aGroundThing[i].body, torck[currentTorck].body, torck[currentTorck].body.GetWorldCenter());
	this.world.CreateJoint(joint)




	// Since it's the player torck gets his own definition
	// Singleton style no more
	torck[++currentTorck] = new aBall(500);
	torck[currentTorck].jumpImpulse = 17000;
	torck[currentTorck].torque = 10000;
	torck[currentTorck].speedLimiter = 5000000;
	torck[currentTorck].skin = 'ork';
	torck[currentTorck].skinStretchY = 52; 
	torck[currentTorck].skinStretchX = 52; 
	torck[currentTorck].skinPosX = -26;
	torck[currentTorck].skinPosY = -32;
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
	aGroundThing[++i] = new aSensor("bloeder_ball", false, torck[currentTorck].startX, torck[currentTorck].startY + 1, torck[currentTorck].size - 1, 0, true, 0.1, 0.3, 1, 2, -1); 
	// fix the rotational degree of freedom to always have it underneath
	aGroundThing[i].body.SetFixedRotation(true);
	aGroundThing[i].body.SetUserData('infraSensor'); // the infra- is the lower sensor, the jump sensor
	aGroundThing[i].body.helloMyNumberIs = currentTorck;
	console.log(aGroundThing[i].body);//#delendum
	// pin it onto torck with a slight offset downwards (to-do)
	var joint = new box2d.b2RevoluteJointDef();
	joint.Initialize(aGroundThing[i].body, torck[currentTorck].body, torck[currentTorck].body.GetWorldCenter());
	this.world.CreateJoint(joint)


	







	numberOfTorcks = currentTorck;
	currentTorck = 0;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	// (imageID, isSquare, posX, posY, sizeX, sizeY, isDynamic, density, restitution, friction, filterCategory, filterMask)
	
	
	aGroundThing[++i] = new aGroundII("eroded_wood", true, 0, 0, 10, 10, false, 1, 0, 1, 3, -1);
	// Lowest Ground
	aGroundThing[++i] = new aGroundII("eroded_wood", true, 2000, 600, 2000, 20, false, 1, 0, 1, 3, -1); 
	// Left wall
	aGroundThing[++i] = new aGroundII("eroded_wood", true, 0, 380, 10, 240, false, 1, 0, 1, 3, -1); 

 
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
	/** /
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
	/** /
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 8, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 9, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 9, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 10, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 10, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 600, 250, 11, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleRed", false, 600, 250, 11, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleRed", false, 600, 250, 12, 25, true, 0.1, 0.2, 1, 2, 2);
	aGroundThing[++i] = new aGroundII("appleRed", false, 600, 250, 13, 25, true, 0.1, 0.2, 1, 2, 2);

	aGroundThing[++i] = new aGroundII("appleGreen", false, 800, 250, 10, 25, true, 0.1, 0.2, 0.01, 1, 5);
	aGroundThing[++i] = new aGroundII("appleGreen", false, 800, 250, 11, 25, true, 0.1, 0.2, 0.01, 1, 5);
	aGroundThing[++i] = new aGroundII("appleRed", false, 800, 250, 11, 25, true, 0.1, 0.2, 1, 0.01, 5);
	/**/

	

	////////// A One Sided Platform, a True Classic //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// http://www.emanueleferonato.com/2010/03/02/understanding-box2ds-one-way-platforms-aka-clouds/
	// for the actual functionality see listeners.js
	// off topi: http://encosia.com/first-class-functions-as-an-alternative-to-javascripts-switch-statement/

	aGroundThing[++i] = new aGroundII("metal", true, 900, 450, 100, 10, false, 0.1, 0, 1, 1, -1);
	aGroundThing[i].body.SetUserData('oneSidedUpDown'); // UpDown states the solid direction

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	////////// The Playground, Just Stuff to Fool Around //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// (imageID, isSquare, posX, posY, sizeX, sizeY, isDynamic, density, restitution, friction, filterCategory, filterMask)
	//some blocks

	aGroundThing[++i] = new aGroundII("metal", true, 		-1200, -170, 100, 10, false, 0.1, 0, 1, 1, -1);
	aGroundThing[i].body.SetUserData('oneSidedUpDown'); // UpDown states the solid direction
	aGroundThing[++i] = new aGroundII("eroded_wood", true, -1400, -180, 100, 10, false, 1, 0, 1, 3, -1); 
	aGroundThing[i].body.SetAngle(0.1); 
	aGroundThing[++i] = new aGroundII("eroded_wood", true, -1600, -210, 100, 10, false, 1, 0, 1, 3, -1); 
	aGroundThing[i].body.SetAngle(0.2); 
	aGroundThing[++i] = new aGroundII("eroded_wood", true, -1800, -265, 100, 10, false, 1, 0, 1, 3, -1); 
	aGroundThing[i].body.SetAngle(0.3); 
	aGroundThing[++i] = new aGroundII("eroded_wood", true, -2000, -340, 100, 10, false, 1, 0, 1, 3, -1); 
	aGroundThing[i].body.SetAngle(0.4); 
	aGroundThing[++i] = new aGroundII("eroded_wood", true, -2200, -430, 100, 10, false, 1, 0, 1, 3, -1); 
	aGroundThing[i].body.SetAngle(0.5); 
	aGroundThing[++i] = new aGroundII("eroded_wood", true, -2370, -545, 100, 10, false, 1, 0, 1, 3, -1); 
	aGroundThing[i].body.SetAngle(0.7);
	aGroundThing[++i] = new aGroundII("eroded_wood", true, -2500, -680, 100, 10, false, 1, 0, 1, 3, -1); 
	aGroundThing[i].body.SetAngle(0.9);
/** /
	aGroundThing[++i] = new aGroundII("schaumstoff", true, -200, -500, 25, 25, true, 0.02, 0.9, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("schaumstoff", true, -400, -500, 50, 50, true, 0.02, 0.9, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("schaumstoff", true, -600, -500, 75, 75, true, 0.02, 0.9, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("concrete", true, -800, 0, 25, 25, true, 50, 0, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("concrete", true, -1000, 0, 50, 50, true, 50, 0, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("concrete", true, -1200, 0, 75, 75, true, 50, 0, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("bloeder_ball", false, -1600, 0, 25, 25, true, 0.1, 0.8, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("bloeder_ball", false, -1800, 0, 50, 25, true, 0.1, 0.8, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("bloeder_ball", false, -2000, 0, 75, 25, true, 0.1, 0.8, 1, 2, -1); 
	aGroundThing[++i] = new aGroundII("eis", true, -2200, 0, 25, 25, true, 1, 0, 0.001, 2, -1); 
	aGroundThing[++i] = new aGroundII("eis", true, -2400, 0, 50, 50, true, 1, 0, 0.001, 2, -1); 
	aGroundThing[++i] = new aGroundII("eis", true, -2600, 0, 75, 75, true, 1, 0, 0.001, 2, -1);
	aGroundThing[++i] = new aGroundII("eis", true, -2800, 0, 75, 5, true, 1, 0, 0.001, 2, -1);
/**/
	// stairway to the playground
	aGroundThing[++i] = new aGroundII("metal", true, 30, 150, 20, 10, false, 0.1, 0, 1, 1, -1);
	aGroundThing[i].body.SetUserData('oneSidedUpDown'); // UpDown states the solid direction
	aGroundThing[++i] = new aGroundII("metal", true, 30, 300, 20, 10, false, 0.1, 0, 1, 1, -1);
	aGroundThing[i].body.SetUserData('oneSidedUpDown'); // UpDown states the solid direction
	aGroundThing[++i] = new aGroundII("metal", true, 30, 450, 20, 10, false, 0.1, 0, 1, 1, -1);
	aGroundThing[i].body.SetUserData('oneSidedUpDown'); // UpDown states the solid direction
	// the playground ground
	aGroundThing[++i] = new aGroundII("eroded_wood", true, -5000, 150, 4990, 10, false, 1, 0, 1, 3, -1); 

	//

	aWritingOnTheWall[++j] = new aWriting(0, 0, 'Null/Null')
	aWritingOnTheWall[++j] = new aWriting(-3200, -200, 'Filter Tests')
	aWritingOnTheWall[++j] = new aWriting(-3200, -180, 'categoryBits: ' + torck[currentTorck].body.GetFixtureList().GetFilterData().categoryBits)
	aWritingOnTheWall[++j] = new aWriting(-3200, -160, 'groupIndex:   ' + torck[currentTorck].body.GetFixtureList().GetFilterData().groupIndex)
	aWritingOnTheWall[++j] = new aWriting(-3200, -140, 'maskBits:     ' + torck[currentTorck].body.GetFixtureList().GetFilterData().maskBits)

    this.world.SetContactListener(listener);

}