# Calculator

## 1. Task

[Innowise Lab Internship* Level 0* Custom calculator.pdf](https://github.com/user-attachments/files/21856136/Innowise.Lab.Internship_.Level.0_.Custom.calculator.1.1.pdf)

## 2. Description

This project implements a Scientific Calculator that goes beyond basic arithmetic to include advanced mathematical functions and constants:

### Arithmetic & Power

- Addition, subtraction, multiplication, division
- Exponentiation (tenPowerX, EE)
- Arbitrary-degree roots (yRoot), square root, cube root

### Logarithms & Constants

- Natural logarithm (ln)
- Base-10 logarithm (log10)
- Mathematical constants: e (e()), π (pi())

### Utility Functions

- Reciprocal (reciprocal)
- Percent conversion (percent)
- Sign inversion (changeSign)
- Random number generator (rand)

For more details, please refer to the task document.

## 3. Project structure

```
/ (root)
├─ src/
│  ├─ css/
│  │  ├─ calculator.css
│  │  ├─ index.css
│  │  └─ switch.css
│  ├─ js/
│  │  ├─ Calculator.js       # Core calculator logic
│  │  ├─ Command.js          # Command pattern handlers
│  │  ├─ index.js            # App entry point, UI bindings
│  │  └─ math.js             # Math utility functions
│  ├─ tests/
│  │  └─ Calculator.test.js  # Jest tests for calculator logic
│  └─ index.html             # Main HTML file
├─ .babelrc                  # Babel configuration
├─ .gitignore                # Git ignore rules
├─ .prettierignore           # Prettier ignore rules
├─ .prettierrc               # Prettier configuration
├─ eslint.config.mjs         # ESLint configuration
├─ package.json              # Project metadata & dependencies
├─ package-lock.json         # Locked dependency versions
└─ webpack.config.js         # Webpack bundling configuration
```

## 4. How to run the app

> Instructions for Building the Application

1. **Clone the repository:**

```
   git clone https://github.com/selukdiana/calculator.git
   cd calculator
```

2. **Install dependencies:**

Make sure you have Node.js installed. Then run:

```
   npm install
```

3. **Run the application:**

To start the application, use:

```
   npm run start
```

The app will be accessible at http://localhost:5000.

Available Scripts

```
npm start — start dev server
npm test — run Jest tests
npm run lint — run ESLint
npm run format — run Prettier
npm run build — bundle for production
```
