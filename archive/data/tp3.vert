attribute vec3 a_coords;
attribute vec3 a_normal;
uniform mat4 modelview;
uniform mat4 projection;
uniform vec4 lightPosition;
varying vec3 interpolatedNormal;
varying vec3 interpolatedLight;
void main() {
vec4 coords = vec4(a_coords,1.0);
vec4 eyeCoords = modelview * coords;
gl_Position = projection * eyeCoords;
interpolatedNormal = normalize( normalMatrix*a_normal );
if ( lightPosition.w == 0.0 ) {
interpolatedLight = normalize( lightPosition.xyz );
} else {
interpolatedLight = normalize( lightPosition.xyz/lightPosition.w - eyeCoords.xyz );
}
}