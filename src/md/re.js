/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */

var line_regex__ = [];

function set_regex__() {
    line_regex__ = [
        [/\\([^uUNx])/gm, function(m, p) {return "\\u{" + p.charCodeAt(0).toString(16) + "}";}],

        //Pre-Escape
        [/^ /gm, "\u200b \u200b"],
        [/\&gt;/gm, ">"],
        [/\&lt;/gm, "<"],
        [/\&amp;/gm, "&"],

        //Links
        [
            /e\[(.+?)\]<(.+?)>/gm,
            function(m, p1, p2) {
                return `<a href="mailto:${esc(p2)}">${esc(mark(p1))}</a>`;
            }
        ], [
            /p\[(.+?)\]<(.+?)>/gm,
            function(m, p1, p2) {
                return `<a href="tel:${esc(p2)}">${esc(mark(p1))}</a>`;
            }
        ], [
            /\%\[(.+?)\]<(.+?)>/gm,
            function(m, p2, p1) {
                p1 = p1.toLowerCase();
                var st = "<span class='";
                if(p1.includes("h")) {
                    st += "flip-h ";
                }
                if(p1.includes("v")) {
                    st += "flip-v ";
                }
                var st = st.slice(0, -1) + "'>" + p2 + "</span>";
                return st;
            }
        ], [
            /\?\[(.+?)\]<(.+?)>/gm,
            function(m, p1, p2) {
                return `<def title="${esc(p2)}">${mark(p1)}</def>`;
            }
        ], [
            /\@\[(.+?)\]<(.+?)>\((.*)\)/gm,
            function(m, p1, p2, p3) {
                var alt = esc(mark(p1).replace(/"/gm, "'"));
                return `<img alt="${alt}" title="${alt}" width="${p3}" src="${esc(p2)}">`;
            }
        ], [
            /\+\[\[(.+?)\]\]\<(.+?)\>\((.*?)\)/gm,
            function(m, p1, p2, p3) {
                return `<a href="${esc(p2)}" title="${esc(p3)}" target='\\x5fblank'><span class='btn'>${esc(mark(p1))}</span></a>`;
            }
        ], [
            /\+\[(.+?)\]\<(.+?)\>\((.*)\)/gm,
            function(m, p1, p2, p3) {
                return `<a href="${esc(p2)}" title="${esc(p3)}" target='\\x5fblank'>${esc(mark(p1))}</a>`;
            }
        ], [
            /\[\[(.+?)\]\]\<(.+?)\>\((.*)\)/gm,
            function(m, p1, p2, p3) {
                return `<a href="${esc(p2)}" title="${esc(p3)}"><span class='btn'>${esc(mark(p1))}</span></a>`;
            }
        ], [
            /\[(.+?)\]\<(.+?)\>\((.*)\)/gm,
            function(m, p1, p2, p3) {
                return `<a href="${esc(p2)}" title="${esc(p3)}">${esc(mark(p1))}</a>`;
            }
        ], [
            /\@\[(.+?)\]<(.+?)>/gm,
            function(m, p1, p2) {
                var alt = esc(mark(p1).replace(/"/gm, "'"));
                return `<img alt="${alt}" title="${alt}" src="${esc(p2)}">`;
            }
        ], [
            /\+\[\[(.+?)\]\]\<(.+?)\>/gm,
            function(m, p1, p2) {
                return `<a href="${esc(p2)}" target='\\x5fblank'><span class='btn'>${esc(mark(p1))}</span></a>`;
            }
        ], [
            /\+\[(.+?)\]\<(.+?)\>/gm,
            function(m, p1, p2) {
                return `<a href="${esc(p2)}" target='\\x5fblank'>${esc(mark(p1))}</a>`;
            }
        ], [
            /\[\[(.+?)\]\]\<(.+?)\>/gm,
            function(m, p1, p2) {
                return `<a href="${esc(p2)}"><span class='btn'>${esc(mark(p1))}</span></a>`;
            }
        ], [
            /\[(.+?)\]\<(.+?)\>/gm,
            function(m, p1, p2) {
                return `<a href="${esc(p2)}">${esc(mark(p1))}</a>`;
            }
        ], [
            /e<<(.+?)>>/gm,
            function(m, p1) {
                return `<a href="mailto:${esc(p1)}>${esc(p1)}</a>`;
            }
        ], [
            /p<<(.+?)>>/gm,
            function(m, p1) {
                return `<a href="tel:${esc(p1)}>${esc(p1)}</a>`;
            }
        ], [
            /<<(.+?)>>/gm,
            function(m, p1) {
                return `<a href="${esc(p1)}>${esc(p1)}</a>`;
            }
        ],

        //Unicode Escape
        [/\\x([A-Fa-f0-9]{2})/gm, "\\u{$1}"],
        [/\\U([A-Fa-f0-9]{8})/gm, "\\u{$1}"],
        [/\\u([A-Fa-f0-9]{4})/gm, "\\u{$1}"],
        [
            /\\N\{(.+?)\}/gm,
            function(m, p) {
                load_unicode_index__();
                return unimap(p, true);
            }
        ],
        [/\\([^u])/gm, function(m, p1) {return `\\u{${p1}}`;}],

        //Headers
        [/^\#{1,6}\] +(.+)$/gm, mk_head__],

        //Main MD
        [/\#(.+?)\#/gm, "<b>$1</b>"],
        [/\*(.+?)\*/gm, "<i>$1</i>"],
        [/\_(.+?)\_/gm, "<u>$1</u>"],
        [/\~(.+?)\~/gm, "<s>$1</s>"],
        [/\`(.+?)\`/gm, function(m, p1) {return `<codeline>${esc(p1)}</codeline>`}],
        [/\>\^(.+?)\^\</gm, "<sup>$1</sup>"],
        [/\>v(.+?)v\</gm, "<sub>$1</sub>"],
        [/\>\!(.+?)\!\</gm, `<spoil onclick="this.classList.toggle('unhide');">$1</spoil>`],
        [
            /\>\:(.+?)\:\</gm,
            function(m, p) {
                load_unicode_index__();
                return unimap(p.replace(/_/gm, " "), true);
            }
        ],

        //Alignment
        [
            /(.*)\:\^\:(.*)/gm,
            "<div style='height: 24px;'>" +
            "<f-l>$1</f-l>" +
            "<dict></dict>" +
            "<f-r>$2</f-r>" +
            "</div></br>"
        ],
        [/^\:\<\:(.+)/gm, "<a-l>$1</a-l>"],
        [/^\:\>\:(.+)/gm, "<a-r>$1</a-r>"],
        [/^\:v\:(.+)/gm, "<a-c>$1</a-c>"],
        [/^\:=\:(.+)/gm, "<a-j>$1</a-j>"],

        //Others
        [/\{\{(\w+?)\}\}(.+?) /gm, "<span class='$1'>$2 </span>"],
        [/^--([\w\d_.-]+)--$/gm, "<div id='$1'></div></br>"],
        [/\\ *$/gm, "</br>"], //New line escape
        [/^-~-$/gm, "<line></line></br>"],
        [/(<u>_<\/u>|___)/gm, "<div>"],
        [/===/gm, "</div>"],
        [
            /(.)\$(.+?)\;/gm,
            function(m, p2, p1) {
                var accent = accents[p1] || "";
                // Hide the dot
                if(p2 == "i")
                    p2 = "ı";
                if(p2 == "j")
                    p2 = "ȷ";
                return `<span>${p2}</span><accent>${accent}</accent>`;
            }
        ],

        [
            /\\u\{([a-fA-F0-9]+)\}/gm,
            function(m, p1) {
                var st = chr(p1);
                if(st == "<")
                    return "&lt;"
                if(st == ">")
                    return "&gt;"
                return st;
            }
        ],
    ];
}
