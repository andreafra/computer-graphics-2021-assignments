function buildGeometry() {
	// Draws a pyramid --- Already done, just for inspiration
	var vert1 = [
		[0.0,1.0,0.0, 0.0, 0.4472,-0.8944],
		[ 1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944],
		[-1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944],
		[0.0,1.0,0.0, 0.8944, 0.4472,0.0],
		[ 1.0,-1.0, 1.0, 0.8944, 0.4472,0.0],
		[ 1.0,-1.0,-1.0, 0.8944, 0.4472,0.0], 
		[0.0,1.0,0.0, 0.0, 0.4472,0.8944],
		[-1.0,-1.0, 1.0, 0.0, 0.4472,0.8944],
		[ 1.0,-1.0, 1.0, 0.0, 0.4472,0.8944], 
		[0.0,1.0,0.0, -0.8944, 0.4472,0.0],
		[-1.0,-1.0,-1.0, -0.8944, 0.4472,0.0],
		[-1.0,-1.0, 1.0, -0.8944, 0.4472,0.0], 
		[-1.0,-1.0,-1.0, 0.0,-1.0,0.0],
		[1.0,-1.0,-1.0, 0.0,-1.0,0.0],
		[1.0,-1.0,1.0, 0.0,-1.0,0.0],
		[-1.0,-1.0,1.0, 0.0,-1.0,0.0],
	];
	var ind1 = [0, 1, 2,  3, 4, 5,  6, 7, 8,  9, 10, 11,  12, 13, 14,  12, 14, 15];
	var color1 = [0.0, 0.0, 1.0];
	addMesh(vert1, ind1, color1);
	
	// Draws a cube -- To do for the assignment.
	var vert2 = [
// Bottom
[-1.0, -1.0, -1.0, 0.0,-1.0, 0.0], // 0
[-1.0, -1.0, 1.0 , 0.0,-1.0, 0.0], // 1
[ 1.0, -1.0, 1.0 , 0.0,-1.0, 0.0], // 2
[ 1.0, -1.0, -1.0, 0.0,-1.0, 0.0], // 3
// Top
[-1.0,  1.0, -1.0, 0.0, 1.0, 0.0], // 4
[-1.0,  1.0, 1.0 , 0.0, 1.0, 0.0], // 5
[ 1.0,  1.0, 1.0 , 0.0, 1.0, 0.0], // 6
[ 1.0,  1.0, -1.0, 0.0, 1.0, 0.0], // 7
// East
[ 1.0, 1.0, -1.0, 1.0, 0.0, 0.0], // 8
[ 1.0, 1.0,  1.0, 1.0, 0.0, 0.0], // 9
[ 1.0,-1.0,  1.0, 1.0, 0.0, 0.0], // 10
[ 1.0,-1.0, -1.0, 1.0, 0.0, 0.0], // 11
// West
[-1.0, 1.0, -1.0,-1.0, 0.0, 0.0], // 12
[-1.0, 1.0,  1.0,-1.0, 0.0, 0.0], // 13
[-1.0,-1.0,  1.0,-1.0, 0.0, 0.0], // 14
[-1.0,-1.0, -1.0,-1.0, 0.0, 0.0], // 15
// North
[-1.0, 1.0, 1.0, 0.0, 0.0, 1.0], // 16
[-1.0,-1.0, 1.0, 0.0, 0.0, 1.0], // 17
[ 1.0, 1.0, 1.0, 0.0, 0.0, 1.0], // 18
[ 1.0,-1.0, 1.0, 0.0, 0.0, 1.0], // 19
// South
[-1.0, 1.0,-1.0, 0.0, 0.0, -1.0], // 20
[-1.0,-1.0,-1.0, 0.0, 0.0, -1.0], // 21
[ 1.0, 1.0,-1.0, 0.0, 0.0, -1.0], // 22
[ 1.0,-1.0,-1.0, 0.0, 0.0, -1.0], // 23
	];
	var ind2 = [
		0, 2, 1, // Bottom
		0, 3, 2,
		4, 5, 6, // Top
		4, 6, 7,
		8, 9, 10, // East
		8, 10, 11,
		12, 14, 13, // West
		12, 15, 14,
		16, 17, 18, // North
		17, 19, 18,
		20, 23, 21, // South
		20, 22, 23
	];
	var color2 = [0.0, 1.0, 1.0];
	addMesh(vert2, ind2, color2);
	
	// END OF CUBE //


	/* Get normalized normal vector of surface (s,t) */
	let calcNormVec = (t,s) => {
		// calc the two partial derivatives of
		// [x, sin(x)*cos(z), z]
		let derivS = [0, -Math.sin(t) * Math.sin(s), 1]
		let derivT = [1, Math.cos(t) * Math.cos(s), 0]
		
		// Since derivS and derivT have all components a between 0<=a<=1,
		// don't need to normalize them.

		// cross product (flip it because the normals were poiting below the surface)
		let cross = [
			- (derivT[1] * derivS[2] - derivT[2] * derivS[1]),
			- (derivT[2] * derivS[0] - derivT[0] * derivS[2]),
			- (derivT[0] * derivS[1] - derivT[1] * derivS[0])
		]

		// normalize vector array
		let mag = Math.sqrt(
			Math.pow(cross[0], 2) +
			Math.pow(cross[1], 2) +
			Math.pow(cross[2], 2)
		)
		let normVec = [
			cross[0] / mag,
			cross[1] / mag,
			cross[2] / mag
		]

		return cross
	}

	// Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3 -- To do for the assignment.
	var vert3 = []
	var ind3 = []
	var color3 = [0.0, 1.0, 1.0]

	const SIZE = 6 // =dist(-3, 3);
	const RES = 16
	const deltaDist = SIZE/RES
	
	const yHeight = (x, z) => Math.sin(x) * Math.cos(z);

	for (let _z = -3; _z < 3; _z += deltaDist) {
		for (let _x = -3; _x < 3; _x += deltaDist) {
			let baseIdx = vert3.length
			let v1 = [_x, yHeight(_x, _z), _z, ...calcNormVec(_x, _z)]
			let v2 = [_x + deltaDist, yHeight(_x + deltaDist, _z), _z, ...calcNormVec(_x + deltaDist, _z)]
			let v3 = [_x, yHeight(_x, _z + deltaDist), _z + deltaDist, ...calcNormVec(_x, _z + deltaDist)]
			let v4 = [_x + deltaDist, yHeight(_x +deltaDist, _z + deltaDist), _z + deltaDist, ...calcNormVec(_x +deltaDist, _z + deltaDist)]
			vert3.push(v1, v2, v3, v4)

			ind3.push(
				baseIdx, baseIdx + 2, baseIdx + 1,
				baseIdx + 1, baseIdx + 2, baseIdx + 3
			)
		}
	}

	addMesh(vert3, ind3, color3);
	
	// Draws a Cylinder --- To do for the assignment
	var vert4 = []
	var ind4 = []
	var color4 = [1.0, 1.0, 0.0]
	
	const radius_C = 2;
	const height_C = 5;
	const SLICES = 24
	const SLICE = Math.PI * 2 / SLICES

	// Generate center vertices
	vert4.push([0, 0, 0, 0, -1, 0]) // 0 = center bottom
	vert4.push([0, height_C, 0, 0, 1, 0]) // 1 = center top

	let alpha = 0;
	// Generate side triangles
	for (let a = 0; a <= SLICES; a++) {
		let _x = Math.cos(alpha);
		let _z = Math.sin(alpha);

		vert4.push(
			[_x * radius_C, 0, _z * radius_C, 0, -1, 0], // 0 : low, pointing down
			[_x * radius_C, height_C, _z * radius_C, 0, 1, 0], // 1 : high, pointing up
			[_x * radius_C, 0, _z * radius_C, _x, 0, _z], // 2 : low, curr
			[_x * radius_C, height_C, _z * radius_C, _x, 0, _z], // 3 : high, curr
		)

		alpha += SLICE;
	}
 
	// Make indices
	for (let i = 2; i < vert4.length - 4; i += 4) {
		ind4.push(
			0, i, i + 4,
			1, i + 5, i + 1,
			i + 2, i + 3, i + 6,
			i + 3, i + 7, i + 6,
		)
	}

	addMesh(vert4, ind4, color4);

	// Draws a Sphere --- To do for the assignment.

	var vert5 = [];
	var ind5 = [];
	var color5 = [1.0, 0.0, 0.0];

	const radius_S = 2;

	alpha = -Math.PI / 2;

	// Make vertices
	for (let a = 0; a < SLICES/2; a++) { 
		if (!(alpha === -Math.PI/2 || alpha === Math.PI/2)) {			
			let beta = 0
			for(let b = 0; b < SLICES; b++) { 
				let _y = Math.sin(alpha);
				let _x = Math.cos(beta) * Math.cos(alpha);
				let _z = Math.sin(beta) * Math.cos(alpha);

				console.log([_x, _y, _z]);
				vert5.push([_x * radius_S, _y * radius_S, _z * radius_S, _x, _y, _z])

				beta += SLICE;
			}
		}
		alpha += SLICE;

	}

	vert5.push([0, -radius_S, 0, 0, -1, 0]) // 0 : center bottom
	vert5.push([0, radius_S, 0, 0, 1, 0]) // 1 : center top

	// Make indices for the sphere except top and bottom triangles
	for (let i = 0; i < vert5.length - (2 + SLICES); i++) {
		if (i !== 0 && i % SLICES === SLICES - 1) {
			ind5.push(
				i, i + 1, i + 1 - SLICES,
				i, i + SLICES, i + 1
			)
		} else {
			ind5.push(
				i, i + SLICES + 1, i + 1,
				i, i + SLICES, i + SLICES + 1,
			)
		}
	}

	// Make indices for top and bottom parts
	let botCenterIdx = vert5.length - 2;
	let topCenterIdx = vert5.length - 1;
	let topStart = vert5.length - 2 - SLICES;
	for (i = 0; i < SLICES; i++) {
		if (i !== SLICES - 1) {
			ind5.push(botCenterIdx, i, i + 1);
			ind5.push(topCenterIdx, topStart + i + 1, topStart + i);
		} else {
			ind5.push(botCenterIdx, i, 0);
			ind5.push(topCenterIdx, topStart, topStart + i);
		}
	}

	addMesh(vert5, ind5, color5);
}

