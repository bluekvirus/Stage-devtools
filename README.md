Stage-devtools    v0.1.x
========================
Devtools for convenient Stage.js development.


Requirement
-----------
1. Nodejs v0.10.26+
2. Bower v1.3.1+
3. GraphicsMagick v1.3.19+
4. Redis v2.8.13+ [optional]
5. MongoDB v2.6.3+ [optional]

Install
-------
```
npm install -g stage-devtools
```
This will give you a globally available `stagejs` command in cli.


Usage
-----
###Initialize new project
```
stagejs init
```
This will download the latest Stage.js starter kit for you and prepare the development environment.

###Create contexts
```
stagejs create context <your context name>
```
This will create an empty context script and its mockup template.

###Create views
```
stagejs create view <your view name in dotted notation>
```
This is to create an empty named view script and its mockup template. e.g `a.b.c` means to create both `js/a/b/c.js` and `static/template/a/b/c.html`.

###Create/Refresh theme
(You can also update existing theme with this cmd)
```
stagejs theme <your theme name>
```
This will create a new theme for you to develop with, which extends from the *default* theme package. If the theme already exists, it will refresh it. (With css-sprite generation included)

**Note**: Refresh a theme will not copy the original *default* theme package over again, so if you want to keep that part updated as well you will have to do it manually.

**Tip**: use `-h` to see more options with this command.


###Update project
```
stagejs update [-e, --edge] [-p, --packages]
```
This will update `bower.json` and then update the bower managed packages. It will also update the *default* theme package and tools. If you put `--edge` option into the command, it will also fetch and replace `stage.js`, `stage.min.js` and `dependencies.min.js` with the latest edge build from the Stage.js project repository.

By default, the `update` command will only install missing libraries & packages indicated by the updated `bower.json` and `package.json`. If you want to fully update all of the installed libraries & packages in addition, please indicate this using the `--packages` flag.

###Build project
(single config file - dist.js, doesn't require app server to be running)
```
stagejs build [--dist <path to your deploy folder>] [--config <config name>]
```
This will build your project into production ready package, including js combine/minification, folder merge/creation and file copying.

**Limitation**: The build command requires a config file to present (defaults on `dist.js`) and the build process will not refresh your project themes, so make sure you've done that before invoking build.

**Tip**: use `-h` to see more options with this command.


###Start dev app server
(single config/setup file - profile.js)
```
stagejs serve [--port <port number>] [--profile <profile name>]
```
This will start the development server for you. It includes CORS, HTTP(s) Request Forwarding, WebSocket, Background Tasks, RESTful API and DB/Store. It also includes code change monitors for you to easily watch `*.less` theme file and `*.html` template file changes. Config to this server will be read in from its profile, you can enable/disable its features there and add more customized stuff if needs be.

**Limitation**: There is no group/role based authorization yet, only ACL based authentication atm.

###Create routes
(+RESTful APIs based on Expressjs4)
```
stagejs create route <your route name>
```

###Create middlewares
```
stagejs create middleware <your middleware name>
```

**Limitation**: It requires more effort than just creating a middleware definition file from this command. Given that the sequence of middleware loading does affect your application, and some of the middleware requires additional configure to setup, you will have to manually edit the middleware stack in the server profile before your new middleware can take effect in the app server.

###Create tasks
```
stagejs create task <your task name>
```
This will create an empty background task definiton stub for you.


The .stagejsrc file
-------------------
This is the optional env file for `stagejs` cli, which normally contains the following information: (in JSON format)
```
{
    "implementation": "./implementation",
    "tools": "./tools"
}
```
For it to take effect, simply put it under the current working directory where you invoke the `stagejs` command.


Change log
----------
...


Contribute
----------
...


Distribute
----------
Update `README.md`, `CHANGELOG.md` and `package.json` before releasing new versions through `npm publish`.


License
-------
Copyright 2014 - 2015 Tim (Zhiyuan) Liu. 
Under the [MIT](http://opensource.org/licenses/MIT) License.

