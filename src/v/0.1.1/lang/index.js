/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var mark_syntax_py__ = mark_syntax_py__ || undefined;
var mark_syntax_js__ = mark_syntax_js__ || undefined;
var mark_syntax_java__ = mark_syntax_java__ || undefined;
var mark_syntax_html__ = mark_syntax_html__ || undefined;
var mark_syntax_css__ = mark_syntax_css__ || undefined;
var mark_syntax_c__ = mark_syntax_c__ || undefined;
var mark_syntax_bash__ = mark_syntax_bash__ || undefined;
var mark_syntax_kotlin__ = mark_syntax_kotlin__ || undefined;

var syntax_alias__ = {
    "py": mark_syntax_py__,
    "py2": "py",
    "py3": "py",
    "python": "py",
    "python2": "py",
    "python3": "py",

    "js": mark_syntax_js__,
    "javascript": "js",
    "node": "js",
    "nodejs": "js",
    "ecma": "js",
    "ecmascript": "js",

    "java": mark_syntax_java__,
    "jvm": "java",
    "jre": "java",

    "html": mark_syntax_html__,
    "htm": "html",
    "html4": "html",
    "html5": "html",
    "xml": "html",
    "khtml": "html",
    "xhtml": "html",

    "css": mark_syntax_css__,
    "css3": "css",
    "lesscss": "css",
    "less": "css",
    "scss": "css",

    "c": mark_syntax_c__,
    "cpp": "c",
    "c++": "c",
    "obj-c": "c",
    "objective-c": "c",
    "c#": "c",
    "cs": "c",
    "c-sharp": "c",
    "arduino": "c",

    "bash": mark_syntax_bash__,

    "kotlin": mark_syntax_kotlin__,
    "kot": "kotlin",
    "kt": "kotlin",
};

function redefine_aliases__() {
    syntax_alias__["py"] = mark_syntax_py__;
    syntax_alias__["js"] = mark_syntax_js__;
    syntax_alias__["java"] = mark_syntax_java__;
    syntax_alias__["html"] = mark_syntax_html__;
    syntax_alias__["css"] = mark_syntax_css__;
    syntax_alias__["c"] = mark_syntax_c__;
    syntax_alias__["bash"] = mark_syntax_bash__;
}
