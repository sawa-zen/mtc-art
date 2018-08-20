attribute vec3 position;
attribute vec3 color;
attribute float seed;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;

varying vec4 vMvPosition;
varying vec3 vColor;

void main() {
  float positionX = position.x;// + cos(time / seed * 1.0);
  float positionY = position.y;// + sin(time / seed * 2.0);
  /* float positionZ = position.z - (tan(time / seed) * 100.0); */
  float positionZ = position.z - (sin(time / seed) * 10.0);
  vec4 newPos = vec4(positionX, positionY, positionZ, 1.0);
  vec4 mvPosition = modelViewMatrix * newPos;
  vMvPosition = mvPosition;

  vColor = vec3(color.x, color.y, color.z);

  gl_PointSize = 2048.0 / length(mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
