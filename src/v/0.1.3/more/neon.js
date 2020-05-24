/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function border_colors__(style, color, borders) {
    borders = borders.toLowerCase();
    if(borders.includes("l"))
        style.borderLeftColor = color;
    if(borders.includes("r"))
        style.borderRightColor = color;
    if(borders.includes("t"))
        style.borderTopColor = color;
    if(borders.includes("b"))
        style.borderBottomColor = color;
}

function link_color__(color) {
    return color.replace(/[a]/gm, "c").replace(/[8]/gm, "a").replace(/[04]/gm, "8");
}

function hover_color__(color) {
    return color.replace(/[a]/gm, "e").replace(/[8]/gm, "c").replace(/[04]/gm, "a");
}

function tag_h1_h2_h3_h4_h5_h6__(style, color) {
    style.color = color;
}

function id_logo_hover__(style, color) {
    style.filter = "drop-shadow(0px 0px 5px " + color + ")";
}

function tag_a__(style, color) {
    style.color = link_color__(color);
}

function tag_a_hover__(style, color) {
    style.color = hover_color__(color);
}

function cls_tab__(style, color) {
    style.borderTopColor = color;
}

function tag_th__(style, color) {
    style.backgroundColor = color + "4";
    border_colors__(style, color, "tlr");
    style.color = color;
}

function tag_tr_nthchild_even__(style, color) {
    style.backgroundColor = color + "1";
}

function tag_tr_nthchild_odd__(style, color) {
    style.backgroundColor = color + "1";
}

function tag_td_tr__(style, color) {
    border_colors__(style, color, "lr");
}

function group_ls1__(style, color) {
    border_colors__(style, color, "tlr");
}

function cls_sect__(style, color) {
    group_ls1__(style, color);
}

function cls_collapser__(style, color) {
    color = colors["grey"][0];
    style.backgroundColor = color + "1";
    group_ls1__(style, color);
}

function cls_collapser_hover__(style, color) {
    color = colors["white"][0];
    style.backgroundColor = color + "2";
    group_ls1__(style, color);
}

function cls_collopen__(style, color) {
    color = colors["grey"][0];
    style.color = color;
    group_ls1__(style, color);
}

function cls_collopen_hover__(style, color) {
    color = colors["white"][0];
    style.color = color;
    group_ls1__(style, color);
}

function tag_line__(style, color) {
    style.borderColor = color;
    var linetmp = "0px 0px 5px " + color;
    style.boxShadow = linetmp + ", inset " + linetmp;
}

function tag_line_hover__(style, color) {
    style.borderColor = color;
    var linetmp = "0px 0px 10px " + color;
    style.boxShadow = linetmp + ", inset " + linetmp;
}

function group_ls2__(style, color) {
    border_colors__(style, color, "tlr");
    style.color = color.slice(0, 4);
    style.backgroundColor = color + "2";
}

function cls_lnk__(style, color) {
    group_ls2__(style, color);
    style.backgroundColor = "";
}

function cls_lnk_hover__(style, color) {
    color = link_color__(color);
    group_ls2__(style, color);
}

function cls_sel__(style, color) {
    color = hover_color__(color);
    group_ls2__(style, color);
}

function cls_sel_hover__(style, color) {
    group_ls2__(style, color);
}

function cls_btn__(style, color) {
    border_colors__(style, color, "tlr");
    style.color = color;
    style.backgroundColor = color + "4";
}

function cls_btn_hover__(style, color) {
    color = hover_color__(color);
    cls_btn__(style, color);
}

function id_jumper__(style, color) {
    border_colors__(style, color, "tl");
    style.color = color;
    style.boxShadow = "0px 0px 4px " + color;
}

function tag_blockquote__(style, color) {
    style.borderLeftColor = color;
}

function sel_cls_dropper_gt_tag_div__(style, color) {
    style.borderLeftColor = color;
}

