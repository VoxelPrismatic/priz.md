function mark(st) {
    for(var r of line_regex__) {
        if(typeof r[1] == "string" && !(r[1].startsWith("\\u")))
            st = st.replace(r[0], r[1]);
        else
            st = st.replace(r[0], r[1]);
    }
    return st;
}

function sleep(ms) {
    var endTime = Date.now() + ms;
    while(endTime > Date.now()) {
        // Sleep
    }
}

function load_script(src) {
    globalThis.src__ = src;
    console.groupCollapsed("Dynamic load");
    console.info(`Dynamically loading '${src__}'`);
    fetch(src).then(
        resp => resp.text().then(
            code => {
                globalThis.eval(code);
                console.info(`Finished loading '${src__}'`);
            }
        )
    );
    sleep(25);
    console.groupEnd("Dynamic load");
}

function mark_page(st) {
    if(!line_regex__[0])
        set_regex__();
    if(!(st.endsWith("\n")))
       st += "\n";
    st = st.replace(/\\ *\n/gm, "");

    var str = "";
    var py = "";
    var table = "";
    var ol = "";
    var ul = "";
    var al = "";
    var quoted = "";
    var dropper = "";
    var syntax = "";
    var code = "";
    var incode = false;
    var indropper = false;
    var intable = false;

    for(var line of st.split("\n")) {
        // Collapsible section
        if(!incode && line && line.replace(/^\>\>\[.*\]\<\<$/gm, "") == "")
            indropper = true;
        if(!incode && line == "---" && indropper) {
            indropper = false;
            str += mk_dropper__(dropper.slice(0, -1));
            dropper = "";
            continue;
        }
        if(indropper) {
            dropper += line + "\n";
            continue;
        }

        // Code block
        if(line.match(/^\`\`\`(\w+)?/gm)) {
            incode = !incode;
            if(incode) {
                syntax = line.slice(3).trim();
            } else {
                str += `<div class="code">`;
                if(syntax) {
                    try {
                        try {
                            var fn = syntax_alias__[syntax];
                        } catch(err) {
                            load_script(`${base__}lang/base-lang.min.js`);
                            load_script(`${base__}lang/index-lang.min.js`);
                            stylesheet__ = document.createElement("link");
                            stylesheet__.rel = "stylesheet";
                            stylesheet__.type = "text/css";
                            stylesheet__.href = base__ + "syntax.min.css";
                            document.head.append(stylesheet__);
                        } if(typeof fn == "string")
                            syntax = syntax_alias__[syntax];
                        fn = syntax_alias__[syntax];
                        if(fn == undefined) {
                            load_script(`${base__}lang/${syntax}-lang.min.js`);
                            if(syntax == "html") {
                                load_script(`${base__}lang/js-lang.min.js`);
                                load_script(`${base__}lang/css-lang.min.js`);
                            }
                            redefine_aliases__();
                            fn = syntax_alias__[syntax];
                        }
                        str += fn(code);
                    } catch(err) {
                        console.error(err);
                        str += code;
                    }
                } else {
                    str += code;
                }
                str += "</div>";
                code = "";
                syntax = "";
            }
            continue;
        }
        if(incode) {
            code += line + "\n";
            continue;
        }

        //Block Quote
        if(line.startsWith(":: ")) {
            quoted += line.slice(3) + "\n";
            continue;
        }
        if(quoted) {
            str += "<blockquote>" + mark_page(quoted.slice(0, -1)).slice(0, -4) + "</blockquote>";
            quoted = "";
        }

        //Table
        if(line && line.replace(/^(\|.+)+\|$/gm, "") == "" && !intable) {
            intable = true;
        }
        if((line == "---" || line == "" || line.replace(/^(\|.+)+\|$/gm, "") != "") && intable) {
            str += mk_table__(table).replace(/\n/gm, "<br>");
            table = "";
            intable = false;
            continue;
        }
        if(intable) {
            table += line + "\n";
            continue;
        }

        // Ordered list [Numbers]
        if(line && line.replace(/^\d+[\]\)\.\-] .*$/gm, "") == "") {
            ol += line.replace(/^\d+[\]\)\.\-] /gm, "") + "\n";
            continue;
        }
        if(ol) {
            str += mk_ol__(ol.slice(0, -1));
            ol = "";
        }


        // Ordered list [Letters]
        if(line && line.replace(/^\w+[\]\)\.\-] .*$/gm, "") == "") {
            al += line.replace(/^\w+[\]\)\.\-] /gm, "") + "\n";
            continue;
        }
        if(al) {
            str += mk_al__(al.slice(0, -1));
            al = "";
        }

        // Unordered list
        if(line && line.replace(/^[\>\]\)\~\-\+] .*$/gm, "") == "") {
            ul += line.slice(2) + "\n";
            continue;
        }
        if(ul) {
            str += mk_ul__(ul.slice(0, -1));
            ul = "";
        }

        line = mark(line);
        if(line.endsWith("<br>"))
            str += line.slice(0, -4) + "<br>";
        else if(line.endsWith("§"))
            str += line.slice(0, -1);
        else if(line.includes("</br>"))
            str += line.replace(/<\/br>/gm, "");
        else
            str += line+"\n";
    }
    str = str.replace(/\n/gm, "<br>");
    //Only one <br> after start/end tag
    str = str.replace(/\<((\/)?(h\d|div|ol|ul))\>([ \n]*\<br\>[ \n]*)+/gm, "<$1$2><br>");
    str = str.replace(/([ \n]*\<br\>[ \n]*)+\<((\/)?(h\d|div|ol|ul))\>/gm, "<br><$2$3>");
    str = str.replace(/(<br>)*?<(\/)blockquote>(<br>)*?/gm, "<$2blockquote>");
    window.setTimeout(sub_styles, 100);
    return str;
}
