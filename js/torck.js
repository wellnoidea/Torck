////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Definition of Torck Himself /////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Torck is the name of the skull, aBall its 'class'

function aBall(density) {
	this.helloMyNumberIs = currentTorck;
	this.moveX = 0;
	this.moveY = 0;
	this.size = 20;
	this.startX = -5000 + currentTorck * 2000;
	this.startY = -200;
	this.contacts = 0;
	this.skin = 'king';
	this.skinStretchX = 40;
	this.skinStretchY = 48;
	this.skinPosX = -20;
	this.skinPosY = -26;
	this.jumpImpulse = 80;
	this.torque = 80;
	this.speedLimiter = 240;
	this.jumpLock = 0;


	// 	- Needs a fixture definition (densitiy, friction, restitution)
	// 	- And a body definition
	// Define the fixture
	var fixDef = new box2d.b2FixtureDef()
	// set properties
	fixDef.density = density;
//	fixDef.userData = 'Torck';
//	fixDef.name = 'Torck';
	fixDef.friction = 0.4;
	fixDef.shape = new box2d.b2CircleShape(this.size / SCALE);
	// The 'bounciness' of an object
	fixDef.restitution = 0.0;
	fixDef.filter.categoryBits = 4;
	fixDef.filter.maskBits = -1;

	var fixDefII = new box2d.b2FixtureDef();


	fixDefII.shape = new box2d.b2CircleShape();
	fixDefII.shape.SetRadius(this.size / SCALE);
	fixDefII.shape.SetLocalPosition(new box2d.b2Vec2(0 / SCALE, 20 / SCALE));
	fixDefII.density = 0.01

	// Define the body
	// There are two types of objects static and dynamic, the first is fixed like the floor, the second are the movable objects
	var bodyDef = new box2d.b2BodyDef();
		// The ball is dynamic, of course
	//bodyDef.type = box2d.b2Body.b2_dynamicBody;
	bodyDef.type = box2d.b2Body.b2_dynamicBody;
	bodyDef.position.x = this.startX / SCALE;	
	bodyDef.position.y = this.startY / SCALE;
	bodyDef.userData = 'torck';
	

	// create a body into the box2d world
	var b = world.CreateBody( bodyDef );
	var fixI = b.CreateFixture(fixDef);
//	var fixII = b.CreateFixture(fixDefII);

	body = b;

	this.body = body;

	// draw is also (ab)used as do-per-tick function
	this.draw = function () {
	//	var x = this.body.GetPosition().x * SCALE;
	//	var y = this.body.GetPosition().y * SCALE;

		var x = this.body.GetPosition().x * SCALE - offsetX + 500;
		var y = this.body.GetPosition().y * SCALE - offsetY + 300;

		// a first try to get a jumpsensor, not quite optimal....
		//posXY = new box2d.b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y);
		//aGroundThing[3].body.SetPosition(posXY);


		this.body.GetLinearVelocity()


	    var rotation = this.body.GetAngle();

	    if (this.body.GetContactList() !== null) {
	    	force = new box2d.b2Vec2(0, -1 * 200);
	    	//this.body.ApplyImpulse(force, this.body.GetPosition());
	    };//#delendum}//#delendum

	    ctx.save();
	    ctx.translate(x, y); // change origin
	 //   ctx.rotate(rotation);
	 	// I slow the rotation of the torck graphic, otherwise it rotates annoyingly fast
	    ctx.rotate(rotation * 0.75);
		var img = document.getElementById(this.skin);
		//******************************************************************************************************************************************
		ctx.drawImage(img, this.skinPosX, this.skinPosY, this.skinStretchX, this.skinStretchY);
		ctx.restore();




	} 

	this.move = function () {

		this.jumpLock--;

		var vorzeichen = 0;
		if (this.body.GetLinearVelocity().x > 0){
			var vorzeichen = -1;
		}else{
			var vorzeichen = 1;
		}
		if (this.moveX !== 0)
		{
			force = new box2d.b2Vec2(-this.moveX * 100 , 0);
		//	if (this.body.GetLinearVelocity().y < 0.1 && this.body.GetLinearVelocity().y > -0.1 ){
				this.body.ApplyTorque(( - this.moveX * this.torque) - this.body.GetAngularVelocity() * this.speedLimiter / this.torque );
		//	}
			//this.body.ApplyForce(force, this.body.GetPosition());
			//this.body.GetPosition()
		}

		// Yay! Jumping!
		if (this.moveY === -1){
			force = new box2d.b2Vec2(0, -this.jumpImpulse);
			// this.body.GetLinearVelocity().y > -15 avoids torck skyrocketing, you may only jump if you're not already rising fast
			if (this.contacts > 0 && this.body.GetLinearVelocity().y > -15 && this.jumpLock < 0){
				this.body.ApplyImpulse(force, this.body.GetPosition());
				this.jumpLock = 25;
			} else {
				
			}
		}
	}
}