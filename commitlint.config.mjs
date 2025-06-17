// commitlint.config.mjs
export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'test',
                'chore',
                'perf',
                'ci',
                'build',
                'revert',
                'wip',
                'release',
                'config',
                'types'
            ]
        ],
        'subject-case': [2, 'never', ['start-case', 'pascal-case']],
        'subject-empty': [2, 'never'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'header-max-length': [2, 'always', 72]
    }
}
