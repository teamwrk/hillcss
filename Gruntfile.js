module.exports = function(grunt) {

    // Modules
    // grunt.loadNpmTasks('grunt-init');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('bootcamp');
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
                    './demo/styles.css': './demo/styles.scss'
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
                files: ['**/*.js'],
                tasks: ['babel']
            }
        },

        cmq: {
            options: {
                log: false
            },
            css: {
                files: {
                    './demo': ['demo/*.css']
                }
            }
        }

        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'demo/dist/main.js': 'demo/js/main.js'
                }
            }
        }
    });

    // Tasks
    grunt.registerTask('default', ['sass', 'babel', 'cmq', 'bootcamp', 'watch']);
    grunt.registerTask('test',    ['sass', 'bootcamp']);
};
