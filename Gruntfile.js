module.exports = function(grunt){
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Watch Tasks
		watch: {
			compass: {
				files: ['src_dev/scss/*.scss'],
				tasks: ['compass']
			},
			uglify: {
				files: ['src_dev/js/*.js'],
				tasks: ['uglify']
			}
		},

		// Compass Task
		compass: {
      dev: {
      	options: {
					sassDir: ['src_dev'],
					cssDir: ['src_dev'],
					environment: 'development'
				}
      },
      prod: {
      	options: {
					sassDir: ['src_dev'],
					cssDir: ['src'],
					environment: 'production'
				}
      }
		},

		// Uglify Task
		uglify: {
			dev: {
				options: {
	        beautify: true,
	        comments: true,
	        mangle: false // don't change the name of function and var
	      },
				files:{
					'src_dev/main.js': 'src_dev/js/*.js'
				}
			},
			prod: {
				options: {
					mangle: true,
	        sourceMap: false,
	        compress: {
		        drop_console: true
		      }
				},
				files:{
					'src/main.js': 'src_dev/js/*.js'
				}
			}
		}
	});
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// Default task(s).
	grunt.registerTask('default', ['compass:dev', 'uglify:dev']);
	// , 'watch'
};