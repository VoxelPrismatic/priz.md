# ------------- PRIZ.md - a markdown processor -------------
# [C] 2020 @VoxelPrismatic *not putting my name out there
#
# This program is licensed under GPLv2. Feel free to modify
# it, but all projects modifying it must also remain
# opensource. No warranty is provided.
# For more info go to https://tiny.cc/priz-md/
#-----------------------------------------------------------

import os
import re

files = []

header = """\
/* ------------- PRIZ.md - a markdown processor ------------- *
 * [C] 2020 @VoxelPrismatic *not putting my name out there    *
 *                                                            *
 * This program is licensed under GPLv2. Feel free to modify  *
 * it, but all projects modifying it must also remain         *
 * opensource. No warranty is provided.                       *
 * For more info go to https://tiny.cc/priz-md/               *
 * ---------------------------------------------------------- */
"""

print("Generating md.min.js")

def grab_dirs(root, end = ".js"):
    if not root.endswith("/"):
        root += "/"
    if root.endswith("v/"):
        return
    end = end.strip()
    ls = os.listdir(root)
    for file in ls:
        try:
            grab_dirs(root + file, end)
        except:
            if file.endswith(end):
                files.append(root + file)

def mktree(folder):
    folder = "./" + folder
    while folder and not folder.endswith("/"):
        folder = folder[:-1]
    st = ""
    folder = folder[:-1]
    for thing in folder.split("/"):
        st += thing + "/"
        try:
            os.mkdir(st)
        except:
            pass

grab_dirs("src/md")

minjs = ""

repl_js = [
    [r" +//.*\n", "\n"],
    [r"([\{\[\(])\n *", r"\1"],
    [r"\n *", r"\n"],
    [r" *\n", r"\n"],
    [r"\n *([\}\]\)])", r"\1\n"],
    #[r"\), \(", r"),\n("],
    #[r"\], \[", r"],\n["],
    #[r"\}, \{", r"},\n{"],
    [r'" *\+ *\n"', r''],
    [r"' *\+ *\n'", r""],
    [r"\n *;", r";\n"],
    [r"\n *,", r",\n"],
    [r"\n\n+", r"\n"]
]

repl_ttl = [
    [r";\n+", r";"],
    [r"\n//.*\n", "\n"],
    [r"( *\n *)+", r"\n"],
    [r"([\}\]\)])\n(.?)([\}\]\),])", r"\1\2\3"],
    [r"/\*(.|\n)*?\*/", ""],
    [r"\n\n+", r"\n"]
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
    [r"\n\n+", r"\n"]
]

for file in files:
    st = open(file).read()
    for r, s in repl_js:
        st = re.sub(r, s, st)
    minjs += st + "\n"

print("Generating syntax files")

files = []
grab_dirs("src/lang")

for file in files:
    print("\n\nWriting", file.split("/")[-1])
    st = open(file).read()
    for r, s in repl_js + repl_ttl:
        st = re.sub(r, s, st)
    filename = "out/lang/" + file.split("/")[-1].split(".")[0] + "-lang.min.js"
    open(filename, "w+").write(header + st)
    print("Testing", file.split("/")[-1])
    os.system("nodejs " + filename);

print("Generating extra files")

files = []
grab_dirs("src/more")

for file in files:
    print("\n\nWriting", file.split("/")[-1])
    st = open(file).read()
    for r, s in repl_js + repl_ttl:
        st = re.sub(r, s, st)
    filename = "out/more/" + file.split("/")[-1].split(".")[0] + ".min.js"
    open(filename, "w+").write(header + st)
    print("Testing", file.split("/")[-1])
    os.system("nodejs " + filename);

for r, s in repl_ttl:
    minjs_ = ""
    while minjs != minjs_:
        minjs_ = minjs
        minjs = re.sub(r, s, minjs)

minjs = header + minjs
open("out/md.min.js", "w+").write(minjs)

print("Running lesscss")

files = []
grab_dirs("src/css", ".less")
for file in files:
    st = open(file).read()
    st = st.replace("/prizm.dev/assets/css", ".")
    open(file, "w").write(st)

os.system("sudo echo *now running")
os.system("sudo lessc ./src/css/style.less ./src/css/style.css")

print("Generating style.min.css")

mincss = open("src/css/style.css").read()
mincss = header + re.sub(r"\/\*(.|\n)*?\*\/", "", mincss)
open("src/css/style.css", "w").write(mincss)

for r, s in repl_css:
    mincss_ = ""
    while mincss != mincss_:
        mincss_ = mincss
        mincss = re.sub(r, s, mincss)

mincss = header + mincss
open("out/style.min.css", "w+").write(mincss)

styles = [
    ".btn"
    "spoil",
    ".unhide",
    "codeblock",
    "codeline"
    ".dict",
    "line",
    "def",
    "align",
    "al"
]

print("Generating style.lite.min.css")

litecss = header

for line in mincss.split("\n"):
    for style in styles:
        if style in line.split("{")[0]:
            litecss += line + "\n"
            break

open("out/style.lite.min.css", "w+").write(litecss)

v = input("Release # ] ")

files = []
grab_dirs("src/", " ")
vv = " src/v/" + v + "/"
for file in files:
    mktree(vv[1:] + file[4:])
    os.system("cp " + file + vv + file[4:])

files = []
grab_dirs("out/", " ")
vv = " out/v/" + v + "/"
for file in files:
    mktree(vv[1:] + file[4:])
    os.system("cp " + file + vv + file[4:])
