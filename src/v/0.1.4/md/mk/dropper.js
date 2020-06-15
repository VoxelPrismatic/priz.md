/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function mk_dropper__(st) {
    var str = "";
    var firstline = mark(st.split("\n")[0]);
    var firsttag = ""
    if(firstline.startsWith("<"))
        firsttag = firstline.split(">")[0].split(" ")[0].slice(1);
    if(firsttag)
        firstline = firstline.slice(0, -("</" + firsttag + ">").length);
    firstline += "<span class='h-dropper h-dropper-closed' onclick='toggleDrop(this)'>[V]</span>";
    if(firsttag)
        firstline += "</" + firsttag + ">"
    str += firstline + "<div class='invis dropped'>";
    str += mark_page(st.split("\n").slice(1).join("\n")).slice(0, -4) + "</div>"
    return str;
}
