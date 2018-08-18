attribute vec3 color;

uniform float time;

varying vec4 vMvPosition;
varying vec3 vColor;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vMvPosition = mvPosition;
  vColor = vec3(0.5, 0.5, 0.5);

  gl_PointSize = 512.0 / length(mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
