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
uniform float source_texture_rows;
uniform float source_texture_cols;
uniform float seed;

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

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
  vec2 fuv = -1.0 + vUv * 2.0;
  vec2 uv = vUv;
  float aspect_ratio = resolution.x / resolution.y;
  uv.x *= aspect_ratio;
  float division = 1.0 / rows;

  float k = 2.0;
  uv = fisheye(uv - mouse, k, rows) + mouse; // Apply fisheye effect

  float margin_v = 1.0 + marginOffset;
  vec2 pattern_uv = mod(uv, division);
  float circle_fade = 1.0 - max(min(distance(pattern_uv * (0.5 / division) + (division - 0.25), vec2(division)) * 4.0 * margin_v, 1.0), 0.0);
  
  vec2 texture_coord = vec2(pattern_uv / division) * margin_v - mod(margin_v + 1.0, 2.0) * 0.5;
  vec2 texture_index = floor(uv / division);
  
  float texture_index_rand = random(texture_index + vec2(seed)) * total_textures;
  vec2 final_texture_index = vec2(floor(mod(texture_index_rand, source_texture_rows)), floor(texture_index_rand / source_texture_rows));

  texture_coord.x *= (1.0 / (source_texture_rows));
  texture_coord.x += final_texture_index.x * (1.0 / source_texture_rows);

  texture_coord.y *= (1.0 / (source_texture_cols));
  texture_coord.y += final_texture_index.y * (1.0 / source_texture_cols);

  vec4 uv_color = texture2D(tex, texture_coord);
  vec4 uv_text = texture2D(text_tex, texture_coord);
  float circle_mask = min(circle_fade * 20.0, 1.0);

  float vignete_mask = smoothstep(vignete.x, vignete.y, vUv.y) * smoothstep(vignete.x, vignete.y, 1.0 - vUv.y);

  vec4 final_color = mix(uv_color, uv_text, (1.0 - step(division * 0.5, distance(uv, mouse))) * uv_text.a * 0.8 * (fisheye_value));
  gl_FragColor = final_color * circle_mask * vignete_mask;
}