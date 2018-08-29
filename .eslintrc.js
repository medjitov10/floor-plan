module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
      "react/destructuring-assignment": ["never"],
      "react/forbid-prop-types": ["any"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/jsx-wrap-multilines": ["off"],
      "react/jsx-one-expression-per-line": ["off"],
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/mouse-events-have-key-events": "off",
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      "jsx-a11y/label-has-for": 'off',
      'jsx-quotes': 'off',
      "object-shorthand": ["error", "always"],
      "camelcase": ["error", {properties: "never"}],
      "no-restricted-globals": "off"
    }
};
