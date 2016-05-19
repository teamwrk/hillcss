module.exports = function(grunt) {

    // Modules
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('bootcamp');

    // Grunt Tasks
    grunt.initConfig({

        // Sass
        sass: {
            test: {
                options: {
                    style: 'expanded',
                },
                files: {
                    './dist/test-results.css': './tests/tests.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                },
                files: {
                    './dist/hill.css': 'hill.scss'
                }
            }
        },

        // Bootcamp SCSS Unit Tests
        bootcamp: {
            test: {
                files: {
                    src: ['./dist/test-results.css']
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
                files: '**/*.css'
            }
        },

        cmq: {
            options: {
                log: false
            },
            default: {
                files: {
                    './dist': ['./dist/*.css']
                }
            }
        },
    });

    // Tasks
    grunt.registerTask('dev', [
        'sass'
    ]);
    grunt.registerTask('serve', [
        'dev',
        'bootcamp',
        'watch'
    ]);
    grunt.registerTask('test', [
        'dev',
        'bootcamp'
    ]);

    grunt.registerTask('default', ['dev']);
};
