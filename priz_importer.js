var base__ = "https://voxelprismatic.github.io/priz.md/out/";
var head__ = document.getElementById("priz_importer");
var meta__ = document.getElementById("priz_syntax");
if(iframe_md__ && !meta) {
    var script__ = document.createElement("iframe");
    script__.src = base__.slice(0, -4);
    script__.id = "prizmd";
    var markdown_content = "";
    function mark_page(st) {
        var priz_md = document.getElementById("prizmd");
        priz_md.contentWindow.postMessage(st, "*");
        markdown_content = "";
        return new Promise(resolve => {
            window.setTimeout(() => {resolve(markdown_content)}, 25);
        });
    }

    function recieve_markdown(evt) {
        if(evt.origin = "https://voxelprismatic.github.io") {
            markdown_content = evt.data;
        }
    }

    window.addEventListener("message", recieve_markdown, false);
} else {
    var script__ = document.createElement("script");
    script__.src = base__ + "md.min.js";
    script__.type = "text/javascript";
    script__.onload = function() {
        window.onresize = sub_styles();
    }
}
head__.after(script__);
var css__ = document.createElement("link");
css__.rel = "stylesheet";
css__.type = "text/css";
if(lite_css__)
    css__.href = base__ + "style.lite.min.css";
else
    css__.href = base__ + "style.min.css";
head__.after(css__);
if(meta__) {
    var css__ = document.createElement("link");
    css__.rel = "stylesheet";
    css__.type = "text/css";
    css__.href = base__ + "syntax.min.css";
    head__.after(css__);
    var ct__ = meta__.content;
    if(ct__.includes("html")) {
        if(!ct__.includes("js")) {
            ct__ += ",js";
        }
        if(!ct__.includes("css")) {
            ct__ += ",css";
        }
    }
    meta__.content = "index," + ct__ + ",base";
    var scripts__ = [];
    for(var thing of meta__.content.split(",")) {
        if(thing) {
            var script__ = document.createElement("script");
            script__.id = thing + ".min.js";
            script__.onload = function() {head__.after(scripts__.pop())};
            script__.onerror = script__.onload;
            script__.src = base__ + "lang/" + thing + "-lang.min.js";
            script__.type = "text/javascript";
            scripts__.push(script__);
        }
    }
    head__.after(scripts__.pop())
}
delete css__;
delete script__;
delete base__;
delete iframe_md__;
delete lite_css__;
