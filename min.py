import os
import re

files = []

header = """\
/* THIS FILE IS AUTOMATICALLY GENERATED
 * BY `min.py`. DO NOT EDIT THIS FILE.
 */
"""

print("Generating md.min.js")

def grab_dirs(root, end = ".js"):
    if not root.endswith("/"):
        root += "/"
    for file in os.listdir(root):
        if file.endswith(end):
            files.append(root + file)
        else:
            try:
                grab_dirs(root + file)
            except:
                pass

grab_dirs("md")

minjs = ""

repl_js = [
    [r" +//.*\n", "\n"],
    [r"([\{\[\(])\n *", r"\1"],
    [r"\n *", r"\n"],
    [r" *\n", r"\n"],
    [r"\n *([\}\]\)])", r"\1\n"],
    [r"\), \(", r"),\n("],
    [r"\], \[", r"],\n["],
    [r"\}, \{", r"},\n{"],
    [r'" *\+ *\n"', r''],
    [r"' *\+ *\n'", r""],
]

repl_ttl = [
    [r";\n+", r";"],
    [r"\n//.*\n", "\n"],
    [r"( *\n *)+", r"\n"],
    [r"([\}\]\)])\n(.?)([\}\]\),])", r"\1\2\3"],
    [r"/\*(.|\n)*?\*/", ""],
]

repl_css = [
    [r",[\n ]*", r","],
    [r"([;\{])\n *", r"\1"],
    [r"\}\n\}", r"}}"],
    [r" *: *", r":"],
    [r",[\n ]*", r","],
    [r" *([\{\(]) *", r"\1"],
    [r" *\n+ *", r"\n"],
    [r"/\*(.|\n)*?\*/", ""],
]

for file in files:
    st = open(file).read()
    for r, s in repl_js:
        st = re.sub(r, s, st)
    minjs += st + "\n"

print("Generating syntax files")

files = []
grab_dirs("syntax-highlighting")

for file in files:
    st = open(file).read()
    for r, s in repl_js + repl_ttl:
        st = re.sub(r, s, st)
    open("out/" + file.split("/")[1].split(".")[0] + ".min.js", "w+").write(header + st)



for r, s in repl_ttl:
    minjs_ = ""
    while minjs != minjs_:
        minjs_ = minjs
        minjs = re.sub(r, s, minjs)

minjs = header + minjs
open("out/md.min.js", "w+").write(minjs)

print("Running lesscss")

files = []
grab_dirs("css", ".less")
for file in files:
    st = open(file).read()
    st = st.replace("/prizm.dev/assets/css", ".")
    open(file, "w").write(st)

os.system("sudo lessc ./css/style.less ./css/style.css")

print("Generating style.min.css")
mincss = open("css/style.css").read()


for r, s in repl_css:
    mincss_ = ""
    while mincss != mincss_:
        mincss_ = mincss
        mincss = re.sub(r, s, mincss)

mincss = header + mincss
open("out/style.min.css", "w+").write(mincss)

styles = [
    ".btn"
    ".hide",
    ".unhide",
    ".code",
    ".dict",
    ".line",
    ".def",
]

print("Generating style.lite.min.css")

litecss = header

for line in mincss.split("\n"):
    for style in styles:
        if style in line.split("{")[0]:
            litecss += line + "\n"
            break

open("out/style.lite.min.css", "w+").write(litecss)
