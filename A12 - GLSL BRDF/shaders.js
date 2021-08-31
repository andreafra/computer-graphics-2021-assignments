function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;		// Position of the point in 3D space
//
//float SpecShine;		// specular coef. for both Blinn and Phong // gamma
//float DToonTh;		// Threshold for diffuse in a toon shader
//float SToonTh;		// Threshold for specular in a toon shader
//
//vec4 diffColor;		// diffuse color
//vec4 ambColor;		// material ambient color
//vec4 specularColor;		// specular color
//vec4 emit;			// emitted color
//	
//vec3 normalVec;		// direction of the normal vecotr to the surface
//vec3 eyedirVec;		// looking direction // omega_r
//
//
// Lighr directions can be found into:
//vec3 lightDirA;
//vec3 lightDirB;
//vec3 lightDirC;
//
//and intensity is returned into:
//
//vec4 lightColorA;
//vec4 lightColorB;
//vec4 lightColorC;
//
// Ambient light contribution can be found intop
//
// vec4 ambientLight;

// Lambert diffuse and Ambient material. No specular or emisssion.
var S1 = `
vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
out_color = clamp(diffColor * (LAcontr + LBcontr + LCcontr) + ambientLight * ambColor, 0.0, 1.0);
`;

// Lambert diffuse and Blinn specular. No ambient and emission.
var S2 = `
vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;

float LAspecCoeff = pow(clamp(dot(normalVec, normalize(lightDirA + eyedirVec)), 0.0, 1.0), SpecShine);
float LBspecCoeff = pow(clamp(dot(normalVec, normalize(lightDirB + eyedirVec)), 0.0, 1.0), SpecShine);
float LCspecCoeff = pow(clamp(dot(normalVec, normalize(lightDirC + eyedirVec)), 0.0, 1.0), SpecShine);

out_color = clamp(diffColor * (LAcontr + LBcontr + LCcontr)
	+ specularColor * (
		LAspecCoeff * lightColorA + 
		LBspecCoeff * lightColorB + 
		LCspecCoeff * lightColorC
), 0.0, 1.0);
`;

// Ambient and Phong specular. No emission and no diffuse.
var S3 = `
vec3 LArefl = 2.0 * dot(lightDirA, normalVec) * normalVec - lightDirA;
vec3 LBrefl = 2.0 * dot(lightDirB, normalVec) * normalVec - lightDirB;
vec3 LCrefl = 2.0 * dot(lightDirC, normalVec) * normalVec - lightDirC;

float LAspecCoeff = pow(clamp(dot(eyedirVec, LArefl), 0.0, 1.0), SpecShine);
float LBspecCoeff = pow(clamp(dot(eyedirVec, LBrefl), 0.0, 1.0), SpecShine);
float LCspecCoeff = pow(clamp(dot(eyedirVec, LCrefl), 0.0, 1.0), SpecShine);

out_color = specularColor * (
	LAspecCoeff * lightColorA +
	LBspecCoeff * lightColorB +
	LCspecCoeff * lightColorC
) + ambientLight * ambColor;
`;

// Diffuse, ambient, emission and Phong specular.
var S4 = `
// Diff
vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
// Phong
vec3 LArefl = 2.0 * dot(lightDirA, normalVec) * normalVec - lightDirA;
vec3 LBrefl = 2.0 * dot(lightDirB, normalVec) * normalVec - lightDirB;
vec3 LCrefl = 2.0 * dot(lightDirC, normalVec) * normalVec - lightDirC;
float LAspecCoeff = pow(clamp(dot(eyedirVec, LArefl), 0.0, 1.0), SpecShine);
float LBspecCoeff = pow(clamp(dot(eyedirVec, LBrefl), 0.0, 1.0), SpecShine);
float LCspecCoeff = pow(clamp(dot(eyedirVec, LCrefl), 0.0, 1.0), SpecShine);

out_color = clamp(diffColor * (LAcontr + LBcontr + LCcontr)
	+ specularColor * (
		LAspecCoeff * lightColorA +
		LBspecCoeff * lightColorB +
		LCspecCoeff * lightColorC
	)
	+ ambientLight * ambColor
	+ emit, 0.0, 1.0);
`;

// Ambient, Toon diffuse and and Toon (Blinn based) specular. No emssion.
// WEIRD/WRONG BEHAVIOUR in reflection (disappears too "soon" when rotating)
var S5 = `
vec4 colorBlack = vec4(0.0, 0.0, 0.0, 0.0);
vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;

vec4 colorAtoonDiff = dot(lightDirA, normalVec) > DToonTh ? diffColor : colorBlack;
vec4 colorBtoonDiff = dot(lightDirB, normalVec) > DToonTh ? diffColor : colorBlack;
vec4 colorCtoonDiff = dot(lightDirC, normalVec) > DToonTh ? diffColor : colorBlack;

float LAspecCoeff = clamp(dot(normalVec, normalize(lightDirA + eyedirVec)), 0.0, 1.0);
float LBspecCoeff = clamp(dot(normalVec, normalize(lightDirB + eyedirVec)), 0.0, 1.0);
float LCspecCoeff = clamp(dot(normalVec, normalize(lightDirC + eyedirVec)), 0.0, 1.0);

vec4 colorAtoonSpec = LAspecCoeff > SToonTh ? specularColor * lightColorA : colorBlack;
vec4 colorBtoonSpec = LBspecCoeff > SToonTh ? specularColor * lightColorB : colorBlack;
vec4 colorCtoonSpec = LCspecCoeff > SToonTh ? specularColor * lightColorC : colorBlack;

out_color = clamp(colorAtoonDiff * LAcontr + colorBtoonDiff * LBcontr + colorCtoonDiff * LCcontr
	+ colorAtoonSpec * LAspecCoeff
	+ colorBtoonSpec * LBspecCoeff
	+ colorCtoonSpec * LCspecCoeff
	, 0.0, 1.0);
`;

	return [S1, S2, S3, S4, S5];
}
