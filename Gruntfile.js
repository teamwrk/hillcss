module.exports = function(grunt) {

    // Modules
    // grunt.loadNpmTasks('grunt-init');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('bootcamp');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-combine-media-queries');

    // Grunt Tasks
    grunt.initConfig({

        // Sass
        sass: {
            test: {
                options: {
                    style: 'expanded',
                },
                files: {
                    'test-results.css': './tests/tests.scss',
                    './demo/dist/styles.css': './demo/styles.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                },
                files: {
                    'hill.css': 'hill.scss'
                }
            }
        },

        // Bootcamp SCSS Unit Tests
        bootcamp: {
            test: {
                files: {
                    src: ['test-results.css']
                }
            }
        },

        // Watch
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass', 'bootcamp', 'cmq']
            },
            css: {
                files: '**/*.css',

                options: {
                    livereload: 1338
                }
            },
            js: {
                files: ['demo/js/*.js'],
                tasks: ['browserify']
            }
        },

        cmq: {
            options: {
                log: false
            },
            css: {
                files: {
                    './demo/dist': ['demo/dist/*.css']
                }
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ]
                },
                files: {
                    'demo/dist/app.js': 'demo/js/app.js'
                }
            }
        },
    });

    // Tasks
    grunt.registerTask('default', ['sass', 'browserify', 'cmq', 'bootcamp', 'watch']);
    grunt.registerTask('test',    ['sass', 'bootcamp']);
};
