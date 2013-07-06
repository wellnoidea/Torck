
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

	////////// Filtered Apples! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// those apples are not only mere decoration but also a test for filtering
	// best enjoyed with the cart from the Let's Make Some Joints! section
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
	 */

	aGroundThing[++i] = new aSensor("eroded_wood", true, 200, 220, 5, 30, true, 0.1, 0.3, 1, 2, -1);
	aGroundThing[i].body.SetFixedRotation(true);
	console.log(aGroundThing[i].body);//#delendum
	var joint = new box2d.b2RevoluteJointDef();
	joint.Initialize(aGroundThing[i].body, torck.body, torck.body.GetWorldCenter());
	this.world.CreateJoint(joint)


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	//The tick function provided by easeljs
	// Lookin for a global function called tick on the global scope
	createjs.Ticker.addListener(this)
	createjs.Ticker.setFPS(60);
	// Boolean property for request animation frame in easeljs. Yay!
	createjs.Ticker.useRAF = true;

	var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = function(contact) {
    	if ((contact.GetFixtureA().GetBody().m_userData === 'torck' && contact.GetFixtureB().GetBody().m_userData === 'ground') ||
			(contact.GetFixtureA().GetBody().m_userData === 'ground' && contact.GetFixtureB().GetBody().m_userData === 'torck')) {
    		torck.contacts++;
    		if (sound_is_active) {
				collision.currentTime = 0.07;
				collision.play(); // Reenable to get the collision sound
			}
    	}
    }

    listener.EndContact = function(contact) {
        if ((contact.GetFixtureA().GetBody().m_userData === 'torck' && contact.GetFixtureB().GetBody().m_userData === 'ground') ||
			(contact.GetFixtureA().GetBody().m_userData === 'ground' && contact.GetFixtureB().GetBody().m_userData === 'torck')) {
    		torck.contacts--;
    	}
    }

    listener.PostSolve = function(contact, impulse) {
    	//
    }

    listener.PreSolve = function(contact, oldManifold) {
    	//
    }

    this.world.SetContactListener(listener);

}