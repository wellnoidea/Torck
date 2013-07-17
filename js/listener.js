

	var listener = new Box2D.Dynamics.b2ContactListener;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	listener.PreSolve = function(contact, oldManifold) {
		////////// A One Sided Platform, a True Classic //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var fixtureA = contact.GetFixtureA();
		var fixtureB = contact.GetFixtureB();
		// check if the bodies colliding are torck and a one sided platform
		if ((fixtureA.GetBody().GetUserData() === 'torck' && fixtureB.GetBody().GetUserData() === 'oneSidedUpDown') 
			|| (fixtureA.GetBody().GetUserData() === 'oneSidedUpDown' && fixtureB.GetBody().GetUserData() === 'torck')){

			// determining if the fixtureA represents the platform ('oneSidedUpDown') or the player ('torck')
			switch (fixtureA.GetBody().GetUserData()) {
				case 'oneSidedUpDown' :
					// determining y positions
					var torckPosY = fixtureB.GetBody().GetPosition().y * SCALE;
					var oneSidedUpDownPosY = fixtureA.GetBody().GetPosition().y * SCALE;
					break;
				case 'torck' :
					// determining y positions
					var torckPosY = fixtureA.GetBody().GetPosition().y * SCALE;
					var oneSidedUpDownPosY =fixtureB.GetBody().GetPosition().y * SCALE;
					break;
			}
			// checking distance between bodies
			var distance = torckPosY - oneSidedUpDownPosY;
			// if the distance is greater than player radius + the platform height...
			// the +1 is a buffer to avoid glitches
			// if the player presses the down arrow ~ torck[currentTorck].moveY = 1 the skull can fall through the one sided platform 
			// possible to do: a short temporary jump lock when the skull reaches the platform might avoid overly 'jumpy' behaviour
			if (distance > - (torck[currentTorck].size / 2 + 20) + 1
				|| torck[currentTorck].moveY === 1) {
				// don't manage the contact
				contact.SetEnabled(false);
			}
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	listener.BeginContact = function(contact) {
		if ((contact.GetFixtureA().GetBody().m_userData === 'torck' && contact.GetFixtureB().GetBody().m_userData === 'ground') ||
			(contact.GetFixtureA().GetBody().m_userData === 'ground' && contact.GetFixtureB().GetBody().m_userData === 'torck')) {
			// torck[currentTorck].contacts++;
			if (sound_is_active) {
				collision.currentTime = 0.07;
				collision.play(); // Reenable to get the collision sound
			}
		}
		if (contact.GetFixtureA().GetBody().m_userData === 'infraSensor' || contact.GetFixtureB().GetBody().m_userData === 'infraSensor') {
				
			switch(contact.GetFixtureA().GetBody().GetUserData()) {
				case 'infraSensor':
					var i = contact.GetFixtureA().GetBody().helloMyNumberIs;
					console.log('helloMyNumberIs ' + contact.GetFixtureA().GetBody().helloMyNumberIs);
					break;
				case 'ground':
				case 'oneSidedUpDown':
					var i = contact.GetFixtureB().GetBody().helloMyNumberIs;
					console.log('helloMyNumberIs ' + contact.GetFixtureB().GetBody().helloMyNumberIs);
					break;
				default:
					console.log('Something went wrong in listener.js listener.BeginContact');
					console.log(contact.GetFixtureA().GetBody());
					console.log(contact.GetFixtureB().GetBody());
					break;
			}	

			console.log('i: ' + i)
			torck[i].contacts++;
			console.log(torck[i].contacts)



		}
	}

// the switch is WET WET WET

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	listener.EndContact = function(contact) {

/*      if ((contact.GetFixtureA().GetBody().m_userData === 'torck' && contact.GetFixtureB().GetBody().m_userData === 'ground') ||
			(contact.GetFixtureA().GetBody().m_userData === 'ground' && contact.GetFixtureB().GetBody().m_userData === 'torck')) {
			// torck[currentTorck].contacts--;
		}*/
		if (contact.GetFixtureA().GetBody().m_userData === 'infraSensor' || contact.GetFixtureB().GetBody().m_userData === 'infraSensor') {
			switch(contact.GetFixtureA().GetBody().GetUserData()) {
				case 'infraSensor':
					var i = contact.GetFixtureA().GetBody().helloMyNumberIs;
					console.log('helloMyNumberIs ' + contact.GetFixtureA().GetBody().helloMyNumberIs);
					break;
				case 'ground':
				case 'oneSidedUpDown':
					var i = contact.GetFixtureB().GetBody().helloMyNumberIs;
					console.log('helloMyNumberIs ' + contact.GetFixtureB().GetBody().helloMyNumberIs);
					break;
				default:
					console.log('Something went wrong in listener.js listener.BeginContact');
					break;
			}	
			torck[i].contacts--;
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	listener.PostSolve = function(contact, impulse) {

	}


