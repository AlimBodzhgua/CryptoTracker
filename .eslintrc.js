module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
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
        'no-console': 'warn',
        'no-tabs': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'warn',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-restricted-globals': 'warn',
        'no-param-reassign': 'warn',
        'semi': ['warn', 'always'],
        'prefer-const': 'warn',
        'quotes': ['warn', 'single'],
        'jsx-quotes': ['warn', 'prefer-single'],
        'jsx-a11y/click-events-have-key-events': 'warn',
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'indent': [2, 4],
        'react/jsx-filename-extension': [
            2, 
            {extensions: ['.js', '.jsx', '.tsx']}
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/button-has-type': 'off',
        'react/prop-types': 'warn',
        'max-len': [
            'error',
            {
                code: 110,
                ignoreComments: true
            }
        ]
    },
}
