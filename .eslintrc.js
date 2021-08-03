const rules = {
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
  'import/no-named-as-default': 0,
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
  'plugin:jest/all',
];
const commonPlugins = ['sort-destructure-keys'];
module.exports = {
  overrides: [
    {
      extends: ['airbnb', ...commonExtends],
      files: ['*.js', '*.jsx'],
      parser: '@babel/eslint-parser',
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
      files: ['*.ts', '*.tsx'],
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
  ],
  rules,
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
    polyfills: ['fetch', 'Promise', 'URL', 'URLSearchParams'],
  },
};