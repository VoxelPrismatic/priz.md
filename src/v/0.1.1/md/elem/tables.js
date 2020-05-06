/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function styleTables() {
    for(var table of find(">table")) {
        for(var tbody of table.children) {
            for(var tr of tbody.children) {
                var ti = tr.children;
                var length = Math.floor(ti.length);
                var n = 0;
                for(var td of ti) {
                    td.classList.remove("tr-l");
                    td.classList.remove("tr-r");
                    if(n < ti.length / 2) {
                        td.classList.add("tr-l");
                    } else if(n > length) {
                        td.classList.add("tr-r");
                    }
                    n += 1;
                }
            }
        }
    }
}
