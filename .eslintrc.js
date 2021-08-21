const rules = {
  'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  'eslint-comments/no-restricted-disable': [
    'error',
    // `alert` and `confirm` cannot be used in iframes so we can't allow it
    'no-alert',
    'eslint-comments/no-restricted-disable',
    'react-hooks/rules-of-hooks',
  ],
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      mjs: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'import/order': [
    'error',
    {
      alphabetize: {
        order: 'asc',
      },
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type',
      ],
      'newlines-between': 'always',
    },
  ],
  'jsx-a11y/anchor-is-valid': [
    'warn',
    {
      aspects: ['invalidHref', 'preferButton'],
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
    },
  ],
  'jsx-a11y/label-has-associated-control': [
    'error',
    {
      required: {
        some: ['nesting', 'id'],
      },
    },
  ],
  'max-len': [
    'warn',
    {
      ignorePattern:
        '(className=".+"|href=".+"|className=\\{`.+`\\}|^import\\s.+\\sfrom\\s.+;$|\\s+d=".+"|\\s+src=".+")',
    },
  ],
  'no-param-reassign': [
    'error',
    {
      ignorePropertyModificationsForRegex: ['state(_(.*?))?'],
      props: true,
    },
  ],
  'no-plusplus': [
    'error',
    {
      allowForLoopAfterthoughts: true,
    },
  ],
  // TODO Remove once Airbnb enables this
  'react/jsx-no-constructed-context-values': 'warn',
  // TODO Remove once Airbnb enables this
  'react/jsx-no-script-url': 'warn',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-sort-props': 'warn',
  // TODO Remove once Airbnb enables this
  'react/no-unstable-nested-components': 'warn',
  // Not needed in Next
  'react/react-in-jsx-scope': 'off',
  // Adds unnecessary syntax for optional props
  'react/require-default-props': 'off',
  'react/sort-prop-types': 'warn',
  // TODO Remove once Airbnb allows this
  'react/static-property-placement': ['warn', 'static public field'],
  'react-hooks/exhaustive-deps': [
    'warn',
    {
      additionalHooks: '(useDrag|useDrop|useEnterKey)',
    },
  ],
  'sort-destructure-keys/sort-destructure-keys': 'warn',
  'sort-imports': [
    'warn',
    {
      ignoreDeclarationSort: true,
    },
  ],
  'sort-keys': [
    'warn',
    'asc',
    {
      natural: true,
    },
  ],
};
const commonExtends = [
  'next',
  'prettier',
  'plugin:compat/recommended',
  'plugin:eslint-comments/recommended',
  'plugin:jest/all',
  'plugin:tailwind/recommended',
];
const commonPlugins = ['sort-destructure-keys'];
module.exports = {
  overrides: [
    {
      extends: ['airbnb', ...commonExtends],
      files: ['*.js', '*.jsx'],
      plugins: commonPlugins,
      rules,
    },
    {
      extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        ...commonExtends,
      ],
      files: ['src/**/*.ts{,x}', 'test/**/*.ts{,x}'],
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['deprecation', ...commonPlugins],
      rules: {
        '@typescript-eslint/member-ordering': [
          'warn',
          {
            classes: {
              // Prefer react/sort-comp
              memberTypes: 'never',
            },
            default: {
              order: 'alphabetically',
            },
          },
        ],
        'deprecation/deprecation': 'warn',
        ...rules,
      },
    },
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:testcafe-community/recommended',
      ],
      files: ['e2e/**/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['deprecation', 'sort-destructure-keys', 'testcafe-community'],
      rules: {
        '@typescript-eslint/member-ordering': [
          'warn',
          {
            classes: {
              // Prefer react/sort-comp
              memberTypes: 'never',
            },
            default: {
              order: 'alphabetically',
            },
          },
        ],
        'deprecation/deprecation': 'warn',
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
            },
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            'newlines-between': 'always',
          },
        ],
        'sort-destructure-keys/sort-destructure-keys': 'warn',
        'sort-imports': [
          'warn',
          {
            ignoreDeclarationSort: true,
          },
        ],
        'sort-keys': [
          'warn',
          'asc',
          {
            natural: true,
          },
        ],
      },
    },
  ],
  parser: '@babel/eslint-parser',
  rules,
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src', 'test', 'e2e'],
      },
    },
    polyfills: ['fetch', 'Promise', 'URL', 'URLSearchParams'],
    react: {
      version: 'detect',
    },
  },
};
