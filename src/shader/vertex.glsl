attribute vec3 color;
attribute float seed;

uniform float time;

varying vec4 vMvPosition;
varying vec3 vColor;

void main() {
  float positionX = position.x + cos(time / seed * 1.0) * seed / 20.0;
  float positionY = position.y + sin(time / seed * 2.0) * seed / 20.0;
  float positionZ = position.z + cos(time / seed * 2.0) * seed / 20.0;
  vec4 newPos = vec4(positionX, positionY, positionZ, 1.0);
  vec4 mvPosition = modelViewMatrix * newPos;
  vMvPosition = mvPosition;
  vColor = vec3(0.5, 0.5, 0.5);

  gl_PointSize = 512.0 / length(mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
