Change Log
==========
0.3.2+ (2017-03-23*)
------------------
1. Refined view/context code template;
2. Refined default html template;
3. Refined main html template;

working on...
* Add channel.js to js template for create cmd;
* Add a default build'n'theme cmd implementation to use without starter-kit;
* [optional]Link resize sub-cmd to `stagejs theme`;
* [optional]Add iconfont sub-cmd to `stagejs theme`;
* [optional]Add code tpl for background tasks in the create cmd;


0.3.1 (2016-03-30)
-------------------
1. Refined create cmd templates;
2. Refined cmd prompt help messages;


0.3.0 (2015-12-01)
-------------------
1. Added postgresql and rabbitmq checking in env cmd's optional listing;
2. init cmd now depends on env cmd's required listing;
3. Refined missing cmd-line (env required) help message;
4. Added cli help message when cmd is wrong;
5. Added -n option to create cmd; (skip adding to index.html);
6. update cmd now replaces bower/package.json keys other than `dependencies`; 


0.2.3 (2015-11-19)
------------------
1. Refined main.js template; (+config comments, -app.run)
2. Refined router template;
3. Refined editor/widget templates;
4. Refined view template;
5. create cmd will now always put js before the last `<script>` tag;


0.2.2 (2015-08-21)
------------------
1. Refined code templates for view & context;
2. Refined name-to-path mapping in the create cmd (to support 1.8 view injection);


0.2.1 (2014-11-09)
-------------------
1. `lib` cmd now stops completely after falling back to `bower`;
2. removed `-p` option from the `update` cmd; 


0.2.0 (2014-11-09)
--------------------
1. Added the `lib` command with fallback ability to `bower`;
2. Added the `lib` command with `use/unuse` sub-cmd;
3. Initially planned features completed;


0.1.13 (2014-10-28)
--------------------
1. Updated code templates for the `create` cmd;
2. Refined `create` cmd to support js-index.html auto linking for created js files in addition to js-tpl auto-ref;
3. Fixed the `-d, --dry` dry run option in the `create` cmd;
4. Added `-v, --verbose` option for outputing metadata along the process;


0.1.12 (2014-10-28)
--------------------
1. The `create` cmd now uses dynamic templates for name and auto-ref (both js and related html);


0.1.11 (2014-09-07)
--------------------
1. Refined router and middleware code tpl;
2. Added nodemon into env required listing;
3. Fixed bug in the import cmd (cp routines);


0.1.10 (2014-09-02)
-------------------
1. Fixed auto-reload issue with the serve cmd (+ -a, --autoreload option);
2. Refined main code tpl in the create cmd;


0.1.9 (2014-09-01)
------------------
1. Fixed middlewares copying (none-forced) in the update cmd.
2. Change git to required in the env cmd. (for bower to work properly)
3. Fixed main.js code tpl and target to the create cmd.
4. Refined context code tpl.
5. Fixed port arg short-cut in the serve cmd.
6. Fixed template creation routine/log in the create cmd.


0.1.8 (2014-08-30)
-------------------
1. Reduced error detection in the `init` cmd.
2. Refined middleware, router code templates.


0.1.7 (2014-08-29)
------------------
1. Refined build cmd output relative path;
2. Refined env cmd, +more info;
3. Refined cmd mount script(cli.js), +help & newlines;
4. Refined init cmd, +git support, +error detection;
5. Fixed export command; (linked with build + config.export.js)
6. Fixed import command;
7. Fixed create command;


0.1.6 (2014-08-22)
------------------
1. Fixed theme command;
2. Fixed build command;
3. Fixed serve command;


0.1.5 (2014-08-20)
------------------
1. Refined env and init command;
2. Fixed update command;
3. Fixed bin setting in package.json;


0.1.1 (2014-08-18)
------------------
1. Fixed env command;
2. Fixed init command;


0.1.0 (2014-08-18)
------------------
Init.
