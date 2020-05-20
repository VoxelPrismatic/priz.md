/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function mk_head__(m, p1, escape = true, cls = "") {
    if(cls == m)
        cls = "";
    if(escape + "" != "false" && escape + "" != "true")
        escape = true;
    for(var x = 0; x < 6; x += 1)
        if(m[x] != "#")
            break;
    var id_ = p1.replace(/ /gm, "-").replace(/(\\u\{.*\}|[^\w\d-])/gm, "").trim();
    var st = `<h${x} onclick="linkMe(this);"`;
    var thing = "\\u{23}";
    if(!escape) {
        thing = "#";
        p1 = mark(p1)
    }
    if(cls)
        st += ` class="${cls}"`;
    st += ` id="${id_}">${thing}] ${p1}</h${x}>`;
    return st;
}
