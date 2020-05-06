# #] PRIZ.md
A "server-side" processor for my markdown flavor

*it processes on whichever device calls it

[View the syntax](https://voxelprismatic.github.io/priz.md/view), it is different
than regular MarkDown in more ways than one. Please note that this page reflects
the latest syntax only. Sorry if you need an older version. However, you can test
any of the versions by adding `?v=#` after the link below, where `#` is the version
number.

[Test it here](https://voxelprismatic.github.io/priz.md/view/markup)

[How to use it](#-how-to-use-it) | [Important notices](#-important-notices) |
[Features / bug fixes](#-features--bug-fixes) | [Syntax Highlighting](#-syntax-highlighting)
| [Tips and tricks](#-tips-and-tricks)

## #] How to use it
Add the following line to the `<head>` of your page. This script does literally
everything for you, so don't be afraid to use it.
```html
<script type="text/javascript" src="https://voxelprismatic.github.io/priz.md/markup.js" id="priz_script"></script>
```

To use the markdown, just do the following:
```js
var content = `
<content>
`;

element.innerHTML = mark_page(content); // Actually parse the markdown
```

## #] Important notices
1. You may not use both syntax highlighting and the iframe. This is a limitation
of the iframe not being able to see whether to import the syntax highlighting or
not. No, you cannot get around it, so don't try.

2. This also adds the proper CSS style sheet to your page. If you don't like this,
you can override it by putting your CSS style sheets after the script. However,
there are a bunch of styles [at least 100]. The most important ones can be seen below.

3. There are more functions and variables, so if you don't want to live with that
use `iframe.js` instead of `markup.js`. You'll still use `mark_page(content)`,
but you'll need to `await` it first.

4. When adding something to the code directly, do NOT edit `out/md.min.js`, that
file is automatically generated by `min.py`, so it is easy to create. All files
are in the `md` folder, so edit those files instead if you want to.

5. Don't only add `md.min.js` to your site unless you've redefined the following styles.
If you don't want to recreate those, then use `markup.lite.js` or `iframe.lite.js`

| Style | Purpose |
| - | - |
| `.btn` | A button that isn't |
| `.hide` | A spoiler |
| `.unhide` | Unspoils `.hide` |
| `.code` | A code block |
| `.dict` | Just a line between a key and a value |
| `.line` | A section seperator |
| `.def` | Not that important but is useful for accessibility |

## #] Features / bug fixes
You can always ask for new features or bring light on bug fixes in the issues tab.
If it is a feature request, just be sure that you upload a picture of what the
style should look like, unless it is fairly obvious.

## #] Syntax Highlighting
That's right, this flavor of markdown also supports syntax highlighting.

Just add the following line before the script to the `<head>` of your page, where
`<langauges>` is a comma-seperated-list of the following languages
```html
<meta id="priz_syntax" content="<lanuages>"/>
```
| Language [`<languages>`] | Aliases |
| -:|:- |
| `py` | `py`, `py2`, `py3`, `python`, `python2`, `python3` |
| `js` | `js`, `javascript`, `ecma`, `ecmascript`, `node`, `nodejs` |
| `java` | `java`, `jvm`, `jre` |
| `html` | `html`, `htm`, `html4`, `html5`, `xhtml`, `khtml`, `xml` |
| `css` | `css`, `css3`, `lesscss`, `less`, `scss` |
| `c` | `c`, `cpp`, `c++`, `obj-c`, `objective-c`, `c#`, `cs`, `c-sharp`, `arduino` |
| `bash` | `bash` |
| `kotlin` | `kotlin`, `kot`, `kt` |

Or, you can *not* do that and just let the code figure it all out itself, you're
welcome.

## #] Tips and tricks
1. You can define your own `startLoading()` function so when the markdown loads,
it can start interpreting right away.

2. Use the `markup.js` script. Almost all important functions directly related
to the markdown interpreter use underscores, with 2 of them at the end of each
function.

3. Syntax highlighting does load dynamically now, which is useful so you don't
constantly need to set up your page.

4. You no longer need to call `sub_styles()`, `mark_page` sets a timeout for it
anyway.

5. Want a specific version? Use `.../priz.md/v/#/...` instead, where `#` is the
version number.
