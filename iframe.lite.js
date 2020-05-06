/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var base__ = "https://voxelprismatic.github.io/priz.md/";
var iframe_md__ = true;
var lite_css__ = true;

var head__ = document.getElementById("priz_script");
var script__ = document.createElement("script");
script__.src = base__ + "priz_importer.js";
script__.type = "text/javascript";
script__.id = "priz_importer";
head__.after(script__);
