/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var std_escape__ = [
    [
        /\\u([A-Fa-f0-9\u200b]{4,8})/gm,
        `<span class="op">\\u$1</span>`
    ], [
        /\\x([A-Fa-f0-9\u200b]{2,4})/gm,
        `<span class="op">\\x$1</span>`
    ], [
        /\\(\u200b?.)/gm,
        `<span class="op">\\$1</span>`
    ]
];

var std_number__ = [
    [
        /([^\w\d])(-?0[xbo][A-Fa-f0-9]+)/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ], [
        /([^\w\d])(-?\d+([eE._]\d+)*[uU]?[jifdL]?)/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ]
];

var std_err__ = [
    [
        /([\w\d_:]*)([Ee](rror|xception|xit)|[Ff]ailure|[Ww]arning|[Aa]bort|[Tt]imout|[Cc]ancel)/gm,
        function(m, p1, p2) {
            return `<span class="err">${(p1 + p2).split('').join('\u200b')}</span>`;
        }
    ], [
        /([Cc]ancel|[Tt](hrow|imeout)|[Aa]bort|[Ii]nvalid|[Ss]top|[Bb]ad)([\w\d_:]+)/gm,
        function(m, p1, p2) {
            return `<span class="err">${(p1 + p2).split('').join('\u200b')}</span>`;
        }
    ]
]

function mark_syntax__(st, kw, cls, ext, set, aio = true, edit = true, aio_text = ["await", "async"]) {
    // Reverse alphabetical sorting to prevent stuff like `char` being marked over `char16`
    var sym = "[\\"+"\\.,:;()[]{}<>~|/-+=*^%&@ ".split('').join("\\")+"]";
    var gsym = "(" + sym + ")";
    if(edit) {
        ls = [
            [kw, "kw"],
            [cls, "cls"],
            [ext, "ext"],
            [set, "set"],
        ];
        if(aio) {
            ls.push([aio_text, "aio"]);
        }
        for(var block of ls) {
            var regex = block[0];
            var css = block[1];
            regex.sort().reverse();
            for(var r of regex) {
                if(r == "class")
                    r += "[^=]";
                var r2 = r.replace(/\\/gm, "");
                st = st.replace(
                    RegExp("^" + r + gsym, "gm"),
                    `<span class="${css}">${r2.split('').join('\u200b')}</span>$1`
                );
                st = st.replace(
                    RegExp("(" + sym + "|\n|[\u200b ]+)" + r + gsym, "gm"),
                    `$1<span class="${css}">${r2.split('').join('\u200b')}</span>$2`
                );
                st = st.replace(
                    RegExp("^" + r + "$"),
                    `<span class="${css}">${r2.split('').join('\u200b')}</span>`
                );
            }
        }
    }
    st = st.replace(/\u200b/gm, "");
    return st.replace(/([^ ])\u200b/gm, "$1").replace(/ +\n/gm, "\n");
}
