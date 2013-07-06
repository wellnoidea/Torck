/*
-	from: http://gotoandlearn.com/play.php?id=176
-	Registration Points of box2d objects are in the centre of the objects (not e.g. upper left)
-	"The box2d API might get a little to get used to"

-------------------

////////// FURTHER RESSOURCES: /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SOUND:

http://cssdeck.com/labs/ping-pong-game-tutorial-with-html5-canvas-and-sounds



OTHER GAME TUTORIALS:

http://blog.sklambert.com/html5-canvas-game-panning-a-background/




*/
// Object definition giving box2d kind of a namespace and allowing shortened terms to access box2d functions
// May be used in a self executing anonymous function to get it off the global scope

// Canvas definition
var c=document.getElementById("canvas"); 
var ctx=c.getContext("2d");
ctx.fillStyle="#FF0000";
ctx.fillRect(0,0,150,75);

var box2d = {
	b2Vec2 				: Box2D.Common.Math.b2Vec2,
	b2BodyDef 			: Box2D.Dynamics.b2BodyDef,
	b2Body 				: Box2D.Dynamics.b2Body,
	b2FixtureDef	 	: Box2D.Dynamics.b2FixtureDef,
	b2Fixture 			: Box2D.Dynamics.b2Fixture,
	b2World 			: Box2D.Dynamics.b2World,
	b2MassData 			: Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape 		: Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape 		: Box2D.Collision.Shapes.b2CircleShape,
	b2DebugDraw 		: Box2D.Dynamics.b2DebugDraw,
	b2MouseJointDef 	: Box2D.Dynamics.Joints.b2MouseJointDef,
	b2Shape 			: Box2D.Collision.Shapes.b2Shape,
	b2RevoluteJointDef 	: Box2D.Dynamics.Joints.b2RevoluteJointDef,
	b2Joint 			: Box2D.Dynamics.Joints.b2Joint,
	b2PrismaticJointDef : Box2D.Dynamics.Joints.b2PrismaticJointDef,
	b2ContactListener 	: Box2D.Dynamics.b2ContactListener,
	b2Settings 			: Box2D.Common.b2Settings,
	b2Mat22 			: Box2D.Common.Math.b2Mat22,
	b2EdgeChainDef 		: Box2D.Collision.Shapes.b2EdgeChainDef,
	b2EdgeShape 		: Box2D.Collision.Shapes.b2EdgeShape,
	b2WorldManifold 	: Box2D.Collision.b2WorldManifold
};
/*
var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2AABB = Box2D.Collision.b2AABB
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2Fixture = Box2D.Dynamics.b2Fixture
	, b2World = Box2D.Dynamics.b2World
	, b2MassData = Box2D.Collision.Shapes.b2MassData
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
	, b2Shape = Box2D.Collision.Shapes.b2Shape
	, b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
	, b2Joint = Box2D.Dynamics.Joints.b2Joint
	, b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef
	, b2ContactListener = Box2D.Dynamics.b2ContactListener
	, b2Settings = Box2D.Common.b2Settings
	, b2Mat22 = Box2D.Common.Math.b2Mat22
	, b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef
	, b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape
	, b2WorldManifold = Box2D.Collision.b2WorldManifold
	;*/


// box2d works in metres, the scale is used to calculate from metres to pixels, thus 1 m = 30 px
// Values given are in pixles thus / 400, value coming from box2d in metres thus * SCALE
var SCALE = 30;

// stage: the easeljs stage to be used
// world: the box2d world
// Defined on the global scope for referencing elsewhere this is for demonstration reasons only, normally better capsulated (?)
var stage, world, thingy, torck, debugDraw;
var aGroundThing = new Array(); // Better take an object in the long run
//var groundElements = new Array();
var offsetX = 0;
var offsetY = 0;
var i = 0;

function setupPhysics (){
	// b2World needs a vector (b2Vec2) for gravity which takes gravity on the x and the y axis
	// 		second property is for allowing sleeping bodies, here true
	world = new box2d.b2World( new box2d.b2Vec2(0, 50), true)

	// Setup debug draw
	var debugDraw = new box2d.b2DebugDraw();
	// Provide a canvas to draw in
	debugDraw.SetSprite(stage.canvas.getContext('2d'));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.5);

	// Set shapes and joints to be drawn
	debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
	// Tell the physics world about the debug draw
	 world.SetDebugDraw(debugDraw);
}
