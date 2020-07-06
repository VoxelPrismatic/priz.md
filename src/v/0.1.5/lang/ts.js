/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var ts_cls__ = [
    "boolean", "string", "number", "Array", "any", "Object", "void", "undefined",
    "null", "never", "object", "console", "ReadonlyArray", "Date", "this", "Math",
    "Event", "super", "Exclude", "Extract", "NonNullable", "ReturnType", "InstanceType",
    "Symbol", "System", "true", "false",
];

var ts_ext__ = [
    "export", "import", "from", "require", "module",
];

var ts_set__ = [
    "let", "enum", "function", "new", "declare", "var", "const", "class", "interface",
    "readonly", "implements", "extends", "constructor", "public", "private", "protected",
    "get", "set", "abstract", "=>", "type", "namespace",
];

var ts_kw__ = [
    "throw", "while", "return", "for", "if", "catch", "try", "keyof", "typeof",
    "is", "in", "instanceof", "switch", "case", "default", "of", "as",
];

function ts_str_regex__(m, b, c) {
    var st = "";
    if(b == "`") {
        var incode = false;
        for(var d of c.split('')) {
            if(d == "${") {
                st += "</span>${";
                incode = true;
            } else if(d == "}") {
                st += '}<span class="str">';
                incode = false;
            } else if(incode) {
                st += d;
            } else {
                st += d+"\u200b";
            }
        }
    } else {
        st = c.split('').join("\u200b");
    }
    return `<span class="str">${b}${st}${b}</span>`;
}

var ts_regex__ = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        ts_str_regex__
    ], [
        /(\/)([^*].+?[^\\*\n])\//gm,
        ts_str_regex__
    ], [
        /(')(.*?[^\\\n]|)'/gm,
        ts_str_regex__
    ], [
        /(\`)((.|\n)*[^\\\n]|)\`/gm,
        ts_str_regex__
    ], [
        /\\u\{([A-Fa-f0-9\u200b]+)\}/gm,
        `<span class="op">\\u{$1}</span>`
    ],
    ...std_escape__,
    [
        /([\u200b ]*)function ([\$\w\d_]+)/gm,
        `$1<span class="kw">function</span> <span class="fn">$2</span>`
    ], [
        /([\u200b ]*)([\$\w\d_]+)([\u200b ]*)\=\>/gm,
        `$1<span class="fn">$2</span>$3<span class="kw">=></span>`
    ], [
        /^([\u200b ]*)class ([$\w\d_]+)/gm,
        function(m, a, b) {
            js_cls__.push(b);
            return `${a}<span class="kw">class</span> <span class="cls">${b}</span>`;
        }
    ], [
        /([$\w\d_]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
    ], [
        /([\u200b ]*)([\$\w\d_]+)([\u200b ]*):/gm,
        `$1<span class="lbl">$2</span>$3:`
    ],
    ...std_number__,
    [
        /\/\/(.*)\n/gm,
        function(m, a) {
            return `<span class="comm">//${a.split('').join('\u200b')}</span>\n`;
        }
    ], [
        /([^\u200b])\/\*((.|\n)*)\*\//gm,
        function(m, b, a) {
            return `${b}<span class="comm">/*${a.split('').join('\u200b')}*/</span>`;
        }
    ],
    ...std_err__,
    [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_ts__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of ts_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, ts_kw__, ts_cls__, ts_ext__, ts_set__);
}
