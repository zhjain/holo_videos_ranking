module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:vue/vue3-essential",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {

        "ecmaVersion": "latest",
        "sourceType": "script"
    },
   
    "plugins": [
        "vue",
    ],
    "rules": {

        "indent": 0,

    }
}
