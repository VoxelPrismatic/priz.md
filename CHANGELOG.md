# #] NOTICE
- Bug fixes will be released as a part of the latest release.
- - Features will be new releases entirely.
- Any unicode table updates applying to PRIZ.md releases at or newer than `0.1.2`
will be applied to *all* those releases.
- No updates break anything unless explicitly stated. I will try my best to not
make any breaking changes anyway.

[v0.1.5](#-v015) | [v0.1.4](#-v014) | [v0.1.3](#-v013) | [v0.1.2](#-v012) | [v0.1.1](#-v011) | [v0.1.0](#-v010)

---

## #] v0.1.5

\> Added ruby lang

\> More languages coming to this release soon

---

## #] v0.1.4

\> The `collapser()` function now supports setting URL parameters, eg
`collapser(elem, false, "?command=nothing")` will add `?command=nothing` to the
end of the base URL [without the params]

\> Added search terms

\> Added RegEx support for searching

---

## #] v0.1.3

\> Updated RegEx

\> Updated emoji support

\> Updated necessary styles

\> More syntax highlighting

#### #] BREAKING CHANGES

\> The collapsible section uses a different syntax that makes more sense and
does less breaking

#### #] Bug fixes

\> Fixed a bug where tables wouldn't actually render

\> Fixed a bug where collapsed sections in code blocks would render the section
first

\> Fixed a bug where tables would have poorly rounded corners and missing/extra
thick borders

---

## #] v0.1.2

\> New syntax highlighting

\> Emoji support!

\> Condenced the main RegEx file to remove unnecessary/redundant replacements

\> Added new styles like `<spoil>` and `<line>` to clean up HTML

#### #] Bug fixes

\> Fixed the loading unicode issue

\> Fixed compression issue where `;` and `,` would show up on new lines

\> Fixed compression issue where multiple new lines would show up for no reason

\> QUICK FIX: Alignment would break sections

\> Fixed a bug where twemojis wouldn't actually render

---

## #] v0.1.1

\> Added `Kotlin` to syntax highlighting

\> Updated syntax highlighting to support more styles

\> Now under GPLv2 ;]

---

## #] v0.1.0

\> Initial release

#### #] Bug fixes

\> Fixed async load to by sync

\> Fixed some syntax languages

\> Updated CSS for accessibility
