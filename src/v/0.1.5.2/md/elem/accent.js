/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function style_accents() {
    for(var acc of find(">accent")) {
        var char = acc.previousElementSibling;
        char.style.display = "inline-block";
        var accent = acc.getAttribute("accent-text");
        var custom = acc.getAttribute("accent-custom") == "true";
        var style = acc.style;
        style.transition = "none";
        if(custom) {
            if(accent.startsWith(">")) {
                style.textAlign = "right";
                accent = accent.slice(1);
            } else if(accent.startsWith("<")) {
                style.textAlign = "left";
                accent = accent.slice(1);
            } if(accent.startsWith("+")) {
                accent = accent.slice(1).trim();
                style.verticalAlign = "top";
                var top = -14;
                if(!"ABCDEFGHIJKLMNOPQRSTUVWXYZbdfhklt".includes(char.innerHTML))
                    top += 4;
                if("^`*'\"".includes(accent))
                    top += 6;
                else if("-~=+".includes(accent))
                    top += 4;
                else
                    top += 2;
                style.top = top + "px";
            } else if(accent.startsWith("-")) {
                accent = accent.slice(1).trim();
                style.verticalAlign = "baseline";
                style.top = "";
            }
            acc.innerHTML = accent;
            style.left = (-char.clientWidth) + "px";
            style.marginRight = style.left;
            style.width = style.left.slice(1);
            style.fontSize = "small";
        } else {
            var ok_accents = [
                "\u0300",
                "\u0301",
                "\u0302",
                "\u030c",
                "\u0303",
                "\u0322",
                "\u0321",
                "\u0327",
                "\u0309"
            ];
            if(!ok_accents.includes(acc.innerHTML))
                style.left = (-char.clientWidth / 2) + "px";
            else
                style.left = "";
            if("ABCDEFGHIJKLMNOPQRSTUVWXYZbdfhklt".includes(char.innerHTML))
                style.top = "-4px";
        }
    }
}
