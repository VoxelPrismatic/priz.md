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
    var id = st.split("\n")[0].slice(3, -3);
    var heading = mk_head__(id, id.split(" ").slice(1).join(" "), false);
    var thing = heading.slice(-5);
    heading = heading.slice(0, -5);
    heading += "<span class='h-dropper h-dropper-closed' onclick='toggleDrop(this)'>[V]</span>";
    heading += thing;
    id = "DROP_" + heading.split("id=")[1].split(">")[0].slice(1, -1);
    str += `<div id=${id} class="dropper dropper-closed">`;
    str += heading + "<div>" + mark_page(st.split("\n").slice(1).join("\n"));
    str += "</div></div>";
    return str;
}