function tag_codeblock__(style, color, bg) {
    bg = bg.replace(/1/gm, "0").replace(/2/gm, "1");
    if(bg.length == 4)
        bg += "6";
    else
        bg += "66";
    style.backgroundColor = bg;
    border_colors__(style, color + "2", "ltr");
}

function tag_textarea__(style, color, bg) {
    bg = bg.replace(/1/gm, "0").replace(/2/gm, "1");
    if(bg.length == 5)
        bg += "2";
    else
        bg += "22";
    style.backgroundColor = bg;
    border_colors__(style, color + "2", "ltr");
}

function cls_neon__(style, color) {
    style.borderColor = color;
    style.boxShadow = "0px 0px 5px 1px " + color;
}

function cls_neon_hover__(style, color) {
    style.boxShadow = "0px 0px 10px 1px " + color;
}


var selectors__ = {
    "h1, h2, h3, h4, h5, h6": tag_h1_h2_h3_h4_h5_h6__,
    "#logo:hover, #logo:focus": id_logo_hover__,
    "a": tag_a__,
    "a:hover, a:focus": tag_a_hover__,
    ".tab": cls_tab__,
    "th": tag_th__,
    "tr:nthchild(2n)": tag_tr_nthchild_even__,
    "tr:nthchild(2n+1)": tag_tr_nthchild_odd__,
    "td, tr": tag_td_tr__,
    ".sect": cls_sect__,
    ".collapser": cls_collapser__,
    ".collapser:hover, .collapser:focus": cls_collapser_hover__,
    ".collopen": cls_collopen__,
    ".collopen:hover, .collopen:focus": cls_collopen_hover__,
    "line": tag_line__,
    "line:hover, line:focus": tag_line_hover__,
    ".lnk:hover, .lnk:focus": cls_lnk_hover__,
    ".sel": cls_sel__,
    ".sel:hover, .sel:focus": cls_sel_hover__,
    ".lnk": cls_lnk__,
    ".btn": cls_btn__,
    ".btn:hover, .btn:focus": cls_btn_hover__,
    "#jumper": id_jumper__,
    "blockquote": tag_blockquote__,
    ".dropper > div": sel_cls_dropper_gt_tag_div__,
    "codeblock": tag_codeblock__,
    "codeline": tag_codeblock__,
    "textarea": tag_textarea__,
    ".neon": cls_neon__,
    ".neon:hover, .neon:focus": cls_neon_hover__
}

try {
    getRules();
} catch(err) {
    function getRules() {
        for(var ruleset of document.styleSheets)
            if(ruleset.ownerNode.id == "priz_neon_css")
                return ruleset.cssRules;
    }
}
try {
    swapColor;
} catch(err) {
    function swapColor(color, bg) {
        var rules = getRules();
        if(rules) {
            for(var rule of rules) {
                let txt = rule.selectorText;
                if(txt && selectors__[txt])
                    selectors__[txt](rule.style, color, bg);
            }
            setTransitions();
        }
    }
}

function setTransitions() {
    var rules = getRules();
    var stuffs = [];
    if(!rules)
        return;
    for(var rule of rules) {
        var txt = rule.selectorText;
        if(txt && (txt.includes("hover") || txt.includes("focus"))) {
            if(txt.includes(".sect"))
                rule.style.transition = "none !important";
            else
                stuffs.push(txt.split(":")[0]);
        }
    }
    for(var rule of rules) {
        var txt = rule.selectorText;
        if(txt  && !(txt.includes("hover") || txt.includes("focus"))) {
            var incl = false;
            for(var stuff of stuffs) {
                if(txt.includes(stuff)) {
                    rule.style.transition = "all ease 1s";
                    incl = true;
                    break;
                }
            } if(!incl)
            rule.style.transition = "none";
        }
    }
    for(var css of [".sect", ".dict"])
        for(var elem of find(css))
            elem.style.transition = "none";
}
