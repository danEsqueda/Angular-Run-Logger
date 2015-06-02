'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.initConfig({

    bower: {
      install: {
        options: {
          targetDir: './public',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        },
      },
    },

    karma: {
      all:
      {
        singleRun : true,
        configFile : "karma.conf.js"
      }
    },

    browserify: {
      dist: {
        files: {
          './public/scripts/app-bundle.js': ['./src/client/app.js', './src/client/*.js'],
        },
      },
    },

    jshint: {
      all: {
        src: ['./*.js', './test/**/*_test.js'],
        options: {
          mocha: true,
          node: true,
          strict: true,
        },
      },
    },

    jscs: {
      all: {
        src: ['./*.js', './test/**/*_test.js', './src/**/*.js', './spec/**/*.js'],
        options: {
          config: '.jscsrc',
          verbose: true,
        },
      },
    },

    simplemocha: {
      all: {
        src: ['./test/**/*_test.js'],
      },
    },
    watch: {
      files: ['./*.js', './test/**/*_test.js', './src/client/**/*.js'],
      tasks: ['lint', 'test', 'browserify'],
      options: {
        spawn: false,
      },
    },
  });


  grunt.registerTask('client', ['browserify', 'karma']);
  grunt.registerTask('test', ['browserify', 'simplemocha', 'karma']);
  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('default', ['lint', 'test']);
};
