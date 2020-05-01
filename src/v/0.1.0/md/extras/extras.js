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
        console.group("Reformatting page");
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