attribute vec3 position;
attribute vec4 color;
attribute float seed;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform float explosionNum;

varying vec4 vMvPosition;
varying vec4 vColor;

void main() {
  float positionX = position.x + cos(time / seed / 4.0) * (explosionNum + 0.0);
  float positionY = position.y + sin(time / seed / 3.0) * (explosionNum + 0.0);
  float positionZ = position.z - cos(time / seed / 5.0) * (explosionNum + 0.0);
  vec4 newPos = vec4(positionX, positionY, positionZ, 1.0);
  vec4 mvPosition = modelViewMatrix * newPos;
  vMvPosition = mvPosition;

  vColor = vec4(color.x, color.y, color.z, color.w);

  gl_PointSize = 2.0;//2048.0 / length(mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
