varying vec3 interpolatedNormal;
varying vec3 interpolatedLight;
uniform vec4 diffuseColor;
void main() {
float intensity = dot(normalize(interpolatedNormal), interpolatedLight);
if (intensity > 0.95){
gl_FragColor.rgb = diffuseColor.rgb;
} else if (intensity > 0.5){
gl_FragColor.rgb = diffuseColor.rgb * 0.6;
}
else if (intensity > 0.25){
gl_FragColor.rgb = diffuseColor.rgb * 0.4;
}
else {
gl_FragColor.rgb = diffuseColor.rgb * 0.2;
}
gl_FragColor.a = diffuseColor.a;
}