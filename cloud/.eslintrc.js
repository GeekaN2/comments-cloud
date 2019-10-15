module.exports = {
    "extends": [
      "standard"
    ],
  
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "ecmaFeatures": {
        "classes": true,
        "jsx": true
      }
    },
    "rules": {
  
      "arrow-spacing": [2, {
        "before": true,
        "after": true
      }],
  
      "no-catch-shadow": 2,
      "no-delete-var": 2,
      "no-label-var": 2,
      "no-shadow-restricted-names": 2,
      "no-shadow": 2,
      "no-undef-init": 2,
      "no-undef": 2,
      "no-unused-vars": 1,
  
      "array-bracket-spacing": [2, "never", {
        "singleValue": true,
        "objectsInArrays": true,
        "arraysInArrays": true
      }],
      "quotes": [1, "single", "avoid-escape"],
      "eqeqeq": 0,
      "brace-style": [2, "1tbs"],
  
      "comma-spacing": [2, {
        "before": false,
        "after": true
      }],
      "comma-style": [2, "last"],
      "eol-last": 0,
      "no-nested-ternary": 1,
      "no-trailing-spaces": 2,
      "no-mixed-spaces-and-tabs": 2,
      "padded-blocks": [2, "never"],
      "space-before-blocks": 1,
      "space-before-function-paren": [1, {
        "anonymous": "always",
        "named": "never"
      }],
      "spaced-comment": [2, "always", {
        "exceptions": ["-", "+"],
        "markers": ["=", "!"]
      }],
      "semi": [2, "always"],
      "indent": [2, 2, {
        "SwitchCase": 1,
        "VariableDeclarator": 2
      }],
      "camelcase": [2, {
        "properties": "always"
      }],
      "newline-after-var": [1, "always"],
      "require-jsdoc": ["error", {
        "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": true,
          "ClassDeclaration": true,
          "ArrowFunctionExpression": false
        }
      }],
  
      "prefer-const": ["error", {
        "destructuring": "all",
        "ignoreReadBeforeAssign": true
      } ],
  
      "multiline-comment-style": ["error", "starred-block"]
    },
    "globals":{
      "document": true,
      "module": true,
      "require": true,
      "window": true,
      "console" : true,
      "CustomEvent": true,
      "codex": true,
      "VERSION" : true,
      "Promise" : true,
      "MutationObserver": true,
      "FormData": true,
      "XMLHttpRequest": true,
      "ActiveXObject": true,
      "FileReader": true,
      "logger": true,
      "global": true,
      "app": true,
      "process": true,
      "__dirname": true
    }
  }