// Константы
export const PI = 3.141592653589793;
const TWO_PI = PI * 2;
export const E = 2.718281828459045;
const DEG_TO_RAD = PI / 180; // Конверсия градусов в радианы

function randomNumber() {
  let seed = 12345;
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export const random = randomNumber();

export function log(base, num) {
  let start = 0;
  let end = 0;
  let middle = 0;
  const accuracy = 10; //сколько знаков после запятой
  while (base ** end < +num) end++;
  start = end - 1;
  if (base ** start === num) return start;
  for (let i = 0; i < accuracy * 10; i++) {
    // находим серединное значение
    middle = (start + end) / 2;

    // если основание в этой степени больше нашего числа, то сдвигаем к середине конечную границу
    if (base ** middle > num) {
      end = middle;
    }
    // если основание в этой степени меньше нашего числа, то сдвигаем к середине начальную границу
    else if (base ** middle < num) {
      start = middle;
    }
    // если основание в этой степени равно нашему числу
    else {
      return middle;
    }
  }
  return (start + end) / 2;
}

// Сводим угол в [-π, +π] для лучшей сходимости рядов
function normalizeAngle(x) {
  //возьмём остаток от деления на 2π
  const k = (x / TWO_PI) | 0; // усечение до целой части (влево/вправо сдвигом)
  let r = x - k * TWO_PI;
  // приводим в [-π, π]
  if (r > PI) r -= TWO_PI;
  if (r < -PI) r += TWO_PI;
  return r;
}

function normalizeResult(x) {
  return parseFloat(x.toFixed(5));
}

// Конвертировать градусы в радианы
function toRadians(degrees) {
  return degrees * DEG_TO_RAD;
}

// Экспонента e^x через ряд Тейлора
function exp(x) {
  let sum = 1,
    term = 1;
  for (let n = 1; n < 20; n++) {
    term *= x / n; // term = xⁿ / n!
    sum += term;
  }
  return sum;
}

// Синус по ряду Тейлора
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

// Косинус по ряду Тейлора
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

// Тангенс через синус и косинус
export function tan(x, inDegrees = false) {
  const res = sin(x, inDegrees) / cos(x, inDegrees);
  return normalizeResult(res);
}

// Гиперболический синус
export function sinh(x) {
  // (eˣ − e⁻ˣ)/2
  const ex = exp(x);
  const emx = exp(-x);
  return (ex - emx) / 2;
}

// Гиперболический косинус
export function cosh(x) {
  // (eˣ + e⁻ˣ)/2
  const ex = exp(x);
  const emx = exp(-x);
  return (ex + emx) / 2;
}

// Гиперболический тангенс
export function tanh(x) {
  // sinh/cosh
  const e2x = exp(2 * x);
  // более стабильная форма: (e2x - 1)/(e2x + 1)
  return (e2x - 1) / (e2x + 1);
}
