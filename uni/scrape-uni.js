function scrape_uni() {
    st_ = "";
    for(var section of document.getElementsByClassName("symbols-block__grid")) {
        for(var tag of section.children) {
            if(tag.nodeName != "A")
                continue;
            eval("globalThis.data = " + tag.getAttribute("data-template"));
            if(data["title"]) {
                st_ += data["number"].split("+")[1].toUpperCase();
                st_ += "\u0009" + data["title"].toUpperCase() + "\n";
            }
        }
    }
    return st;
}
async function sleep(time) {
    await new Promise(resolve => {window.setTimeout(() => resolve("thing"), time)});
}
async function grab_uni() {
    var st = ""
    var ls = document.getElementsByClassName('block-page__right-column')[0].getElementsByTagName("A");
    var n = 0;
    var l = ls.length;
    console.log("Scraping current block");
    st += scrape_uni();
    for(var block of ls) {
        n += 1;
        var group_name = n + "/" + l + " - " + block.href.split("/").slice(-2)[0];
        console.group(group_name);
        console.log("Fetching [1/7]");
        resp = await fetch(block.href);
        console.log("Reading [2/7]")
        text = await resp.text();
        console.log("Stripping [3/7]")
        text = text.split('<div class="block-page__left-column">')[1]
                   .split('<div class="block-page__right-column">')[0]
                   .slice(0, -5);
        console.log("Setting [4/7]");
        document.getElementsByClassName('block-page__left-column')[0].innerHTML = text;
        console.log("Waiting [5/7]")
        await sleep(250);
        console.log("Scraping [6/7]");
        st += scrape_uni();
        console.log("Waiting [7/7]")
        await sleep(500);
        console.groupEnd(group_name);
    }
    return st;
}
await grab_uni();
