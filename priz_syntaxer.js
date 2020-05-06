/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var elem__ = null;
var scripts__ = [];

function load_regex__(elem) {
    elem__ = elem;
    var css__ = document.createElement("link");
    css__.rel = "stylesheet";
    css__.type = "text/css";
    css__.href = base__ + "syntax.min.css";
    elem__.after(css__);
    var ct__ = meta__.content;
    if(ct__.includes("html")) {
        if(!ct__.includes("js"))
            ct__ += ",js";
        if(!ct__.includes("css"))
            ct__ += ",css";
    }
    meta__.content = "index," + ct__ + ",base";
    for(var thing of meta__.content.split(",")) {
        if(thing) {
            var script__ = document.createElement("script");
            script__.id = thing + ".min.js";
            script__.onload = function() {elem__.after(scripts__.pop())};
            script__.onerror = script__.onload;
            script__.src = base__ + "lang/" + thing + "-lang.min.js";
            script__.type = "text/javascript";
            scripts__.push(script__);
        }
    }
    elem__.after(scripts__.pop());
}

load_regex__(document.getElementById("priz_syntaxer"));
