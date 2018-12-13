attribute vec3 position;
attribute vec4 color;
attribute float seed;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform float explosionNum;

varying vec4 vColor;

void main() {
  float positionX = position.x + cos(time / seed / 4.0) * (explosionNum + 0.0);
  float positionY = position.y + sin(time / seed / 3.0) * (explosionNum + 0.0);
  float positionZ = position.z - cos(time / seed / 5.0) * (explosionNum + 0.0);
  float alpha = (1.0 - (explosionNum / 486.0)) * color.w;
  vec4 newPos = vec4(positionX, positionY, positionZ, 1.0);
  vec4 mvPosition = modelViewMatrix * newPos;

  vColor = vec4(color.x, color.y, color.z, alpha);

  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * mvPosition;
}
