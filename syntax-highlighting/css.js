function css_str_regex__(m, b, c, a) {
    if(!a) {
        a = b;
    }
    st = c.split('').join("\u200b");
    return `<span class="str">${b}${st}${b}</span>`;
}

var css_regex__ = [
    [
        /(\~?")(.*?[^\\\n]|)"/gm,
        css_str_regex__
    ], [
        /(\~?')(.*?[^\\\n]|)'/gm,
        css_str_regex__
    ], [
        /\((https?:\/\/.+?)\)/gm,
        `(<span class="str">$1</span>)`
    ],
    ...std_escape__,
    [
        /(\}?)(.+)\{/gm,
        `$1<span class="cls">$2</span>{`
    ], [
        /(\@[.#\w\d_\-,\[\]\^=:]+?)([ ;])/gm,
        `<span class="err">$1</span>$2`
    ], [
        /(\!important)/gm,
        `<span class="err">$1</span>`
    ], [
        /(\$?[\w\d_-]+)([\(])/gm,
        `<span class="fn">$1</span>$2`
    ], [
        /(\@?[\w\-\d ]+\:)(.+?)([;\}])/gm,
        function(m, p1, p2, p3) {
            return `<span class="fn">${p1}</span>${p2}${p3}`;
        }
    ], [
        /([^\w\d])(-?\d+\.?[\w%]*|\#[A-Fa-f0-9]{3,8})/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ], [
        / \/\/(.*)\n/gm,
        function(m, a) {
            return `<span class="comm">//${a.split('').join('\u200b')}</span>\n`;
        }
    ], [
        /([^\u200b])\/\*((.|\n)*?)\*\//gm,
        function(m, b, a) {
            return `${b}<span class="comm">/*${a.split('').join('\u200b')}*/</span>`;
        }
    ], [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_css__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of css_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, [], [], false, false);
}
