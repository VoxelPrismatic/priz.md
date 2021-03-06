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
    "_Imaginary", "char16_t", "char32_t", "this", "super",

    // Arduino
    "Serial", "Stream", "Keyboard", "Mouse", "array", "boolean", "size_t",
    "word", "LiquidCrytal"
];

var c_ext__ = [
    "extern","import", "module", "export"
];

var c_set__ = [
    "const", "struct", "static", "typedef", "volatile", "inline", "restrict",
    "abstract", "delegate", "explicit","register","new", "operator", "private",
    "unsafe", "virtual", "protected", "sealed", "lock", "public", "implicit",
    "internal", "synchronized", "requires", "class", "enum", "readonly",
    "unchecked", "var", "interface", "override", "delete", "using", "friend",
];

var c_kw__ = [
    "auto", "break", "case", "continue", "default", "do", "else",  "for", "goto",
    "if", "return", "sizeof", "switch", "while", "catch", "in", "into", "params",
    "select", "try", "as", "by", "event", "false", "group", "is", "out", "ref",
    "stackalloc", "typeof", "where", "base", "checked", "finally", "foreach",
    "namespace", "throw", "yield", "descending", "fixed", "from",  "orderby", "true",
    "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit",
    "atomic_noexcept", "bitand", "bitor", "compl", "concept", "constexpr", "const_cast",
    "decltype", "dynamic_cast", "mutable", "noexcept", "not", "not_eq", "nullptr",
    "or", "or_eq", "typeid", "reinterprect_cast", "static_assert", "static_cast",
    "template", "typename", "xor", "xor_eq", "union",

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
        /([\u200b ]*)(class|implements|extends) ([\w\d_]+)/gm,
        function(m, a, c, b) {
            c_cls__.push(b);
            return `${a}<span class="set">${c}</span> <span class="cls">${b}</span>`;
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
