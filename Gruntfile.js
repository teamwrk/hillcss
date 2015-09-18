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
                    './examples/styles.css': './examples/styles.scss'
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
        },

        cmq: {
            options: {
                log: false
            },
            css: {
                files: {
                    './examples': ['examples/*.css']
                }
            }
        }
    });

    // Tasks
    grunt.registerTask('default', ['sass', 'cmq', 'bootcamp', 'watch']);
    grunt.registerTask('test',    ['sass', 'bootcamp']);
};
