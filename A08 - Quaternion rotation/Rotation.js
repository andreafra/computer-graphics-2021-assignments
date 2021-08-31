// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT

// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the degree that how much the object rotates in the given direction.

// Global var (Starting quaternion)
PrevQ = Quaternion.ONE

function updateWorld(rvx, rvy, rvz) {

	// Compute new quaternion from user input 
	//(which is "relative" to their POV)
	// Default is (Z,X,Y)
	let deltaQ = Quaternion.fromEuler(utils.degToRad(rvz), utils.degToRad(rvx), utils.degToRad(rvy))

	// Multiply the delta quaternion to the old
	// one to obtain the new rotation
	let NewQ = deltaQ.mul(PrevQ)

	// Save it
	PrevQ = NewQ

	// and return it
	return NewQ.toMatrix4()
}

