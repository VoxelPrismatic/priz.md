/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var py_cls__ = [
    "int", "float", "dict", "list", "tuple", "set", "bool", "None", "frozenset",
    "str", "bytes", "file", "type", "complex", "True", "range", "bytearray",
    "memoryview", "False", "range", "breakpoint", "callable", "classmethod",
    "map", "object", "quit", "id", "super", "self"
];

var py_ext__ = [
    "import", "from", "reload"
];

var py_set__ = [
    "def", "class", "del", "nonlocal", "global", "local"
];

var py_kw__ = [
    "yield", "break", "if", "assert", "finally", "elif", "else", "for", "while",
    "with", "as", "in", "not", "and", "or", "is", "try", "except", "pass", "continue",
    "break", "return", "lambda", "issubclass", "isinstance", "next"
];

function py_str_regex__(m, a, b, c) {
    var st = "";
    if(a == "f" || a == "F") {
        var incode = false;
        for(var d of c.split('')) {
            if(d == "{") {
                st += "</span>{";
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
    return `<span class="str">${a}${b}${st}${b}</span>`;
}

var py_regex__ = [
    [
        /([fFrRuUbB]?)(")(.*?[^\\]|)"/gm,
        py_str_regex__
    ], [
        /([fFrRuUbB]?)(')(.*?[^\\]|)'/gm,
        py_str_regex__
    ], [
        /([fFrRuUbB]?)(''')((.|\n)*[^\\]|)'''/gm,
        py_str_regex__
    ], [
        /([fFrRuUbB]?)(""")((.|\n)*[^\\]|)"""/gm,
        py_str_regex__
    ],
    ...std_escape__,
    [
        /\\U([A-Fa-f0-9\u200b]{8,16})/gm,
        `<span class="op">\\U$1</span>`
    ], [
        /\\N\{([\w\d ]+)\}/gm,
        `<span class="op">\\N{$1}</span..,>`
    ], [
        /^([\u200b ]*)def ([\w\d_]+)/gm,
        `$1<span class="set">def</span> <span class="fn">$2</span>`
    ], [
        /__([\w\d_]+)__/gm,
        `<span class="op">__$1__</span>`
    ], [
        /^([\u200b ]*)class ([\w\d_]+)/gm,
        function(m, a, b) {
            py_cls__.push(b);
            return `${a}<span class="set">class</span> <span class="cls">${b}</span>`;
        }
    ], [
        /([\w\d_]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
    ], [
        /([^\u200b])\#(.*)\n/gm,
        function(m, b, a) {
            return `${b}<span class="comm">#${a.split('').join('\u200b')}</span>\n`;
        }
    ], [
        /^\#(.*)\n/gm,
        function(m, a) {
            return `<span class="comm">#${a.split('').join('\u200b')}</span>\n`;
        }
    ],
    ...std_number__,
    [
        /^([\u200b ]*)\@([\d\w_.]+)/gm,
        function(m, p1, p2) {
            return `<span class="dec">${(p1 + "@" + p2).split('').join('\u200b')}</span>`;
        }
    ],
    ...std_err__,
    [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_py__(st) {
    st = st.replace(/\n/gm, " \n");
    st += "\n";
    for(var r of py_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, py_kw__, py_cls__, py_ext__, py_set__);
}
