var uni_index__ = {};
var emj_index__ = {};

function load_unicode_index__() {
    if(uni_index__.constructor.keys(uni_index__).length)
        return
    console.groupCollapsed("Loading unicode index");
    console.log("Fetching the unicode index");
    var base = "https://voxelprismatic.github.io/priz.md/uni/";
    var lines = fetch_list__(base + "uni.txt");
    console.log("Parsing the unicode index");
    for(var line of lines) {
        if(line.trim() == "")
            continue;
        uni_index__[line.split("\u0009")[1].trim().toUpperCase()] = line.split("\u0009")[0].trim().toUpperCase();
    }
    console.log("Fetching the emoji index");
    var lines = fetch_list__(base + "emj.txt");
    for(var line of lines) {
        if(line.trim() == "")
            continue;
        emj_index__[line.split("\u0009")[1].trim().toUpperCase()] = line.split("\u0009")[0].trim().toUpperCase();
    }
    console.log("Finished loading unicode index");
    console.groupEnd("Loading unicode index");
}

function unimap(st, esc = false) {
    try {
        var char = emj_index__[st.toUpperCase()];
        var raw = eval(`"\\u{${char}}"`);
        return `<img src="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/${char.toLowerCase()}.svg" class="emoji" alt="${raw}">`;
    } catch(err) {
        char = uni_index__[st.toUpperCase()];
        if(esc) {
            return "\\u{" + char + "}";
        }
        try {
            return eval(`"\\u{${char}}"`);
        } catch(err) {
            return st;
        }
    }
}
