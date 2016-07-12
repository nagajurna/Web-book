module.exports = function(grunt) {
	
	//config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			my_target: {
				files: {
					'dist/webBook.min.js': ['dist/webBook.js']
				}
			}
		},
		jshint: {
			options: {
				browser: true,
				loopfunc: true
			},
			files: {
				src: ['dist/webBook.js']
			}
		}
	});
	
	//load tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
		
	//task
	grunt.registerTask('default', ['uglify']);
}
