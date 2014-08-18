Stage-devtools    v0.1.0
========================
Devtools for convenient Stage.js development.


Requirement
-----------
1. Nodejs v0.10.26+
2. GraphicsMagick v1.3.19+


Install
-------
```
npm install -g stage-devtools
```
This will give you a globally available `stagejs` command in cli.


Usage
-----
###Create new project
```
stagejs init
```
This will download the latest Stage.js starter kit for you and prepare the development environment.

###Create contexts
```
stagejs context <your context name>
```
This will create an empty context script and its mockup template.

###Create views
```
stagejs view <your view name in dotted notation>
```
This is to create an empty named view script and its mockup template. e.g `a.b.c` means to create both `js/a/b/c.js` and `static/template/a/b/c.html`.

###Create/Refresh theme
(You can also update existing theme with this cmd)
```
stagejs theme <your theme name> [--force]
```
This will create a new theme for you to develop with, which extends from the *default* theme package. If the theme already exists, it will refresh it. (With css-sprite generation included)

**Note**: Refresh a theme will not copy the original *default* theme package over again, so if you want to keep that part updated as well you will have to do it manually. Or, if you are sure copying over again will not clear/affect any of the new style you've put into the targeted theme, simply add `--force` into the command. 


###Update project
```
stagejs update [--edge]
```
This will update `bower.json` and then update the bower managed packages. It will also update the *default* theme package. If you put `--edge` option into the command, it will also fetch and replace `stage.js` and `stage.min.js` with the latest edge build from the Stage.js project repository.

###Build project
(Front-end only, doesn't require app server to be running)
```
stagejs build [--dist <path to your deploy folder>] [--config <config name>]
```
This will build your project into production ready package, including js combine/minification, folder merge/creation and file copying.

**Limitation**: The build command requires a config file to present (defaults on `dist.js`) and the build process will not refresh your project themes, so make sure you've done that before invoking build.


###Start dev app server
```
stagejs serve [--port <port number>] [--profile <profile name>]
```
This will start the development server for you. It includes CORS, HTTP(s) Request Forwarding and normal RESTful API & DB/Store stuff. It also includes code change monitors for you to easily watch `*.less` theme file and `*.html` template file changes. Config to this server will be read in from its profile, you can enable/disable its features there. 

**Limitation**: There is no group/role based authorization yet, only ACL based authentication atm.

###Create routes
(+RESTful APIs based on Expressjs4)
```
stagejs route <your route name>
```

###Create middlewares
```
stagejs middleware <your middleware name>
```

**Limitation**: It requires more effort than just creating a middleware definition file from this command. Given that the sequence of middleware loading does affect your application, and some of the middleware requires additional configure to setup, you will have to manually edit the middleware stack file before your new middleware can take effect in the app server.

###Create tasks
```
stagejs task <your task name>
```
This will create an empty background task definiton stub for you.


Add your own command
--------------------
...


Change log
----------
...


Contribute
----------
...


License
-------
Copyright 2014 - 2015 Tim (Zhiyuan) Liu. 
Under the [MIT](http://opensource.org/licenses/MIT) License.

