export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest", // Latest ECMAScript version
      sourceType: "module", // Use "module" for ES modules, "script" for CommonJS
    },
    env: {
      node: true, // Enable Node.js global variables
      es2021: true, // Use ES2021 features
    },
    rules: {
      "no-console": "off", // Allow console.log statements
      semi: ["error", "always"], // Require semicolons
      quotes: ["error", "single"], // Enforce single quotes
      eqeqeq: ["error", "always"], // Require strict equality
      "no-var": "error", // Disallow var
      "prefer-const": "error", // Suggest using const
    },
  },
];
