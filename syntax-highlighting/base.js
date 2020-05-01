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
        /([^\w\d])(-?\d+([eE._]d+)*[jifd]?)/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ]
];

var std_err__ = [
    [
        /([\w\d_:]*)([Ee]rror|[Ee]xception|[Ff]ailure|[Ee]xit|[Ww]arning|[Aa]bort)/gm,
        function(m, p1, p2) {
            return `<span class="err">${(p1 + p2).split('').join('\u200b')}</span>`;
        }
    ], [
        /([Aa]bort|[Ii]nvalid|[Ss]top|[Bb]ad)([\w\d_:]+)/gm,
        function(m, p1, p2) {
            return `<span class="err">${(p1 + p2).split('').join('\u200b')}</span>`;
        }
    ]
]

function mark_syntax__(st, kw, cls, aio = true, edit = true, aio_text = ["await", "async"]) {
    // Reverse alphabetical sorting to prevent stuff like `char` being marked over `char16`
    kw.sort().reverse();
    cls.sort().reverse();
    var sym = "[\\"+"\\.,:;()[]{}~|/-+=*^%&@ ".split('').join("\\")+"]";
    var gsym = "(" + sym + ")";
    if(edit) {
        for(var r of kw) {
            if(r == "class")
                r += "[^=]";
            var r2 = r.replace(/\\/gm, "");
            st = st.replace(
                RegExp("^" + r + gsym, "gm"),
                `<span class="kw">${r2.split('').join('\u200b')}</span>$1`
            );
            st = st.replace(
                RegExp("(" + sym + "|\n|[\u200b ]+)" + r + gsym, "gm"),
                `$1<span class="kw">${r2.split('').join('\u200b')}</span>$2`
            );
            st = st.replace(
                RegExp("^" + r + "$"),
                `<span class="kw">${r2.split('').join('\u200b')}</span>`
            );
        }

        for(var r of cls) {
            var r2 = r.replace(/\\/gm, "");
            st = st.replace(
                RegExp("^" + r + gsym, "gm"),
                `<span class="cls">${r2.split('').join('\u200b')}</span>$1`
            );
            st = st.replace(
                RegExp("(" + sym + "|\n|[\u200b ]+)" + r + gsym, "gm"),
                `$1<span class="cls">${r2.split('').join('\u200b')}</span>$2`
            );
            st = st.replace(
                RegExp("^" + r + "$"),
                `<span class="cls">${r2.split('').join('\u200b')}</span>`
            );
        }

        if(aio) {
            for(var r of aio_text) {
                var r2 = r.replace(/\\/gm, "");
                st = st.replace(
                    RegExp("^" + r + gsym, "gm"),
                    `<span class="aio">${r2.split('').join('\u200b')}</span>$1`
                );
                st = st.replace(
                    RegExp("(" + sym + "|\n|[\u200b ]+)" + r + gsym, "gm"),
                    `$1<span class="aio">${r2.split('').join('\u200b')}</span>$2`
                );
                st = st.replace(
                    RegExp("^" + r + "$"),
                    `<span class="aio">${r2.split('').join('\u200b')}</span>`
                );
            }
        }
    }
    st = st.replace(/\u200b/gm, "");
    return st.replace(/([^ ])\u200b/gm, "$1").replace(/ +\n/gm, "\n");
}
