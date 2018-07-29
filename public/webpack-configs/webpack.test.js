module.exports = {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
    },

    plugins: [
        // https://github.com/webpack-contrib/karma-webpack/issues/49
        // this plugin attempt to prevent tests from running if some error is detected in source code. Unfortunately, this does not catch all syntax errors, leading to skipped tests
        // with no indication that errors were found. This problem occurs only when karma is started with option singleRun: false,
        function() {
            this.plugin('done', function(stats) {
                function shouldStopTests() {
                    return (
                        (stats.compilation.errors && stats.compilation.errors.length) ||
                        (stats.compilation.warnings && stats.compilation.warnings.length)
                    );
                }
                if (shouldStopTests()) {
                    // Log each of the errors
                    stats.compilation.errors.forEach(function(error) {
                        console.log(error.message || error);
                    });
                    stats.compilation.warnings.forEach(function(error) {
                        console.log(error.message || error);
                    });
                    // Pretend no assets were generated. This prevents the tests
                    // from running making it clear that there were errors.
                    stats.stats = [
                        {
                            toJson: function() {
                                return this;
                            },
                            assets: [],
                        },
                    ];
                }
            });
        },
    ],
};
