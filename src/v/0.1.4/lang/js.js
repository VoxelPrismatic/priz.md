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
    "WeakSet", "WebAssembly", "null", "undefined", "this", "super", "void",
    "arguments", "window", "document", "console", "true", "false", "Set",
    "char", "double", "byte", "float", "long"
];

var js_ext__ = [
    "import", "import.meta", "label", "from", "export", "block", "empty",
    "require", "exports", "module"
];

var js_set__ = [
    "function", "function\\*", "var", "new", "let", "extends", "const", "private",
    "protected", "public", "globalThis", "implements", "delete", "constructor",
    "get", "set", "=>", "class", "native"
];

var js_kw__ = [
    "async", "break", "continue", "debugger", "default", "do", "while", "for",
    "of", "if", "else", "return", "throw", "try", "catch", "with", "in",
    "instanceof", "typeof", "yield", "yield\\*", "await", "finally",
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

function mark_syntax_js__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of js_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, js_kw__, js_cls__, js_ext__, js_set__);
}
