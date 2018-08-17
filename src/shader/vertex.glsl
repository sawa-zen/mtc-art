attribute vec3 color;

uniform float time;
uniform float size;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * 100.0 / length(mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
