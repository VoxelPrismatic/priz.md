/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var md_regex__ = [
    [
        /\#(.*)/gm,
        `<b><span class="str">#$1</span></b>`
    ], [
        /\[(.*?)\]([\[\(])(.*?)([\]\)])/gm,
        `[<span class="kw">$1</span>]$2<span class="str">$3</span>$4`
    ], [
    ]
];

function mark_syntax_css__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of css_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, [], [], [], [], false, false);
}
