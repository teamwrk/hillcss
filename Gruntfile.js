module.exports = function(grunt) {

  // Modules
  // grunt.loadNpmTasks('grunt-init');
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
          'test-results.css': 'tests.scss',
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
      dev: {
        files: ['*.scss', 'libs/*.scss', 'specs/*.scss'],
        tasks: ['sass', 'bootcamp']
      }
    }
  });

  // Tasks
  grunt.registerTask('default', ['sass', 'bootcamp', 'watch']);
  grunt.registerTask('test',    ['sass', 'bootcamp']);
};
