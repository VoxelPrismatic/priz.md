/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var c_cls__ = [
    "char", "int", "shor", "long", "unsigned", "signed", "float", "double",
    "void", "bool", "String", "string", "NULL", "null", "nil", "wchar_t",
    "sbyte", "ushort", "ulong", "decimal", "object", "_Bool", "_Complex",
    "_Imaginary",

    // Arduino
    "Serial", "Stream", "Keyboard", "Mouse", "array", "boolean", "size_t",
    "word", "LiquidCrytal"
];

var c_kw__ = [
    "auto", "break", "case", "const", "continue", "default", "do", "else",
    "enum", "extern", "for", "goto", "if", "register", "return", "sizeof",
    "static", "struct", "switch", "typedef", "union", "volatile", "while",
    "inline", "restrict", "abstract", "catch", "delegate", "explicit",
    "in", "into", "new", "operator", "params", "readonly", "select", "try",
    "unchecked", "var", "as", "by", "event", "false", "group", "is", "out",
    "private", "ref", "stackalloc", "this", "typeof", "unsafe", "virtual",
    "where", "base", "checked", "finally", "foreach", "interface", "lock",
    "namespace", "override", "protected", "sealed", "throw", "yield", "public",
    "class", "descending", "fixed", "from", "implicit", "internal", "orderby",
    "true", "using", "delete", "alignas", "alignof", "and", "and_eq", "asm",
    "atomic_cancel", "atomic_commit", "atomic_noexcept", "bitand", "bitor",
    "char16_t", "char32_t", "compl", "concept", "constexpr", "const_cast",
    "decltype", "dynamic_cast", "export", "friend", "import", "module",
    "mutable", "noexcept", "not", "not_eq", "nullptr", "or", "or_eq", "typeid",
    "reinterprect_cast", "requires", "static_assert", "static_cast", "template",
    "synchronized", "typename", "xor", "xor_eq",

    // Arduino
    "HIGH", "LOW", "INPUT", "OUTPUT", "INPUT_PULLUP", "LED_BUILTIN"
];

function c_str_regex__(m, b, c) {
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

var c_regex__ = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        c_str_regex__
    ], [
        /(')(.*?[^\\\n]|)'/gm,
        c_str_regex__
    ], [
        /\\u\{([A-Fa-f0-9\u200b]+)\}/gm,
        `<span class="op">\\u{$1}</span>`
    ],
    ...std_escape__,
    [
        /^([\u200b ]*)\#([ \w]+)(.*)\n/gm,
        `$1<span class="kw">#$2</span> <span class="op">$3</span><br>`
    ], [
        /^([\u200b ]*)class ([\w\d_]+)/gm,
        function(m, a, b) {
            js_cls.push(b);
            return `${a}<span class="kw">class</span> <span class="cls">${b}</span>`;
        }
    ], [
        /([&\$*]?[\w\d_]+)([\(\[.])/gm,
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

function mark_syntax_c__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of c_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(
        st, c_kw__, c_cls__, true, true,
        ["co_await", "co_return", "co_yield", "async", "await"]
    );
}
