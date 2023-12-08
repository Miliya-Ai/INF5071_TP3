uniform vec4 lightPosition;
varying vec3 interpolatedNormal;
varying vec3 interpolatedLight;
void main() {
vec4 coords = vec4(position,1.0);
vec4 eyeCoords = modelViewMatrix * coords;
gl_Position = projectionMatrix * eyeCoords;
interpolatedNormal = normalize( normalMatrix*normal );
if ( lightPosition.w == 0.0 ) {
interpolatedLight = normalize( lightPosition.xyz );
} else {
interpolatedLight = normalize( lightPosition.xyz/lightPosition.w - eyeCoords.xyz );
}
}