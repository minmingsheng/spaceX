/**
 * @author mrdoob / http://mrdoob.com/
 * @author schteppe / https://github.com/schteppe
 */

 var PointerLockControls = function ( camera, cannonBody, objpos, color,profilePic , profileName, roomId) {
    if(camera == null){
        camera = new THREE.Object3D();
    }
    var eyeYPos = 2; // eyes are 2 meters above the ground
    var velocityFactor = 0.2;
    var jumpVelocity = 10;
    var scope = this;

    /*camera*/
    var pitchObject = new THREE.Object3D();
    // pitchObject.position.x =30;
    pitchObject.position.z=4;
    // pitchObject.position.y=4;
    pitchObject.add( camera ); // camera is parameter

    /*object*/
    var geometry = new THREE.SphereGeometry(1, 10, 10 );
    var material = new THREE.MeshLambertMaterial( { 
        color: color,
        transparent: true,
        opacity: 0.4
         } );
    var yawObject = new THREE.Mesh( geometry, material );
    cannonBody.position.set(objpos.x,objpos.y,objpos.z);
    yawObject.position.set(objpos.x,objpos.y,objpos.z);
    cannonBody.id = objpos.id;

    console.log("yawObject: ");
    yawObject.castShadow = true;
    yawObject.receiveShadow = true;
    yawObject.add(pitchObject);
    socket.emit("createPlayer", {
        color: color,
        profilePic: profilePic,
        profileName: profileName,
        objpos: objpos,
        roomId: roomId
    })
    this.body = cannonBody;
    this.mesh = yawObject;
    // var yawObject = new THREE.Object3D();
    // yawObject.position.x = 22;
    // yawObject.add( pitchObject );


    var quat = new THREE.Quaternion();
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var canJump = false;

    var contactNormal = new CANNON.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
    var upAxis = new CANNON.Vec3(0,1,0);
    cannonBody.addEventListener("collide",function(e){
        // console.log("cannonBody.velocity: ", cannonBody.velocity );
        // console.log("attacked");
        // var contact = e.contact;
        // console.log(e);
        // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
        // We do not yet know which one is which! Let's check.
        // if(contact.bi.id == cannonBody.id){ // bi is the player body, flip the contact normal
        //     contact.ni.negate(contactNormal);
        //     console.log("contact.bi.id");
        // }else{
        //     contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is
        //     console.log("contact.ni");
        // }
        // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
        // if(contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
        //     canJump = true;
    });

    var velocity = cannonBody.velocity;
    console.log(velocity);
    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {
        if ( scope.enabled === false ) return;
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;
        pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
        socket.emit("rotation", {
            roomId,
            profileId,
            rotation: yawObject.rotation.y
        })
    };

    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = true;
                socket.emit("moveForward", roomId);
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                socket.emit("moveLeft", roomId);
                break;


            case 40: // down
            case 83: // s
                moveBackward = true;
                socket.emit("moveBackward", roomId);
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                socket.emit("moveRight", roomId);
                break;

            case 32: // space
                // if ( canJump === true ){
                   /*const*/ velocity.y = jumpVelocity; /*cannonBody.velocity*/
                // }
                // canJump = false;
                break;
        }

    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                socket.emit("notmoveForward", roomId)
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                socket.emit("notmoveLeft", roomId)
                break;

            case 40: // down
            case 83: // a
                moveBackward = false;
                socket.emit("notmoveBackward", roomId);
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                socket.emit("notmoveRight", roomId);
                break;

        }

    };

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false ); //asdw
    document.addEventListener( 'keyup', onKeyUp, false );// up right left down

    this.enabled = false;

    this.getObject = function () {
        return yawObject;
    };

    this.getDirection = function(targetVec){
        targetVec.set(0,0,-1);
        quat.multiplyVector3(targetVec);
    }

    // Moves the camera to the Cannon.js object position and adds velocity to the object if the run key is down
    var inputVelocity = new THREE.Vector3();
    var euler = new THREE.Euler();
    this.update = function ( delta ) {

        if ( scope.enabled === false ) return;

        delta *= 0.1;

        inputVelocity.set(0,0,0);

        if ( moveForward ){
            inputVelocity.z = -velocityFactor * delta;
        }
        if ( moveBackward ){
            inputVelocity.z = velocityFactor * delta;
        }

        if ( moveLeft ){
            inputVelocity.x = -velocityFactor * delta;
        }
        if ( moveRight ){
            inputVelocity.x = velocityFactor * delta;
        }
        // Convert velocity to world coordinates
        euler.x = pitchObject.rotation.x; //camera
        euler.y = yawObject.rotation.y; //camera object
        // console.log(euler);
        euler.order = "XYZ";
        quat.setFromEuler(euler);
        inputVelocity.applyQuaternion(quat);
        //quat.multiplyVector3(inputVelocity);

        // Add to the object
        velocity.x += inputVelocity.x;
        velocity.z += inputVelocity.z;
        socket.on("collid", function(data){
            // console.log("collid!!!!:", data);
            cannonBody.velocity.x = data.x;
            cannonBody.velocity.y = data.y;
            cannonBody.velocity.z = data.z;
            // console.log("cannonBody.position !!!!:", cannonBody.position );
            // cannonBody.position = data.pos;
        })
        // console.log("velocity: ", velocity);
        yawObject.position.copy(cannonBody.position);
    };
};
