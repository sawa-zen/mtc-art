precision mediump float;

uniform sampler2D texture;

varying vec4 vMvPosition;
varying vec3 vColor;

void main() {
  float opacity = 600.0 / length(vMvPosition.xyz) / 2.0;
  gl_FragColor = vec4(vColor, opacity);
}
