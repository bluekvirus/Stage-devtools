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

###Create/Update theme
(You can also update existing theme with this cmd)
```
stagejs theme <your theme name> [--force]
```
This will create a new theme for you to develop with, which extends from the default theme package. If the theme already exists, it will refresh it.

**Note**: Refresh a theme will not copy the original default theme package over again, so if you want to keep that part updated as well you will have to do it manually. Or, if you are sure copying over again will not clear/affect any of the new style you've put into the targeted theme, simply add `--force` into the command. 

###Start monitors
```
//start all monitors, including theme and template monitors
stagejs monitors

//or
stagejs monitor theme [specific theme]
stagejs monitor template
```
This will start the code monitors for automatically detect changes in targeted parts of your project and invoke processing/compile routine automatically.

###Start web server
```
stagejs serve [--port 5000] [--profile default]
```
This will start the development server for you. It includes CORS, HTTP(s) Request Forwarding and normal RESTful API & DB stuff. Config to this server will be read in from its profile.

**Limitation**: There is no group/role based authorization yet.

###Create routes
(RESTful APIs)
```
stagejs route <your route name>
```

