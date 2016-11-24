module.exports = {
  extends: [
    'angular'
  ],
  rules: {
    "angular/no-service-method": 0,
    "quote-props": ["error", "as-needed"],
    "camelcase": [2, {properties: "never"}],
    "padded-blocks": ["error", { "classes": "always" }]
  }
}
