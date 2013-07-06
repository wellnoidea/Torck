////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// World Objects ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function aGroundII(imageID, isSquare, posX, posY, sizeX, sizeY, isDynamic, density, restitution, friction, filterCategory, filterMask) {

	this.sizeX = sizeX;
	this.sizeY = sizeY;

	// 	- Needs a fixture definition (densitiy, friction, restitution)
	// 	- And a body definition
	// Define the fixture
	var fixDef = new box2d.b2FixtureDef()
	// set properties
	fixDef.density = density;

	// Filterin for making objects pass by each other while others collide with each other
	// For filtering see: 				http://www.aurelienribon.com/blog/2011/07/box2d-tutorial-collision-filtering/
	// For bitwise operators see: 		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
	fixDef.filter.categoryBits = filterCategory;
	fixDef.filter.maskBits = filterMask;
	
	//	fixDef.name = 'Torck';
	fixDef.friction = friction;
	//fixDef.shape = new box2d.b2CircleShape(19 / SCALE);
	if (isSquare){
		fixDef.shape = new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(sizeX / SCALE, sizeY / SCALE);
	} else {
		fixDef.shape = new box2d.b2CircleShape(sizeX / SCALE);
		sizeY = sizeX;
	}
	// The 'bounciness' of an object
	fixDef.restitution = restitution;

	

	// Define the body
	// There are two types of objects static and dynamic, the first is fixed like the floor, the second are the movable objects
	var bodyDef = new box2d.b2BodyDef();
		// The ball is dynamic, of course
	if (isDynamic){
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
	}else{
		bodyDef.type = box2d.b2Body.b2_staticBody;
	}
	bodyDef.position.x = posX / SCALE;	
	bodyDef.position.y = posY / SCALE;
	bodyDef.userData = 'ground';

	// create a body into the box2d world
	// Method chaining CreateBody() . CreateFixture() Yay!

	var b = world.CreateBody( bodyDef );
	var f = b.CreateFixture(fixDef);

	body = b;

	this.body = body;



	// draw is also (ab)used as do-per-tick function
	this.draw = function () {
		
		var x = (this.body.GetPosition().x) * SCALE + 500  - offsetX;
		var y = (this.body.GetPosition().y) * SCALE + 300  - offsetY;
	    var rotation = this.body.GetAngle();

	    ctx.save();
	    ctx.translate(x , y); // change origin
	    ctx.rotate(rotation);
		var img = document.getElementById(imageID);
		//*********************************************************************************************************************************************
		ctx.drawImage(img, -sizeX, -sizeY, 2 * sizeX, 2 * sizeY);
		ctx.restore();
		
	} 
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// A WET Copy of aGroundII /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function aSensor(imageID, isSquare, posX, posY, sizeX, sizeY, isDynamic, density, restitution, friction, filterCategory, filterMask) {

	this.sizeX = sizeX;
	this.sizeY = sizeY;

	// 	- Needs a fixture definition (densitiy, friction, restitution)
	// 	- And a body definition
	// Define the fixture
	var fixDef = new box2d.b2FixtureDef()
	// set properties
	fixDef.density = density;

	// Filterin for making objects pass by each other while others collide with each other
	// For filtering see: 				http://www.aurelienribon.com/blog/2011/07/box2d-tutorial-collision-filtering/
	// For bitwise operators see: 		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
	fixDef.filter.categoryBits = filterCategory;
	fixDef.filter.maskBits = filterMask;
	fixDef.isSensor = true;;
	
	//	fixDef.name = 'Torck';
	fixDef.friction = friction;
	//fixDef.shape = new box2d.b2CircleShape(19 / SCALE);
	if (isSquare){
		fixDef.shape = new box2d.b2PolygonShape();
		fixDef.shape.SetAsBox(sizeX / SCALE, sizeY / SCALE);
	} else {
		fixDef.shape = new box2d.b2CircleShape(sizeX / SCALE);
		sizeY = sizeX;
	}
	// The 'bounciness' of an object
	fixDef.restitution = restitution;

	

	// Define the body
	// There are two types of objects static and dynamic, the first is fixed like the floor, the second are the movable objects
	var bodyDef = new box2d.b2BodyDef();
		// The ball is dynamic, of course
	if (isDynamic){
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
	}else{
		bodyDef.type = box2d.b2Body.b2_staticBody;
	}
	bodyDef.position.x = posX / SCALE;	
	bodyDef.position.y = posY / SCALE;
	bodyDef.userData = 'sensor';
	//bodyDef.linearDamping = 1000;

	// create a body into the box2d world
	// Method chaining CreateBody() . CreateFixture() Yay!

	var b = world.CreateBody( bodyDef );
	var f = b.CreateFixture(fixDef);

	body = b;

	this.body = body;



	// draw is also (ab)used as do-per-tick function
	this.draw = function () {
		
		var x = (this.body.GetPosition().x) * SCALE + 500  - offsetX;
		var y = (this.body.GetPosition().y) * SCALE + 300  - offsetY;
	    var rotation = this.body.GetAngle();

	    ctx.save();
	    ctx.translate(x , y); // change origin
	    ctx.rotate(rotation);
		var img = document.getElementById(imageID);
		//*********************************************************************************************************************************************
		ctx.drawImage(img, -sizeX, -sizeY, 2 * sizeX, 2 * sizeY);
		ctx.restore();
		
	} 
}










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function thingy() {
	// 	- Needs a fixture definition (densitiy, friction, restitution)
		// 	- And a body definition
		// Define the fixture
		var fixDef = new box2d.b2FixtureDef()
		// set properties
		fixDef.density = 1;
		fixDef.friction = 1;
		fixDef.shape = new box2d.b2CircleShape((Math.random() * 50 + 10) / SCALE);
		// The 'bounciness' of an object
		fixDef.restitution = 0.9;

		// Define the body
		// There are two types of objects static and dynamic, the first is fixed like the floor, the second are the movable objects
		var bodyDef = new box2d.b2BodyDef();
			// The ball is dynamic, of course
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = Math.random() * 800 / SCALE;	
		bodyDef.position.y = 0 / SCALE;

		// create a body into the box2d world
		// Method chaining CreateBody() . CreateFixture() Yay!
		world.CreateBody(bodyDef).CreateFixture(fixDef);
}

