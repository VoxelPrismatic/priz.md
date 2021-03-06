/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var kotlin_cls__ = [
    "Int", "Unit", "null", "String", "Any", "this", "JsonElement", "Boolean",
    "BigDecimal", "DeclarationProcessor", "MutableSet", "HashSet", "Byte",
    "Short", "Long", "Float", "Double", "NaN", "Array", "IntArray", "UByte",
    "UShort", "UInt", "ULong", "ByteArray", "ShortArray", "LongArray",
    "UByteArray", "UShortArray", "ULongArray", "UIntArray", "super", "Map",
    "MutableList", "List", "Object", "Collection", "Pair", "AbstractMap",
    "Char", "Comparator", "Thread", "GlobalScope", "Channel"
];

var kotlin_ext__ = [
    "package", "import"
];

var kotlin_set__ = [
    "fun", "val", "var", "object", "public", "protected", "private", "internal",
    "expect", "actual", "final", "open", "abstract", "sealed", "const", "external",
    "override", "lateinit", "tailrec", "vararg", "suspend", "inner", "enum",
    "annotation", "companion", "inline", "infix", "operator", "data", "typealias",
    "let", "apply", "also", "run", "dynamic", "crossinline", "noinline"
];

var kotlin_kw__ = [
    "return", "if", "else", "is", "in", "for", "while", "when", "try", "catch",
    "throw", "true", "false", "finally", "do", "break", "continue", "downTo",
    "step", "union", "intersect", "subtract", "suspend", "async", "await",
    "launch", "as", "typeof", "by", "constructor", "delegate", "field", "file",
    "get", "init", "param", "property", "reciever", "set", "setparam", "lateinit",
    "out", "vararg", "it"
];

function kotlin_str_regex__(m, b, c) {
    var st = "";
    if(b[0] == '"') {
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

var kotlin_regex__ = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        kotlin_str_regex__
    ], [
        /(')(\\?.?)'/gm,
        kotlin_str_regex__
    ], [
        /(""")((.|\n)*?)"""/gm,
        kotlin_str_regex__
    ],
    ...std_escape__,
    [
        /\\u\{([A-Fa-f0-9\u200b]+\})/gm,
        `<span class="op">\\u$1</span>`
    ], [
        /([\u200b ]*)(class|implements|extends|interface) ([\w\d_]+)/gm,
        function(m, a, c, b) {
            kotlin_cls__.push(b);
            return `${a}<span class="set">${c}</span> <span class="cls">${b}</span>`;
        }
    ], [
        /([\u200b ]*)fun (\<[\w\d_]+\> )?([\w\d_]+)/gm,
        function(m, a, c, b) {
            return `${a}<span class="set">fun</span> <span class="cls">${c}</span><span class="fn">${b}</span>`;
        }
    ], [
        /([\w\d_]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
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
    ], [
        /^([\u200b ]*)\@([\d\w_.]+)/gm,
        function(m, p1, p2) {
            return `<span class="dec">${(p1 + "@" + p2).split('').join('\u200b')}</span>`;
        }
    ], [
        /\;([\u200b ]*)\@([\d\w_.]+)/gm,
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

function mark_syntax_kotlin__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of kotlin_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, kotlin_kw__, kotlin_cls__, kotlin_ext__, kotlin_set__, true, true, ["suspend", "async", "await", "launch"]);
}
