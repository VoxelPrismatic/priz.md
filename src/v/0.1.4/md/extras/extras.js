/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function compSty(elem) {
    try {
        return window.getComputedStyle(elem);
    } catch(err) {
        try {
            return window.getComputedStyle(find(elem));
        } catch(err) {
            return window.getComputedStyle(find(elem)[0]);
        }
    }
}

try {
    sub_styles();
} catch(err) {
    function sub_styles(all = true) {
        console.groupCollapsed("Reformatting page");
        if(all && find(".accent")) {
            console.log("Moving accents")
            var style_accents = style_accents || undefined;
            logFunc(style_accents);
        } if(find(".dict")) {
            var resizeDicts = resizeDicts || undefined;
            logFunc(resizeDicts);
        }
        console.groupEnd("Reformatting page");
    }
}

try {
    updateSpacer();
} catch(err) {
    function updateSpacer() {
        // Not needed for external sources
    }
}

function regex(st, id) {
    st = st.trim();
    find(id).style.color = "#ffffff";
    if(st == "")
        return 1;
    if(st.endsWith("/") && st.startsWith("/")) {
        try {
            find(id).style.color = "#00ffff";
            return RegExp(st.slice(1, -1), "gm");
        } catch(err) {
            find(id).style.color = "#ff0000";
            return 1;
        }
    }
    var re = "(";
    for(var ch of st) {
        var lc = ch.toLowerCase().charCodeAt(0).toString(16);
        var uc = ch.toUpperCase().charCodeAt(0).toString(16);
        lc = lc.padStart(4, "0");
        uc = uc.padStart(4, "0");
        re += `[\\u${lc}\\u${uc}\\u200b\\\\]`; // Escape chars
    }
    re += ")";
    return RegExp(re, "gm");
}
