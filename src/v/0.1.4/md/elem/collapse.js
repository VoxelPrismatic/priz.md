/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

function collsel(elem = find("list")) {
    var ch = elem.children;
    var itm = null;
    for(var c of ch) {
        if(c.className.includes("collhover"))
            itm = null;
        var tmp = collsel(c);
        if(tmp != null)
            return itm
    }
    return itm;
}

function setcoll(elem) {
    colldesel();
    if(!elem.className.includes("collopen") && elem.className.includes("collapser")) {
        var child = elem.children;
        for(var c of child) {
            if(c.style.display == "block" && !c.className.includes("invis")) {
                collapser(elem);
                break;
            }
        }
    }
}

function setjump(elem) {
    colldesel(find("sect"));
    if(!elem.className.includes("collopen") && elem.className.includes("collapser")) {
        var child = elem.children;
        for(var c of child) {
            if(c.style.display == "block" && !c.className.includes("invis")) {
                collapser(elem);
                break;
            }
        }
    }
}

function colldesel(elem = find("list")) {
    var ch = elem.children;
    for(var c of ch) {
        if(c.className.includes("collhover"))
            collapser(c, true);
        colldesel(c);
    }
}

var timeout = false;

function collapser(elem, force = false, param = null) {
    if(param) {
        window.history.replaceState(null, "/", param);
    }
    if(globalThis.timeout && !force)
        return;
    globalThis.timeout = true;
    window.setTimeout(function() {globalThis.timeout = false;}, 500);
    //Set timeout so multiple collapses cannot run at the same time
    if(elem.className.includes("lnk")) {
        for(var cat of find("list").children)
            for(var lnk of cat.children)
                if(lnk.className.includes("sel"))
                   lnk.classList.remove("sel");
        elem.classList.add("sel");
        setHtml("com_help", findHtml(elem.id.slice(4)));
        return;
    }
    if(elem == undefined || elem == null)
        return;
    var disp = true;
    var name = "collapser collopen";
    if(elem.className.includes("collopen")) {
        disp = false;
        name = "collapser";
    }
    var thing = elem.children;
    for(var child of thing) {
        if(child.tagName != "DIV")
            continue;
        if(disp && !child.className.includes("invis"))
            child.style.display = "block";
        else
            child.style.display = "none";
    }
    elem.className = name;
}

function collall(parent = find("list"), sub = false) {
    var child = parent.children;
    for(var c of child) {
        c.classList.remove("invis");
        if(c.className.includes("collapser")) {
            collall(c, true);
            c.classList.remove("collopen");
        }
        if(sub)
            c.style.display = "none";
    }
}
