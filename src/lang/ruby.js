/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var rb_cls__ = [
    "false", "nil", "self", "super", "true", "Integer", "Float", "TrueClass",
    "FalseClass", "String", "Fixnum", "Bignum", "Symbol", "Array", "Hash",
    "nil?"
];

var rb_ext__ = [
    "module", "require", "require_relative", "include"
];

var rb_set__ = [
    "alias", "class", "def", "defined?", "undef"
];

var rb_kw__ = [
    "and", "begin", "break", "case", "do", "else", "elsif", "end", "ensure",
    "for", "if", "in", "next", "not", "or", "redo", "rescue", "retry", "return",
    "then", "unless", "until", "when", "while", "yield", "puts", "each"
];

function rb_str_regex__(m, b, c) {
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

var rb_regex__ = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        rb_str_regex__
    ], [
        /(\/)([^*].+?[^\\*\n])\//gm,
        rb_str_regex__
    ], [
        /(')(.*?[^\\\n]|)'/gm,
        rb_str_regex__
    ], [
        /(\`)((.|\n)*[^\\\n]|)\`/gm,
        rb_str_regex__
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
            rb_cls__.push(b);
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
        /^\#(.*)\n/gm,
        function(m, a) {
            return `<span class="comm">#${a.split('').join('\u200b')}</span>\n`;
        }
    ],
    ...std_err__,
    [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_ruby__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of rb_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, rb_kw__, rb_cls__, rb_ext__, rb_set__);
}
