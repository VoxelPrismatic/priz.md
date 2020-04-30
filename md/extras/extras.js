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

function sub_styles() {
    if(find(">table")) {
        styleTables();
    }
    if(find(".accent")) {
        style_accents();
    }
    if(find(".dict")) {
        resizeDicts();
    }
}

try {
    updateSpacer();
} catch(err) {
    function updateSpacer() {
        // Not needed for external sources
    }
}
