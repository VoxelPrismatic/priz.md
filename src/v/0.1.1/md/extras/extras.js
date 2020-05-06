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
    function sub_styles() {
        console.groupCollapsed("Reformatting page");
        if(find(">table")) {
            console.log("Styling tables")
            var styleTables = styleTables || undefined;
            logFunc(styleTables);
        } if(find(".accent")) {
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
