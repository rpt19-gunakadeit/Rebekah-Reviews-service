module.exports = function(grunt) {
  // Load S3 plugin
  grunt.loadNpmTasks('grunt-aws')

  // Static Webserver
  grunt.loadNpmTasks('grunt-contrib-connect')

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('.aws.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.secretAccessKey %>', // You can also use env variables
        bucket: '<%= aws.bucket %>',
        region: 'us-east-2',
      },
      build: {
        cwd: 'public/dist',
        src: '**',
      }

    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public',
          keepalive: true,
        },
      },
    },
  })

  // Default task(s).
  grunt.registerTask('default', ['connect'])
}