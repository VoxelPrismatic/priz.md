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
    "Long", "Short", "HashMap", "Object"
];

var java_kw__ = [
    "abstract", "assert", "break", "case", "catch", "class", "const", "continue",
    "default", "do", "else", "enum", "extends", "final", "finally", "for", "goto",
    "if", "implements", "import", "instanceof", "native", "new", "package",
    "private", "protected", "public", "return", "static", "strictfp", "super",
    "switch", "synchronized", "this", "throw", "throws", "transient", "try",
    "while", "true", "false", "null"
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
        /([\u200b ]*)(public|private|abstract)? (class|implements|extends) ([\w\d_]+)/gm,
        function(m, c, d, a, b) {
            js_cls.push(b);
            return `${a}<span class="kw">${c + d}</span> <span class="cls">${b}</span>`;
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
    return mark_syntax__(st, java_kw__, java_cls__);
}
