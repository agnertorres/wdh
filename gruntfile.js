module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
    cssmin: {
			dist: {
				src: ['app/styles/style.css', 'app/styles/utils.css'],
				dest: 'app/styles/all.min.css'
			}
		},
    uglify: {
      scripts: {
        src: ['app/scripts/app.js',
              'app/scripts/login.js',
              'app/scripts/new-note.js',
              'app/scripts/notes.js'
        ],
        dest: 'app/scripts/scripts.min.js'
      }
    },
	});

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['cssmin:dist', 'uglify:scripts']);
};
