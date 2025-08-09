// myShader.js
export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse; // 0..1
  uniform float u_impulse; // mouse movement impulse 0..1
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
  }

  // Fractional Brownian Motion for organic shapes (avoids petal symmetry)
  float fbm(vec2 x){
    float v = 0.0;
    float a = 0.5;
    const mat2 m = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 4; i++){
      v += a * noise(x);
      x = m * x * 2.0 + 11.7;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Normalize coords around center and correct aspect
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= u_resolution.x / max(1.0, u_resolution.y);

    // Center follows mouse subtly
    vec2 mouseNdc = (u_mouse - 0.5) * 2.0; // -1..1
    mouseNdc.x *= u_resolution.x / max(1.0, u_resolution.y);
    vec2 center = mouseNdc * 0.15;

    vec2 p = uv - center;
    float a = atan(p.y, p.x);
    float rad = length(p);

    // Animated shape morph with domain-warped fbm (less flower-like)
    float t = u_time;
    float r0 = 0.46 + 0.05 * sin(t * 0.9);
    vec2 warp = vec2(noise(p * 2.0 + vec2( t * 0.25,  0.0)),
                     noise(p * 2.0 + vec2(-t * 0.25, 0.0))) - 0.5;
    vec2 pw = p + 0.7 * warp;
    float n = fbm(pw * 2.2 + vec2(t * 0.12, -t * 0.10));
    float mouseInfl = 0.16 * (1.0 - clamp(length(mouseNdc - uv) * 0.8, 0.0, 1.0));

    // Jelly-like ripple around cursor, amplitude tied to u_impulse
    vec2 mcenter = mouseNdc;
    float mdist = length(uv - mcenter);
    float ripple = 0.28 * u_impulse * sin(13.0 * mdist - t * 5.6) * exp(-1.8 * mdist);

    float r = r0 + (n - 0.5) * 0.25 + mouseInfl + ripple;

    // Signed distance of blob (inside if sd < 0)
    float sd = rad - r;

    // Anti-aliased edge mask
    float edge = fwidth(sd) * 2.0 + 0.003;
    float mask = 1.0 - smoothstep(0.0, edge, sd);

    // Orange gradient inside the blob: center bright orange -> edge dark orange
    vec3 colCenter = vec3(1.0, 0.4157, 0.0);   // ~ #FF6A00
    vec3 colEdge   = vec3(0.702, 0.278, 0.0);  // ~ #B34700
    // Flattened fill (solid orange) — no radial gradient or highlight
    vec3 col = vec3(1.0, 0.4157, 0.0);

    gl_FragColor = vec4(col, mask * 0.95);
  }
`;
