module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
    },
    "extends": ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        '@typescript-eslint',
        'react-hooks'
    ],
    "rules": {
        //'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'linebreak-style': 'off',
        'no-console': 'warn',
        'no-tabs': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-restricted-globals': 'warn',
        'no-param-reassign': ['error', { 'props': false }],
        'semi': ['warn', 'always'],
        'prefer-const': 'warn',
        'quotes': ['warn', 'single'],
        'jsx-quotes': ['warn', 'prefer-single'],
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/control-has-associated-label': 'off',
        'array-callback-return': 'off',
        "consistent-return": 'warn',
        'react/jsx-indent': ['error', 'tab'],
        'react/jsx-indent-props': ['error', 'tab'],
        'react/jsx-max-props-per-line': ['warn', { maximum: 3 }],
        'react/prop-types': 'off',
        'indent': ['error', 'tab'],
        'react/jsx-filename-extension': [
            2, 
            {extensions: ['.js', '.jsx', '.tsx']}
        ],
        //'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        //'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/button-has-type': 'off',
        'react/jsx-wrap-multilines': 'off',
        'max-len': [
            'error',
            {
                code: 110,
                ignoreComments: true
            }
        ],
        'jsx-a11y/label-has-associated-control': [ 'error', {
            'controlComponents': ['Input'],
        }],
        'object-curly-newline': 'off',
        'react/jsx-one-expression-per-line': 'off',
    },
}
