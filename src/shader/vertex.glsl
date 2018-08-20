attribute vec3 position;
attribute vec3 color;
attribute float seed;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform float explosionNum;

varying vec4 vMvPosition;
varying vec3 vColor;

void main() {
  float positionX = position.x + cos(time / seed / 4.0) * (explosionNum + 1.0);
  float positionY = position.y + sin(time / seed / 3.0) * (explosionNum + 1.0);
  float positionZ = position.z - cos(time / seed / 5.0) * (explosionNum + 1.0);
  vec4 newPos = vec4(positionX, positionY, positionZ, 1.0);
  vec4 mvPosition = modelViewMatrix * newPos;
  vMvPosition = mvPosition;

  vColor = vec3(color.x, color.y, color.z);

  gl_PointSize = 2048.0 / length(mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
