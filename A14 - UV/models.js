
function buildGeometry() {
	// Draws a pyramid --- To complete for the assignment. This is just the one in Assignment 13, where two 0.1, 0.1 UV components have been added to the vertices definitions. Such number must be replaced (differently for each vertexes), to obtain a proper Egyptian Pyramid
	var vert1 = [
[0.0 , 1.0 , 0.0 , 0.0    , 0.4472, -0.8944, 0.625 , 0.5], // Back face
[ 1.0, -1.0, -1.0, 0.0    , 0.4472, -0.8944, 0.75, 0.25],
[-1.0, -1.0, -1.0, 0.0    , 0.4472, -0.8944, 0.5 , 0.25],
[0.0 , 1.0 , 0.0 , 0.8944 , 0.4472, 0.0    , 0.625 , 0.5], // "Right" face
[ 1.0, -1.0, 1.0 , 0.8944 , 0.4472, 0.0    , 0.75 , 0.25],
[ 1.0, -1.0, -1.0, 0.8944 , 0.4472, 0.0    , 0.5 , 0.25],
[0.0 , 1.0 , 0.0 , 0.0    , 0.4472, 0.8944 , 0.625 , 0.25], // Front face
[-1.0, -1.0, 1.0 , 0.0    , 0.4472, 0.8944 , 0.5 , 0.0],
[ 1.0, -1.0, 1.0 , 0.0    , 0.4472, 0.8944 , 0.75 , 0.0],
[0.0 , 1.0 , 0.0 , -0.8944, 0.4472, 0.0    , 0.875, 0.5], // "Left" face
[-1.0, -1.0, -1.0, -0.8944, 0.4472, 0.0    , 0.75 , 0.25],
[-1.0, -1.0, 1.0 , -0.8944, 0.4472, 0.0    , 1.0 , 0.25],
[-1.0, -1.0, -1.0, 0.0    , -1.0  , 0.0    , 0.75 , 0.0], // Bottom
[1.0 , -1.0, -1.0, 0.0    , -1.0  , 0.0    , 1.0 , 0.0],
[1.0 , -1.0, 1.0 , 0.0    , -1.0  , 0.0    , 1.0 , 0.25],
[-1.0, -1.0, 1.0 , 0.0    , -1.0  , 0.0    , 0.75 , 0.25],
			];
var ind1 = [
	0, 1, 2, 
	3, 4, 5,
	6, 7, 8, 
	9, 10, 11,
	12, 13, 14,
	12, 14, 15];
var color1 = [0.0, 0.0, 1.0];

addMesh(vert1, ind1, color1);

// Draws a cube -- To do for the assignment.
var vert2 = [
	// Bottom
	[-1.0, -1.0, -1.0, 0.0,-1.0, 0.0,    0.125,   0.625], // 0
	[-1.0, -1.0, 1.0 , 0.0,-1.0, 0.0,    0.125,   0.5], // 1
	[ 1.0, -1.0, 1.0 , 0.0,-1.0, 0.0,    0.25,   0.5], // 2
	[ 1.0, -1.0, -1.0, 0.0,-1.0, 0.0,    0.25,   0.625], // 3
	// Top
	[-1.0,  1.0, -1.0, 0.0, 1.0, 0.0,    0.125,   0.75], // 4
	[-1.0,  1.0, 1.0 , 0.0, 1.0, 0.0,    0.125,   0.875], // 5
	[ 1.0,  1.0, 1.0 , 0.0, 1.0, 0.0,    0.25,   0.875], // 6
	[ 1.0,  1.0, -1.0, 0.0, 1.0, 0.0,    0.25,   0.75], // 7
	// East
	[ 1.0, 1.0, -1.0, 1.0, 0.0, 0.0,    0.25,   0.75], // 8
	[ 1.0, 1.0,  1.0, 1.0, 0.0, 0.0,    0.375,   0.75], // 9
	[ 1.0,-1.0,  1.0, 1.0, 0.0, 0.0,    0.375,   0.625], // 10
	[ 1.0,-1.0, -1.0, 1.0, 0.0, 0.0,    0.25,   0.625], // 11
	// West
	[-1.0, 1.0, -1.0,-1.0, 0.0, 0.0,    0.125,   0.75], // 12
	[-1.0, 1.0,  1.0,-1.0, 0.0, 0.0,    0.0,   0.75], // 13
	[-1.0,-1.0,  1.0,-1.0, 0.0, 0.0,    0.0,   0.625], // 14
	[-1.0,-1.0, -1.0,-1.0, 0.0, 0.0,    0.125,   0.625], // 15
	// North
	[-1.0, 1.0, 1.0, 0.0, 0.0, 1.0,    0.125,   0.875], // 16
	[-1.0,-1.0, 1.0, 0.0, 0.0, 1.0,    0.125,   1.0], // 17
	[ 1.0, 1.0, 1.0, 0.0, 0.0, 1.0,    0.25,   0.875], // 18
	[ 1.0,-1.0, 1.0, 0.0, 0.0, 1.0,    0.25,   1.0], // 19
	// South
	[-1.0, 1.0,-1.0, 0.0, 0.0, -1.0,    0.125,   0.75], // 20
	[-1.0,-1.0,-1.0, 0.0, 0.0, -1.0,    0.125,   0.625], // 21
	[ 1.0, 1.0,-1.0, 0.0, 0.0, -1.0,    0.25,   0.75], // 22
	[ 1.0,-1.0,-1.0, 0.0, 0.0, -1.0,    0.25,   0.625], // 23
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
	
	
	// Draws a Cylinder --- To do for the assignment
	var vert3 = []
	var ind3 = []
	var color3 = [1.0, 1.0, 0.0]
	
	const radius_C = 2;
	const height_C = 5;
	const SLICES = 64
	const SLICE = Math.PI / SLICES

	// Texture
	const CY_bot = 0.5
	const CY_top = 0.75
	const CX_delta = 0.5 / SLICES / 2

	const UVRad = 0.125

	vert3.push([0, 0, 0, 0, -1, 0, 0.875, 0.875]) // 0 = center bottom
	vert3.push([0, height_C, 0, 0, 1, 0, 0.625, 0.875]) // 1 = center top

	let j = 0
	// Draw side triangles
	for (let alpha = 0; alpha <= Math.PI*2; alpha += SLICE) {
		let _x = Math.cos(alpha);
		let _z = Math.sin(alpha);

		let beta = alpha + Math.PI*3/2

		let uvTop = [Math.cos(beta) * UVRad + 0.625, Math.sin(beta) * UVRad + 0.875]
		let uvBot = [Math.cos(beta) * UVRad + 0.875, Math.sin(beta) * UVRad + 0.875]
		let uvSideTop = [1 - j * CX_delta, CY_top]
		let uvSideBot = [1 - j * CX_delta, CY_bot]

		vert3.push(
			[_x * radius_C, 0, _z * radius_C, 0, -1, 0,         ...uvBot], // 0
			[_x * radius_C, height_C, _z * radius_C, 0, 1, 0,   ...uvTop], // 1
			[_x * radius_C, 0, _z * radius_C, _x, 0, _z,        ...uvSideBot], // 2 : low, curr
			[_x * radius_C, height_C, _z * radius_C, _x, 0, _z, ...uvSideTop], // 3 : high, curr
		)

		j++
	}

	for (let i = 2; i < vert3.length - 4; i += 4) {
		ind3.push(
			0, i, i + 4,
			1, i + 5, i + 1,
			i + 2, i + 3, i + 6,
			i + 3, i + 7, i + 6,
		)
	}

	addMesh(vert3, ind3, color3);
}