/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var java_cls__ = [
    "boolean", "byte", "char", "double", "float", "int", "interface", "long",
    "short", "void", "volatile", "String", "Scanner", "System", "ArrayList",
    "Math", "Boolean", "Byte", "Character", "Double", "Float", "Integer",
    "Long", "Short", "HashMap", "Object", "null", "super", "this"
];

var java_ext__ = [
    "package", "import"
];

var java_set__ = [
    "private", "protected", "public", "synchronized","class", "const", "extends",
    "final", "abstract", "native", "new", "static", "strictfp", "transient",
    "implements"
];

var java_kw__ = [
    "assert", "break", "case", "catch", "continue", "default", "do", "else", "enum",
    "finally", "for", "goto", "if", "instanceof", "return", "switch", "throw", "throws",
    "try", "while", "true", "false"
];

function java_str_regex__(m, b, c) {
    var st = "";
    st = c.split('').join("\u200b");
    return `<span class="str">${b}${st}${b}</span>`;
}

var java_regex__ = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        java_str_regex__
    ], [
        /(')(\\?.?)'/gm,
        java_str_regex__
    ],
    ...std_escape__,
    [
        /\\u\{([A-Fa-f0-9\u200b]+\})/gm,
        `<span class="op">\\u$1</span>`
    ], [
        /([\u200b ]*)(class|implements|extends) ([\w\d_]+)/gm,
        function(m, a, c, b) {
            java_cls__.push(b);
            return `${a}<span class="set">${c}</span> <span class="cls">${b}</span>`;
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
    ],
    ...std_err__,
    [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_java__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of java_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, java_kw__, java_cls__, java_ext__, java_set__);
}
