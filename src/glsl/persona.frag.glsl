precision mediump float;
uniform vec4 color;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform float rows;
uniform float total_textures;
uniform vec2 vignete;
varying vec2 vUv;
uniform sampler2D tex;
uniform sampler2D text_tex;

uniform float tethaYOffset;
uniform float animateXOffset;
uniform float marginOffset;
uniform float fisheye_value;

#define PI 3.1415926535897932384626433832795

vec2 fisheye(vec2 uv, float k, float rows) {
  float r = length(uv);
  if(fisheye_value < 0.0) return uv;
  if(r < 0.14) return uv * mix(1.0, 0.14, fisheye_value);
  float theta = atan((1.0 + tethaYOffset * fisheye_value) * uv.y, uv.x);
  float radius = mix(r, (1.0 / cos(r*PI/3.0)) - 1.0, fisheye_value);
  vec2 uvf = radius * vec2(cos(theta), sin(theta));
  return mix(uvf, uv * (1.0 - animateXOffset), max(0.0, min(1.0, r)));
}

float round(float x) {
  return floor(x + 0.5);
}

vec2 round(vec2 x) {
  return floor(x + 0.5);
}

vec3 round(vec3 x) {
  return floor(x + 0.5);
}

vec4 round(vec4 x) {
  return floor(x + 0.5);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
  vec2 fuv = -1.0 + vUv * 2.0;
  vec2 uv = vUv + vec2(time, 0);
  float aspect_ratio = resolution.x / resolution.y;
  uv.x *= aspect_ratio;
  float division = 1.0 / rows;

  float k = 2.0;
  uv = fisheye(uv - mouse, k, rows) + mouse; // Apply fisheye effect

  float margin_v = 1.0 + marginOffset;
  vec2 pattern_uv = mod(uv, division);
  float circle_fade = 1.0 - max(min(distance(pattern_uv * (0.5 / division) + (division - 0.25), vec2(division)) * 4.0 * margin_v, 1.0), 0.0);
  
  vec2 texture_coord = vec2((pattern_uv)* (1.0 / division) * margin_v - mod(margin_v + 1.0, 2.0) * 0.5);
  vec2 texture_index = floor(((uv) * (((total_textures * 2.0)) / division)) / (total_textures * 2.0));
  float texture_index_rand = floor(random(texture_index) * (total_textures * 20.0));
  texture_coord.x *= (1.0 / (total_textures));
  texture_coord.x += mod(texture_index_rand, total_textures) * (1.0 / total_textures);

  vec4 uv_color = texture2D(tex, texture_coord);
  vec4 uv_text = texture2D(text_tex, texture_coord);
  float circle_mask = min(circle_fade * 20.0, 1.0);

  float vignete_mask = smoothstep(vignete.x, vignete.y, vUv.y) * smoothstep(vignete.x, vignete.y, 1.0 - vUv.y);

  vec4 final_color = mix(uv_color, uv_text, (1.0 - step(division * 0.5, distance(uv, mouse))) * uv_text.a * 0.8 * (fisheye_value));
  gl_FragColor = final_color * circle_mask * vignete_mask;
}