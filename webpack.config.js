module.exports =
    [
        {
            entry: './public/js/bundling.js',
            output: {
                filename: './bundle.js'
            },
            performance: { hints: false },
            mode: 'none'
        },
        {
            entry: './public/js/sourcing.js',
            output: {
                filename:'./source.js'
            },
            performance: { hints: false },
            mode: 'none'
        }
    ];