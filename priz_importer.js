/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var base__ = base__.replace(/priz.md(-dev)?\//, "priz.md$1/out/"); // Works for the dev repo, and versions
var head__ = document.getElementById("priz_importer");
var meta__ = document.getElementById("priz_syntax");
if(iframe_md__ && !meta__) {
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
        console.log("Ready to interpret markdown");
        window.onresize = function() {sub_styles(false)};
        try {
            startLoading();
        } catch(err) {
            // No auto function
        }
    }
}
head__.after(script__);
var css__ = document.createElement("link");
css__.rel = "stylesheet";
css__.type = "text/css";
if(lite_css__)
    css__.href = base__ + "style.lite.min.css";
else {
    css__.id = "priz_neon_css"
    css__.href = base__ + "style.min.css";
    var script__ = document.createElement("script");
    script__.src = base__ + "more/neon.min.js";
    script__.id = "priz_neon_js";
    script__.type = "text/javascript";
    head__.after(script__);
}
head__.after(css__);
if(meta__) {
    var script__ = document.createElement("script");
    script__.src = base__.replace(/out\/.*/gm, "") + "priz_syntaxer.js";
    script__.id = "priz_syntaxer";
    script__.type = "text/javascript";
    head__.after(script__);
    script__.onload = function() {
        load_regex__(document.getElementById("priz_syntaxer"));
    }
}
delete css__;
delete script__;
delete iframe_md__;
delete lite_css__;
