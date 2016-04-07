module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        concat: {
            options: {
                separator: '\n;',
                process: false,
                stripBanners: {
                    block: true
                }
            },
            app: {
                src: [
                    'public/libs/angular/angular.min.js',
                    'public/libs/angular-route/angular-route.min.js',
                    'public/libs/angular-sanitize/angular-sanitize.min.js',
                    'public/libs/moment/moment.js',
                    'public/libs/bootstrap/js/collapse.js',
                    'public/scripts/**/*.js',
                    'public/scripts/*.js'
                ],
                dest: 'public/dist/app.js'
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            built: {
                files: {
                    'public/dist/app.min.js': ['public/dist/app.js']
                }
            }
        },

        less: {
            style: {
                files: { //archivos a compilar
                    "public/dist/style.css": "public/less/style.less" //destino: origen
                }
            }
        },

        watch: {
            js: {
                files: ['public/scripts/**/*.js', 'public/scripts/*.js'],
                tasks: ['concat']
            },
            styles:{
            files:["public/less/*.less"], //observa cualquier cambio en archivos LESS
            tasks:["less"], //ejecuta la compilación de LESS
            options:{
                spawn: false //para que no se quede tostado (¿?)
                }
            }
        }

    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // default task(s).
    grunt.registerTask('default', ['less', 'concat', 'watch']);
    grunt.registerTask('prod', ['less', 'concat', 'uglify']);

};