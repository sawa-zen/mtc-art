uniform sampler2D texture;

varying vec4 vMvPosition;
varying vec3 vColor;

void main() {
  float opacity = 0.3;
  gl_FragColor = vec4(vColor, opacity);
}
