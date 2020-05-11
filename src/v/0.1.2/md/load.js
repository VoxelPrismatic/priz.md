function fetch_content__(src, strip = false, json = false, list = false, script = false) {
    globalThis.src__ = src;
    if(strip.list)
        list = true;
    if(strip.json)
        json = true;
    if(strip.script)
        script = true;
    console.groupCollapsed("Dynamic load");
    console.info(`Reading '${src__}'`);
    var f = new XMLHttpRequest();
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            globalThis.resp__ = f.responseText;
        }
    }
    f.open("GET", src, false);
    f.send();
    if(strip || list || json || script) {
        console.log("Trimming content");
        resp__ = resp__.trim();
    } if(json) {
        console.log("Parsing JSON");
        resp__ = JSON.parse(resp__.replace(/\\\n/gm, "\\n"));
    } else if(list) {
        console.log("Splitting list");
        resp__ = resp__.split("\n");
    } else if(script) {
        console.info(`Evaluating '${src__}'`);
        globalThis.eval(resp__);
    }
    console.info(`Finished loading '${src__}'`);
    console.groupEnd("Dynamic load");
    return resp__;
}

function fetch_script__(src) {
    return fetch_content__(src, {script: true});
}

function fetch_list__(src) {
    return fetch_content__(src, {list: true});
}

function fetch_json__(src) {
    return fetch_content__(src, {json: true});
}

function fetch_text__(src) {
    return fetch_content__(src);
}
