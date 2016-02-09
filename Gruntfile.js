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
                files: '**/*.css',

                options: {
                    livereload: 1338
                }
            }
        },

        // cmq: {
        //     options: {
        //         log: false
        //     },
        //     default: {
        //         files: {
        //             './griddl/dist': ['griddl/dist/*.css']
        //         }
        //     }
        // },
    });

    // Tasks
    grunt.registerTask('default', ['sass', 'bootcamp', 'watch']);
    grunt.registerTask('test',    ['sass', 'bootcamp']);
};
