Setup your web development environment
======================================
@version 1.0.1
@author Tim Liu (zhiyuanliu@fortinet.com)

A [Virtual Machine](https://github.com/bluekvirus/vm-webdev) has been prepared for you to ease the initial setup of your development environment.


Operating System
----------------
It is suggested that you install the latest Unbuntu* or Linux distribution or to use a Windows 7+.

Whenever we do programming, it will be based on a computer system. Most of the time, by saying computer system, we are referring to the generalized operating system that controls the underlying computing system while bridging all the gaps between different hardwares. So always choose your OS before you start programming.

For web programming, your choices will only affect the server side, since the client side will be rendered by the user browsers. The Web APIs you use in JavaScript will be bridged by some general libraries like [jQuery](http://api.jquery.com/) (for DOM APIs) and [others](https://developer.mozilla.org/en-US/docs/WebAPI) on different browsers.

*14.04 LTS at the time of writing this doc.


Node.js
-------
Please install v0.10.30+ [latest stable](http://nodejs.org/download/)

If you are on an Unbuntu or Linux distribution, you can [use your package manager to install node](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

It is highly recommended that you install Node.js through [*NVM*](https://github.com/creationix/nvm) on your development machine, else, you will need to type `sudo npm install` every time instead of `npm install` and the `stagejs init`, `stagejs update` command will not work for you during the `npm` involved steps.

**Tip**: Use the following `nvm` cmd to set your default Node.js version
```
nvm alias default 0.10
```

###Global npm packages
You will need some packages to be installed through `npm` globally:
```
[sudo] npm -g install <your package name>
```
List of npm packages:

0. forever
1. http-server
2. stage-devtools


Git
---
You will need git 1.9.1+ on your operating system. Install it from [Git](http://git-scm.com/) or from your package manager in Linux.

You will need to setup your git account on your local machine before committing changes to your repos:
```
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```


GraphicsMagick
--------------
This is used for processing images like icons, logos, textures and pictures to be used in your web applications. Our [stage-devtools](https://github.com/bluekvirus/Stage-devtools) use it to create css-sprite for your themes automatically.

You can install it from here: [GraphicsMagick](http://www.graphicsmagick.org/)


Code editor
-----------
You don't need an IDE, or at least for web development, just download and install [Sublime Text](http://www.sublimetext.com/3) 2 or 3, the latest the better.

###Plugins
You need to install plugins to ease the development process while using Sublime Text. Simply go to the following website to install the package manager for Sublime Text:

[Package Control](https://sublime.wbond.net/installation)

List of plugins you need:

1. Emmet
2. DocBlockr
3. HTML-CSS-JS Prettify
4. LESS
5. Markdown Editing
6. Sublime Linter
7. Sublime Linter - jshint*
8. SideBarEnhancements

*You will need to install jshint on your system with node.js:
```
[sudo] npm -g install jshint 
```


Browsers
--------
You should install the following browsers before you move on:
FireFox
Chrome
IE10+ (optional)

See browser specific features and API compatibilities on [Can I use \_\_\_ ?](http://caniuse.com/)


Appendix A
----------
These optional components are included in the [Virtual Machine](https://github.com/bluekvirus/vm-webdev) metioned earlier in the document.

###Optional programs
1. MongoDB
2. PostgreSQL
3. Redis
4. RabbitMQ
5. Nginx
6. [ElasticSearch]


###Optional programming languages
1. Python 2/3*
2. C/Go

*You will probably need Python 2 at least for some of the npm packages. For server side data-services implementation (e.g RESTful services), if somehow you do not want to use Node.js, we recommend Python 3. 

**Tip**: Use the *proxy* settings in the *devserver* profile to forward API requests to other backend application server implementation (Python/C or even Java) of your choice.  

Stay away from *pure* OOP like Java/C++ when implementing backends, these languages complicate the picture when used in modern web development, and increase your maintenance cost. OOP (is-a, has-a programming) is for Actor based applications (a Game Engine, a Web Browser, a Desktop Environment...etc) that usually need to be built from scratch with the same good attributes reused again and again down in the inheritance chain (e.g EventEmitter -> Clickables -> Buttons, or EventEmitter -> Agent -> Character). If you consider building data-services and daemons in an full OOP way, you are only clouding the problem. Why?

>Remember, abstractions should simplify the real world instead of resembling it, keeping track of everything using Classes with hierarchies in addition to Objects and Interfaces will simply give you another dimension of bookkeeping. It is helpful to see reusable objects and their blueprints being managed separately, but when everything gets defined once and only used once, or in the worse case the Classes become just names with no reusable methods at all, the OO layer becomes an mental burden. Anything distracts you from the solving the core problem is bad.

Four most important objects for implementing web services would be *Router*, *Middlewares/Filters*, *Models* and *Tasks*. Whether or not should they be implemented using Classes is entirely up to you. But be warned, the server side is more about the request processing pipeline, taps/filters and metadata/config managers than a heap of contracts that contains nothing but the ability to override themselves. When strict blueprints are far less useful than the actual objects, pure OOP fails. This is when you realize how Javascript and Python wins.

Appendix B
----------
###Optional cloud utilities
0. Github
1. [Circle.ci](https://circleci.com/)
2. [Waffle.io](https://waffle.io/)
3. [Kanban Flow](https://waffle.io/)
