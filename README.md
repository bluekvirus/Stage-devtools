Stage-devtools
========================
<a href="https://www.npmjs.org/package/stage-devtools"><img src="http://img.shields.io/npm/v/stage-devtools.svg?style=flat" alt="DevTools Version"></img> <img src="http://img.shields.io/npm/dm/stage-devtools.svg?style=flat" alt="DevTools Download Stat"></a>

Devtools for convenient Stage.js development.


Requirement
-----------
1. Nodejs v0.10.26+
2. Bower v1.3+
3. Nodemon v1.1+
4. Git v1.8+
5. GraphicsMagick v1.3.19+


We have prepared a [development environment guide](ENV.md) for you, please consult it before continue.

Install
-------
```
npm install -g stage-devtools
```
This will give you a globally available `stagejs` command in cli. You can check it with the version and help options on:
```
stagejs -V
stagejs -h, --help
```


Usage
-----
###Check environment
```
stagejs env
```
Pay attention to the result of this command, you might need to install additional programs required by the dev toolset.

###Initialize new project
```
stagejs init
```
This will download the latest Stage.js starter kit for you and prepare the development environment.

**Trouble Shoot A**: If somehow `bower install` or `npm install` fails during the init process, you can go to the `/implementation` (bower) and `/tools` (npm) folder to run them yourself. (e.g npm needs sudo, or bower got some lock/racing condition or network connection problem...)

**Trouble Shoot B**: If the init cmd report something like this:
```
...
npm ERR! code EACCES
...
```
There is a high chance that you've installed your Node.js using the root user. This is a bad way of having Node.js on your development machine (you can do this on a production server though). It is highly recommended that you install Node.js through [*NVM*](https://github.com/creationix/nvm), else, you will need to type `sudo npm install` every time instead of `npm install` and the `stagejs init`, `stagejs update` command will not work for you during the `npm` involved steps. 

**Uninstall** your Node.js and use *NVM* instead if you are having the npm permission problem. Don't forget to set your **default** `node` version after installing specific Node.js version through `nvm`.

**Last resort**: Use this one if you've removed Node.js and using `npm` through NVM installed node instances
```
sudo chown -R `whoami` ~/.npm
```
This should clear the permission issue once-n-for-all.

**Trouble Shoot C**: if the init cmd report something like this:
```
...
gyp ERR! ...
npm WARN optional dep failed, continuing canvas@x.x.x
```
You can safely ignore these kind of warning messages during `stagejs init`.

###Create main
```
stagejs create main
```
This will create a new `main.js` from our suggested code template.

###Create contexts
```
stagejs create --fileonly context <name>
```
This will create an empty context script and its mockup template.

###Create views
```
stagejs create --fileonly view <your view name in dotted notation>
```
This is to create an empty named view script and its mockup template. e.g `a.b.c` means to create both `js/a/b/c.js` and `static/template/a/b/c.html`.

###Create editors & validators
```
stagejs create --fileonly editor <name>
stagejs create validator <name>
```
Editors will also have their mockup template created.

###Create widgets & plugins
```
stagejs create --fileonly widget <name>
stagejs create plugin <name>
```
Widgets will also have their mockup template created as.


###Create/Refresh theme
(You can also update existing theme with this cmd)
```
//create, refresh
stagejs theme <your theme name>

//list available themes currently in your project.
stagejs theme ls 
```
This will create a new theme for you to develop with, which extends from the *default* theme package. If the theme already exists, it will refresh it. (With css-sprite generation included)

**Note**: Refresh a theme will not copy the original *default* theme package over again, so if you want to keep that part updated as well you will have to do it manually.

**Tip**: use `-h` to see more options with this command.


###Manage 3rd-party libraries
If you want to use 3rd-party libraries not bundled with the framework distribution, you can use the `stagejs lib` command: 
```
//update, install/uninstall and other normal `bower` commands.
stagejs lib update [lib, ...]
stagejs lib install [lib, ...]
stagejs lib uninstall <lib, ...>
stagejs lib ls

//use, unuse a lib in your project
stagejs lib use <lib> [js file]
stagejs lib unuse <lib>

```
Without the `use`, `unuse` sub-commands the `lib` command works just like the `bower` cli.

