/* jshint node: true */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = require('regexp-quote')
  var btoa = require('btoa')
  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Energy Inspctors, Inc. v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' */\n\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',

    // Task configuration.
    clean: {
      build: ['build']
      ,test: ['test']
      ,dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'src/scripts/bootstrap/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/scripts/bootstrap/*.js']
      },
      test: {
        src: ['src/scripts/bootstrap/tests/unit/*.js']
      }
      /*assets: {
        src: ['archive/docs-assets/js/application.js', 'archive/docs-assets/js/customizer.js']
      }*/
    },

    jscs: {
      options: {
        config: 'src/scripts/bootstrap/.jscs.json',
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      src: {
        src: ['src/scripts/bootstrap/*.js']
      },
      test: {
        src: ['src/scripts/bootstrap/tests/unit/*.js']
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['build/styles/main.css', 'build/styles/theme.css']
    },

    concat: {
      options: {
        stripBanners: true
      }
      ,bootstrap: {
        src: [
          'bower_components/bootstrap/js/transition.js'
          ,'bower_components/bootstrap/js/alert.js'
          ,'bower_components/bootstrap/js/button.js'
          ,'bower_components/bootstrap/js/carousel.js'
          ,'bower_components/bootstrap/js/collapse.js'
          ,'bower_components/bootstrap/js/dropdown.js'
          ,'bower_components/bootstrap/js/modal.js'
          ,'bower_components/bootstrap/js/tooltip.js'
          ,'bower_components/bootstrap/js/popover.js'
          ,'bower_components/bootstrap/js/scrollspy.js'
          ,'bower_components/bootstrap/js/tab.js'
          ,'bower_components/bootstrap/js/affix.js'
        ],
        dest: 'build/scripts/lib/bootstrap.js'
      }
      ,main: {
        src: [
          'src/scripts/plugins.js'
          ,'src/scripts/main.js'
        ],
        dest: 'build/scripts/main.js'
      }
      ,html_index: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/_index.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ],
        dest: 'build/index.html'
      }
      ,html_error: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header-error.html'
          ,'src/html/partials/_error.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ],
        dest: 'build/error.html'
      }
      /* use template below for additional pages
      ,html_example: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/_example.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ],
        dest: 'build/example.html'
      }*/
    },

    htmlmin: { 
      test: { 
        options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
          removeComments: false
          ,collapseWhitespace: false
          ,removeCommentsFromCDATA: false
          ,removeCDATASectionsFromCDATA: false
          ,collapseBooleanAttributes: false
          ,removeAttributeQuotes: false
          ,removeRedundantAttributes: false
          ,useShortDoctype: false
          ,removeEmptyAttributes: true
          ,removeOptionalTags: false
          ,removeEmptyElements: false
        },
        files: { 
          'test/index.html': 'build/index.html'
          ,'test/error.html': 'build/error.html'
        }
      },
      dist: { 
        options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
          removeComments: true
          ,collapseWhitespace: true
          ,removeCommentsFromCDATA: true
          ,removeCDATASectionsFromCDATA: false
          ,collapseBooleanAttributes: false
          ,removeAttributeQuotes: false
          ,removeRedundantAttributes: false
          ,useShortDoctype: false
          ,removeEmptyAttributes: true
          ,removeOptionalTags: false
          ,removeEmptyElements: false
        },
        files: { 
          'dist/index.html': 'build/index.html' 
          ,'dist/error.html': 'build/error.html'
        }
      }
    },

    less: {
      test: {
        options: {
          strictMath: true
          ,sourceMap: true
        },
        files: {
          'build/styles/main.css': 'src/styles/less/main.less'
          ,'build/styles/theme.css': 'src/styles/less/theme.less'
        }
      },
      dist: {
        options: {
          strictMath: true
          ,cleancss: true
          ,report: 'min'
        },
        files: {
          'build/styles/main.css': 'src/styles/less/main.less'
          ,'build/styles/theme.css': 'src/styles/less/theme.less'
        }
      },
      gzip: {
        options: {
          strictMath: true
          ,cleancss: true
          ,report: 'gzip'
        },
        files: {
          'build/styles/main.css.gz': 'src/styles/less/main.less'
          ,'build/styles/theme.css.gz': 'src/styles/less/theme.less'
        }
      }
    },

    csscomb: {
      test: {
        sort: {
          options: {
            sortOrder: '.csscomb.json'
          },
          files: {
            'test/css/main.css': ['build/styles/main.css'],
            'test/css/theme.css': ['build/styles/lib/theme.css'],
          }
        }
      },
      dist: {
        sort: {
          options: {
            sortOrder: '.csscomb.json'
          },
          files: {
            'dist/css/main.css': ['build/styles/main.css'],
            'dist/css/theme.css': ['build/styles/lib/theme.css'],
          }
        }
      }
    },

    uglify: {
      testBootstrap: {
        options: {
          mangle: false
          , compress: false
          , beautify: true
          , report: false
          , sourceMap: 'test/scripts/lib/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: true
        },
        files: {
          'test/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
        }
      },
      distBootstrap: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: false
          , report: 'min'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        },
        files: {
          'dist/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
        }
      },
      gzipBootstrap: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: false
          , report: 'gzip'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        },
        files: {
          'dist/scripts/lib/bootstrap.js.gz':'<%= concat.bootstrap.dest %>'
        }
      },
      testMain: {
        options: {
          mangle: false
          , compress: false
          , beautify: true
          , report: false
          , sourceMap: 'test/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: true
        },
        files: {
          'test/scripts/main.js':'<%= concat.main.dest %>'
        }
      },
      distMain: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: false
          , report: 'min'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        },
        files: {
          'dist/scripts/main.js':'<%= concat.main.dest %>'
        }
      },
      gzipMain: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: false
          , report: 'gzip'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        },
        files: {
          'dist/scripts/main.js.gz':'<%= concat.main.dest %>'
        }
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/js/vendor/*.js"], dest: 'build/scripts/lib/'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/apple-touch-icon-precomposed.png"], dest: 'build/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/apple-touch-icon-precomposed.png"], dest: 'build/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'build/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/crossdomain.xml"], dest: 'build'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/humans.txt"], dest: 'build'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/robots.txt"], dest: 'build'}
          ,{expand: true, flatten: true, src: ["archive/ico/*"], dest: 'build/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["src/images/**/*"], dest: 'build/images/'}
          ,{expand: true, flatten: true, src: ["src/fonts/**/*"], dest: 'build/fonts/'}
        ]
      },
      test: {
        files: [
          {expand: true, flatten: true, src: ["build/images/ico/bootstrap/*"], dest: 'test/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["build/images/ico/h5bp/*"], dest: 'test/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["build/images/*"], dest: 'test/images/'}
          ,{expand: true, flatten: true, src: ["build/fonts/*"], dest: 'test/fonts/'}
          ,{expand: true, flatten: true, src: ["build/styles/*"], dest: 'test/styles/'}
          ,{expand: true, flatten: true, src: ["build/scripts/lib/*"], dest: 'test/scripts/lib/'}
          ,{expand: true, flatten: true, src: ["build/crossdomain.xml"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["build/humans.txt"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["build/robots.txt"], dest: 'test/'}
        ]
      },
      dist: {
        files: [
          {expand: true, flatten: true, src: ["build/images/ico/bootstrap/*"], dest: 'dist/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["build/images/ico/h5bp/*"], dest: 'dist/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["build/images/*"], dest: 'dist/images/'}
          ,{expand: true, flatten: true, src: ["build/fonts/*"], dest: 'dist/fonts/'}
          ,{expand: true, flatten: true, src: ["build/styles/*"], dest: 'dist/styles/'}
          ,{expand: true, flatten: true, src: ["build/scripts/lib/*"], dest: 'dist/scripts/lib/'}
          ,{expand: true, flatten: true, src: ["build/crossdomain.xml"], dest: 'dist/'}
          ,{expand: true, flatten: true, src: ["build/humans.txt"], dest: 'dist/'}
          ,{expand: true, flatten: true, src: ["build/robots.txt"], dest: 'dist/'}
        ]
      }    
    },

    qunit: {
      options: {
        inject: 'scripts/bootstrap/tests/unit/phantom.js'
      },
      files: ['scripts/bootstrap/tests/*.html']
    },

    connect: {
      test: {
        options: {
          port: 3000
          ,base: './test/'
          ,keepalive: true
        }
      },
      dist: {
        options: {
          port: 3001
          ,base: './dist/'
          ,keepalive: true
        }
      }
    },

    validation: {
      options: {
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: ['build/**/*.html']
      }
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      less: {
        files: 'src/styles/less/*.less',
        tasks: ['less']
      }
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver')
          return old ? RegExp.quote(old) : old
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 3,
          urls: ['http://127.0.0.1:3000/js/tests/index.html'],
          browsers: [
            // See https://saucelabs.com/docs/platforms/webdriver
            {
              browserName: 'safari',
              version: '6',
              platform: 'OS X 10.8'
            },
            {
              browserName: 'chrome',
              version: '28',
              platform: 'OS X 10.6'
            },
            /* FIXME: currently fails 1 tooltip test
            {
              browserName: 'firefox',
              version: '25',
              platform: 'OS X 10.6'
            },*/
            // Mac Opera not currently supported by Sauce Labs
            /* FIXME: currently fails 1 tooltip test
            {
              browserName: 'internet explorer',
              version: '11',
              platform: 'Windows 8.1'
            },*/
            /*
            {
              browserName: 'internet explorer',
              version: '10',
              platform: 'Windows 8'
            },
            {
              browserName: 'internet explorer',
              version: '9',
              platform: 'Windows 7'
            },
            {
              browserName: 'internet explorer',
              version: '8',
              platform: 'Windows 7'
            },
            {// unofficial
              browserName: 'internet explorer',
              version: '7',
              platform: 'Windows XP'
            },
            */
            {
              browserName: 'chrome',
              version: '31',
              platform: 'Windows 8.1'
            },
            {
              browserName: 'firefox',
              version: '25',
              platform: 'Windows 8.1'
            },
            // Win Opera 15+ not currently supported by Sauce Labs
            {
              browserName: 'iphone',
              version: '6.1',
              platform: 'OS X 10.8'
            },
            // iOS Chrome not currently supported by Sauce Labs
            // Linux (unofficial)
            {
              browserName: 'chrome',
              version: '30',
              platform: 'Linux'
            },
            {
              browserName: 'firefox',
              version: '25',
              platform: 'Linux'
            }
            // Android Chrome not currently supported by Sauce Labs
            /* Android Browser (super-unofficial)
            {
              browserName: 'android',
              version: '4.0',
              platform: 'Linux'
            }
            */
          ],
        }
      }
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jscs-checker');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-sed');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Test task.
  var testSubtasks = ['dist-css', 'jshint', 'jscs', 'qunit', 'validate-html'];
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined') {
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  }
  grunt.registerTask('test', testSubtasks);

  // concat & stage uncompiled sources for builds 
  grunt.registerTask('build', [
      'clean:build'
      ,'copy:build'
      ,'concat:bootstrap'
      ,'concat:main'
      ,'concat:html_index'
      ,'concat:html_error'
  ]);
  
  // build test site, no minification
  grunt.registerTask('test', [
      'build'
      ,'clean:test'
      ,'less:test' 
      ,'copy:test'
      ,'htmlmin:test'
      ,'uglify:testBootstrap'
      ,'uglify:testMain'
  ]);

  // build production site, everything compiled & minified
  grunt.registerTask('dist', [
      'build'
      ,'clean:dist'
      ,'less:dist' 
      ,'copy:dist'
      ,'htmlmin:dist'
      ,'uglify:distBootstrap'
      ,'uglify:distMain'
  ]);

  // build production site, everything compiled & minified
  grunt.registerTask('gzip', [
      'build'
      ,'clean:dist'
      ,'less:gzip' 
      ,'copy:dist'
      ,'htmlmin:dist'
      ,'uglify:gzipBootstrap'
      ,'uglify:gzipMain'
  ]);

  // Default task.
  grunt.registerTask('default', ['build-test','build-dist']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', ['sed']);

};
