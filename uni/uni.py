import re
import json
import time
index = open("rip.txt").read().strip().split("\n")
def categorize(file = "uni"):
    for ct in cat:
        try:
            chars[ct]
        except:
            chars[ct] = []
    print(cat)
    for line in lines:
        print(f"{lines.index(line)}/{len(lines)} [{lines.index(line)/len(lines)*100:.2f}%] - {line}")
        c = ""
        name = line.split("\x09")[1]
        for ct in cat:
            if name.startswith(ct) and len(ct) > len(c):
                c = ct
        if c:
            i = line.split("\x09")[0] + "\x09" + line.split(c, 1)[1]
        else:
            i = line
        for r in chars:
            try:
                chars[r].remove(i)
            except:
                pass
            try:
                chars[r].remove(line)
            except:
                pass
        chars[c].append(i)
    open(file + "cmprss.json", "w+").write(json.dumps(chars, indent = 4))
    st = ""
    for ct in chars:
        if len(chars[ct]):
            st += "[" + ct + "]\n"
            for ch in chars[ct]:
                st += ch + "\n"
    open(file + "cmprss.txt", "w+").write(st)
def bulk_cat(inp, file = "uni"):
    l = len(inp)
    t = time.time()
    for i in range(l):
        si = inp[i].split("\x09")[1]
        l2 = len(si)
        print(f"{i}/{l} [{i/l*100:.2f}%] - {inp[i]}")
        skip = False
        if " " not in si:
            continue
        for thing in cat:
            if thing and thing in si and " " not in si.split(thing)[1]:
                skip = True
                break
        if skip:
            continue
        for j in range(i + 1, l):
            st = ""
            sj = inp[j].split("\x09")[1]
            for k in range(min(len(sj), l2)):
                if si[k] == sj[k]:
                    st += si[k]
                    continue
                break
            if st not in cat and st.endswith(" "):
                cat.append(st)
                print(st)
                #if (len(cat) % 50 == 0) and (time.time() - t >= 10):
                    #categorize(file)
                    #t = time.time()
cat = ['']
chars = {
    "": []
}
lines = []
for line in index:
    if "\x09<" in line and line.endswith(">"):
        continue
    lines.append(line)
    if re.search("[;,.]", line):
        start = line.split(" ")[0]
        line = line.split(" ", 1)[1]
        end = line.rsplit(" ", 1)[1]
        line = line.rsplit(" ", 1)[0]
        blocks = re.split(r" *[;,.] *", line)
        for block in blocks:
            if block:
                lines.append(start + " " + block + " " + end)
emoji_lines = open("emj.txt").read().strip().split("\n")
uni_lines = []
for line in lines:
    code = line.split("\x09")[0]
    if code.endswith("00"):
        print(f"{lines.index(line)}/{len(lines)} [{lines.index(line)/len(lines)*100:.2f}%] - {code}")
    for emoji_line in emoji_lines:
        if code == emoji_line.split("\x09")[0]:
            break
    else:
        uni_lines.append(line)

bulk_cat(uni_lines)
for x in range(10):
    bulk_cat(chars[''])
categorize("uni")
open("uni.txt", "w+").write("\n".join(uni_lines))
bulk_cat(emoji_lines, "emj")
categorize("emj")
open("emj.txt", "w+").write("\n".join(emoji_lines))
