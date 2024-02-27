/** @type {import('prettier').Config} */
module.exports = {
    semi: false,
    singleQuote: true,
    endOfLine: 'lf',
    tabWidth: 4,
    jsxBracketSameLine: true,
    trailingComma: 'es5',
    plugins: [require('prettier-plugin-tailwindcss')]
}