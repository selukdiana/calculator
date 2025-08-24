import { PI } from './constants';

// Constants
const TWO_PI = PI * 2;
const DEG_TO_RAD = PI / 180; // Conversion from degrees to radians

function randomNumber() {
  let seed = 12345;
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export const random = randomNumber();

export function log(base, num) {
  // Type conversion and domain checks: base>0, base!==1, num>0
  const b = Number(base);
  const x = Number(num);
  if (!Number.isFinite(b) || !Number.isFinite(x))
    throw new Error('Input error');
  if (b <= 0 || b === 1 || x <= 0) throw new Error('Input error');

  let start = 0;
  let end = 0;
  let middle = 0;
  const accuracy = 10; // number of decimal places
  while (b ** end < x) end++;
  start = end - 1;
  if (b ** start === x) return start;
  for (let i = 0; i < accuracy * 10; i++) {
    // find the middle value
    middle = (start + end) / 2;

    // if the base to this power is greater than our number, move the end boundary toward the middle
    if (b ** middle > x) {
      end = middle;
    }
    // if the base to this power is less than our number, move the start boundary toward the middle
    else if (b ** middle < x) {
      start = middle;
    }
    // if the base to this power equals our number
    else {
      return middle;
    }
  }
  return (start + end) / 2;
}

// Normalize angle to [-π, +π] for better series convergence
function normalizeAngle(x) {
  // take the remainder of division by 2π
  const k = (x / TWO_PI) | 0; // truncation to integer part (left/right shift)
  let r = x - k * TWO_PI;
  // bring to [-π, π]
  if (r > PI) r -= TWO_PI;
  if (r < -PI) r += TWO_PI;
  return r;
}

function normalizeResult(x) {
  return parseFloat(x.toFixed(5));
}

// Convert degrees to radians
function toRadians(degrees) {
  return degrees * DEG_TO_RAD;
}

// Exponential e^x using Taylor series
function exp(x) {
  let sum = 1,
    term = 1;
  for (let n = 1; n < 20; n++) {
    term *= x / n; // term = xⁿ / n!
    sum += term;
  }
  return sum;
}

// Sine using Taylor series
export function sin(x, inDegrees = false) {
  if (inDegrees) {
    x = toRadians(x);
  }

  x = normalizeAngle(x);
  let sum = x,
    term = x;
  for (let k = 1; k < 10; k++) {
    term *= (-1 * x * x) / (2 * k * (2 * k + 1));
    sum += term;
  }
  return normalizeResult(sum);
}

// Cosine using Taylor series
export function cos(x, inDegrees = false) {
  if (inDegrees) {
    x = toRadians(x);
  }
  x = normalizeAngle(x);
  let sum = 1,
    term = 1;
  for (let k = 1; k < 10; k++) {
    term *= (-1 * x * x) / ((2 * k - 1) * (2 * k));
    sum += term;
  }
  return normalizeResult(sum);
}

// Tangent through sine and cosine
export function tan(x, inDegrees = false) {
  const res = sin(x, inDegrees) / cos(x, inDegrees);
  return normalizeResult(res);
}

// Hyperbolic sine
export function sinh(x) {
  // (eˣ − e⁻ˣ)/2
  const ex = exp(x);
  const emx = exp(-x);
  return (ex - emx) / 2;
}

// Hyperbolic cosine
export function cosh(x) {
  // (eˣ + e⁻ˣ)/2
  const ex = exp(x);
  const emx = exp(-x);
  return (ex + emx) / 2;
}

// Hyperbolic tangent
export function tanh(x) {
  // sinh/cosh
  const e2x = exp(2 * x);
  // more stable form: (e2x - 1)/(e2x + 1)
  return (e2x - 1) / (e2x + 1);
}
