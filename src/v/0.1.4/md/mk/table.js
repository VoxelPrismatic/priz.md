/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function mk_table__(st) {
    var table_lines = -1;
    var table_aligns = [];
    var table_str = [];
    var str = "";
    for(var line of st.split("\n")) {
        if(line != "" && line.replace(/^(\|.+)+\|$/gm, "") == "") {
            table_lines += 1
            table_str.push([]);
            if(table_lines == 0) {
                for(var header of line.split("|").slice(1, -1)) {
                    header = trim(header);
                    if(header.startsWith(":") && header.endsWith(":")) {
                        table_str[0].push(trim(header.slice(1, -1)));
                        table_aligns.push("center");
                    } else if(header.startsWith(":")) {
                        table_str[0].push(trim(header.slice(1)));
                        table_aligns.push("left");
                    } else if(header.endsWith(":")) {
                        table_str[0].push(trim(header.slice(0, -1)));
                        table_aligns.push("right");
                    } else {
                        table_str[0].push(trim(header));
                        table_aligns.push("left");
                    }
                }
            } else {
                for(var cell of line.split("|").slice(1, -1)) {
                    table_str.slice(-1)[0].push(trim(cell));
                }
                var max_len = 0;
                for(var row of table_str)
                    if(row.length > max_len)
                        max_len = row.length;
                for(var r = 0; r < table_str.length; r++)
                    while(table_str[r].length < max_len) {
                        table_str[r].push("");
                        if(r == 0)
                            table_aligns.push("left");
                    }
            }
            continue;
        }
    }
    var row_num = -1;
    str += "<table>";
    for(var row of table_str) {
        row_num += 1;
        str += "<tr>";
        var col_num = -1;
        var thresh = Math.floor(row.length / 2)
        for(var col of row) {
            col_num += 1;
            attr = `style="text-align: ${table_aligns[col_num]}"`
            var tag = "td";
            if(row_num == 0)
                tag = "th";
            if(row.length % 2 && col_num == thresh)
                attr += ` class="tr-c"`;
            else if(col_num < thresh)
                attr += ` class="tr-l"`;
            else if(col_num > thresh)
                attr += ` class="tr-r"`;
            else
                attr += ` class="tr-c"`;
            str += `<${tag} ${attr}>${mark_page(col)}</${tag}>`;
        }
        str += "</tr>";
    }
    str += "</table>";
    return str.replace(/<br><\/t(d|h)>/gm, "</t$1>");
}