The `use`, `unuse` will manipulate the `.html` file pointed by the `-i, --index` option, adding/removing 3rd-party library files to the `<script>` tags.

**Tip**: `stagejs lib use <lib> [js file]` will automatically consult the library's `bower.json` metadata to figure out which javascript is the main one and use that for you. If the command replies with that it can't find the main javascript then you can specify the relative path of the javascript you want in the library through the 2nd parameter.


###Update project
```
stagejs update [-e, --edge]
```
This will update `bower.json` and then maintain the bower managed packages (it will do the same to npm packages). It will also update the *default* theme package and tools. If you put `--edge` option into the command, it will also fetch and replace `stage.js`, `stage.min.js` and `dependencies.min.js` with the latest edge build from the Stage.js project repository.

By default, the `update` command will only install missing libraries & packages indicated by the updated `bower.json` and `package.json`. (Yes if the version number of a package changes, the install process will update it)

###Build project
(single config file - dist.js, doesn't require app server to be running)
```
stagejs build [--dist <path to your deploy folder>] [--config <config name>]
```
This will build your project into production ready package, including js combine/minification, folder merge/creation and file copying.

**Limitation**: The build command requires a config file to present (defaults on `tools/build/config.dist.js`) and the build process will not refresh your project themes, so make sure you've done that before invoking build.

**Tip**: use `-h` to see more options with this command.


###Start dev app server
(single config/setup file - profile.js)
```
stagejs serve [--port <port number>] [--profile <profile name>]
//or
stagejs serve [port]
```
This will start the development server for you. It includes CORS, HTTP(s) Request Forwarding, WebSocket, Background Tasks, RESTful API and DB/Store. It also includes code change monitors for you to easily watch `*.less` theme file and `*.html` template file changes. Config to this server will be read in from its profile, you can enable/disable its features there and add more customized stuff if needs be.

**Limitation**: There is no group/role based authorization yet, only ACL based authentication atm.

###Create routes
(+RESTful APIs based on Expressjs4)
```
stagejs create router <your router name in dotted notation>
```

###Create middlewares
```
stagejs create middleware <name>
```

**Limitation**: It requires more effort than just creating a middleware definition file from this command. Given that the sequence of middleware loading does affect your application, and some of the middleware requires additional configure to setup, you will have to manually edit the middleware stack in the server profile before your new middleware can take effect in the app server.

###Create tasks (TBI)
```
stagejs create task <your task name>
```
This will create an empty background task definiton stub for you.

###Export project code
```
stagejs export
```
This will package your project into `exported.tar.gz` according to `tools/build/config.export.js`.

###Import project code
```
stagejs import [exported package file] [-o, --override]
```
This will copy the content of wanted code package over to your current project. Use the `-o or --override` flag to force overriding existing files during the import process.


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


Contribute
----------
Clone the project:
```
git clone https://github.com/bluekvirus/Stage-devtools.git
```
Create your own patch/contrib branch:
```
git checkout -b <your patch/contrib branch name>
```
Install node packages required for development:
```
npm install
```
Add or modify commands in `/cmd` folder and have them tested through:
```
touch [Stage-devtools folder]/cmd/[cmd].js
node [Stage-devtools folder]/cli.js [cmd]
```
So, a commmand named `abc.js` under `/cmd` can be invoked like this:
```
node [Stage-devtools folder]/cli.js abc [rest of the arguments]
```

For a minimum new command implementation consult `/cmd/env.js` or `/cmd/init.js`.

###Live Tests
```
mkdir TestProject
cd TestProject
node [Stage-devtools folder]/cli.js [cmd] <arguments>
```

For example, if your development folder is like this,

* /Stage-devtools
* /TestProject

Then the live test line above becomes
```
cd TestProject
node ../Stage-devtools/cli.js [cmd] <arguments>
```
Make sure you test the commands in the `/TestProject` before committing your changes. 

You will need to add an issue then make a pull-request to submit your modifications.


Distribute
----------
(You do NOT need to do this if contributing, I'll take care of this after getting the pull requests)

Update `README.md`(optional), `CHANGELOG.md` and `package.json` before releasing new versions through `npm publish`.


License
-------
Copyright 2014 - 2016 Tim Lauv. 
Under the [MIT](http://opensource.org/licenses/MIT) License.

