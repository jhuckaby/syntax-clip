# Overview

This module will syntax-highlight any text on your clipboard, so you can paste pretty-looking code snippets into any rich text editor (e-mail, doc, etc.).  Specifically, the module will:

1. Grab any plain text from your clipboard.
2. Normalize indentation (strip excess leading whitespace).
3. Perform syntax highlighting via [highlight.js](https://highlightjs.org/).
4. Inline all CSS rules, for a portable HTML blob.
5. Save the formatted HTML back onto your clipboard.

You can customize the **language** (default is auto-detect, [supports many](https://highlightjs.org/static/demo/)), **font family** (defaults to `Courier, monospace`), **font size** (defaults to inherit), and **theme** (defaults to `atom-one-light`, [supports many](https://highlightjs.org/static/demo/)).  See the command-line options below for details.

Note that this module currently only works on macOS.  Also note that [Visual Studio Code](https://code.visualstudio.com/) already does this trick natively when you copy code to the clipboard, so this module is probably useless to you if you use that app.

# Usage

First, make sure you have [Node.js](https://nodejs.org/en/download/) installed on your Mac.  Then, use [npm](https://www.npmjs.com/) to install the module as a command-line executable like so:

```
npm install -g syntax-clip
```

Depending on your machine and folder permissions, you might have to run the above command with `sudo`.

Now, try copying some code to your clipboard, and enter the following command into the Terminal:

```
syntax-clip
```

That's it!  Now try pasting into a rich text editor, and you will see your beautiful, syntax-highlighted code.

## Command-Line Options

The following command-line options are available:

### --language

By default, the language is automatically detected by the code on your clipboard.  However, you can force it by specifying a `--language` argument.  The accepted languages are listed [here](https://github.com/highlightjs/highlight.js/tree/master/src/languages) (omit the `.js` extension).  Example:

```
syntax-clip --language javascript
```

Live previews are available [here](https://highlightjs.org/static/demo/).

### --style

By default, the `atom-one-light` style is used.  However, you can specify any of the themes listed [here](https://github.com/highlightjs/highlight.js/tree/master/src/styles) (omit the `.css` extension), by specifying a `--style` argument.  Example:

```
syntax-clip --style tomorrow
```

Live previews are available [here](https://highlightjs.org/static/demo/).

### --font

By default, the font family used is `Courier,monospace`.  To customize this, use the `--font` argument.  You can also specify multiple fallback fonts, comma separated.  Example:

```
syntax-clip --font "Inconsolata,Monaco,monospace"
```

Please note that custom fonts are not embedded into the HTML, so you should use universally supported fonts, and always append `,monospace` at the end for a universal generic fallback.

### --size

By default, no size is specified, so the code snippet will inherit whatever size your document is currently using.  To customize this, add a `--size` argument, and use any of the CSS size units like `pt` or `px`.  Example:

```
syntax-clip --size 14px
```

## Global Keyboard Shortcut

To add a global keyboard shortcut on macOS, you first need to wrap the call to `syntax-clip` in an AppleScript.  To do this, open the **Script Editor** application (located in Applications/Utilities), and enter this text:

```applescript
do shell script "/usr/local/bin/node /usr/local/bin/syntax-clip"
```

Please note that the location of your Node.js binary may be different than mine, so change `/usr/local/bin/node` to the correct location.  To determine what this should be, open Terminal and type `which node`.  This is important because AppleScripts run without a proper shell environment, so they are often missing things like your standard `PATH` variable.

Also note that the location of the installed `syntax-clip` binary may differ from mine, so change `/usr/local/bin/syntax-clip` to the correct location.  To determine what this should be, open Terminal and type `which syntax-clip`.

Once this is complete, save your AppleScript somewhere central such as in `~/Library/Scripts/`.

Next, you need to assign a global keyboard shortcut to the script.  To do this, you can either use a commercial application such as [Alfred](http://www.alfredapp.com/), [Keyboard Maestro](http://www.keyboardmaestro.com/main/), or [FastScripts](http://www.red-sweater.com/fastscripts/index.html), or you can do it the manual way...

1. Open **Automator** (located in your /Applications folder).
2. In the dialog that pops up, select **Quick Action** and click the **Choose** button.
3. In the search field on the left sidebar, enter `applescript`.
4. Drag the **Run AppleScript** action to the right-hand pane.
5. Paste the `do shell script...` line into the text field, replacing all the demo code.
6. From the menu bar, select **File** → **Save...** and give it a name such as `Syntax Clip`.
7. Quit Automator.
8. Open **System Preferences**, then click on the **Keyboard** icon.
9. Click on the **Shortcuts** tab, then click on **⚙️Services** on the left side.
10. Scroll down the right pane until you see your Quick Action (should be under **General**).
11. Click on your action and you should see a **Add Shortcut** button appear.  Click it.
12. Type your desired keyboard shortcut.
13. Quit System Preferences.

**Note:** These instructions are for macOS Mojave specifically.  Things may be quite different in older or newer OS versions.

# License (MIT)

**The MIT License**

*Copyright (c) 2019 Joseph Huckaby.*

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
