/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var js_cls__ = [
    "AggregateError", "ArrayBuffer", "Array", "AsyncFunction", "AsyncIterator",
    "Atomics", "BigInt64Array", "BigUint64Array", "BigInt", "Boolean", "DataView",
    "Date", "Error", "EvalError", "Float32Array", "Float64Array", "Function",
    "Generator", "GeneratorFunction", "Infinity", "Int16Array", "Int32Array",
    "Int8Array", "InternalError", "Intl", "Intl.Collator", "Intl.DateTimeFormat",
    "Intl.DisplayNames", "Intl.ListFormat", "Intl.Locale", "Intl.NumberFormat",
    "Intl.PluralRules", "Intl.RelativeTimeFormat", "Iterator", "JSON", "Map",
    "Math", "NaN", "Number", "Object", "Promise", "Proxy", "RangeError",
    "ReferenceError", "Reflect", "RegExp", "Set", "SharedArrayBuffer",
    "String", "Symbol", "SyntaxError", "TypeError", "TypedArray", "URIError",
    "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "WeakMap",
    "WeakSet", "WebAssembly", "null", "undefined"
];

var js_kw__ = [
    "async", "function", "block", "break", "class", "const", "continue",
    "debugger", "default", "do", "while", "empty", "export", "for", "of",
    "function\\*", "if", "else", "import", "import.meta", "label", "let",
    "return", "throw", "try", "catch", "var", "with", "delete", "in", "new",
    "instanceof", "new", "this", "super", "typeof", "void", "yield", "yield\\*",
    "await", "extends", "from", "typeof"
];

function js_str_regex__(m, b, c) {
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

var js_regex__ = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        js_str_regex__
    ], [
        /(\/)([^*].+?[^\\*\n])\//gm,
        js_str_regex__
    ], [
        /(')(.*?[^\\\n]|)'/gm,
        js_str_regex__
    ], [
        /(\`)((.|\n)*[^\\\n]|)\`/gm,
        js_str_regex__
    ], [
        /\\u\{([A-Fa-f0-9\u200b]+)\}/gm,
        `<span class="op">\\u{$1}</span>`
    ],
    ...std_escape__,
    [
        /^([\u200b ]*)function ([\$\w\d_]+)/gm,
        `$1<span class="kw">function</span> <span class="fn">$2</span>`
    ], [
        /^([\u200b ]*)class ([$\w\d_]+)/gm,
        function(m, a, b) {
            js_cls.push(b);
            return `${a}<span class="kw">class</span> <span class="cls">${b}</span>`;
        }
    ], [
        /([$\w\d_]+)([\(\[.])/gm,
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

function mark_syntax_js__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of js_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, js_kw__, js_cls__);
}
