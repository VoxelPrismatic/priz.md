/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function mk_ul__(st, thing = "ul") {
    var str = `<${thing}>`;
    st = mark_page(st);
    for(var line of st.split("<br>")) {
        if(line) {
            if(line.startsWith("<ul>") || line.startsWith("<ol>")) {
                str = str.slice(0, -5);
                str += line + "</li>";
            } else {
                str += `<li>` + line + "</li>";
            }
        }
    }
    return str + `</${thing}><br>`;
}
