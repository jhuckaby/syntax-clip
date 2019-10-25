#!/usr/bin/env node

// syntax-clip
// Apply syntax highlighting to clipboard contents (guess language).
// Inline CSS, and then copy back to clipboard as formatted HTML.
// Currently only works on macOS.
// Copyright (c) 2019 Joseph Huckaby, PixlCore.com, MIT Licensed

const fs = require('fs');
const os = require('os');
const cp = require('child_process');
const hljs = require('highlight.js');
const inlineCSS = require('inline-css');
const stripIndent = require('strip-indent');

if (os.platform() !== 'darwin') {
	throw new Error("Sorry, this tool only works on macOS.");
}

const Args = require('pixl-args');
var args = (new Args({
	
	font: 'Courier,monospace',
	style: 'atom-one-light',
	size: 'inherit',
	language: false, // false = automatic
	debug: false
	
})).get();

const PBPASTE_BIN = '/usr/bin/pbpaste';
const OSASCRIPT_BIN = '/usr/bin/osascript';

process.chdir( __dirname );

// first, get clipboard contents as text
cp.exec( PBPASTE_BIN, function(err, stdout, stderr) {
	if (err) throw err;
	
	// strip indent and trim
	var code = stripIndent(stdout).trim();
	if (!code.match(/\S/)) process.exit(0); // nothing to do
	
	// apply syntax highlighting (guess language)
	var results = args.language ? 
		hljs.highlight( args.language, code, true ) : 
		hljs.highlightAuto( code );
	
	if (!results || !results.value) {
		// if highlighter failed, just plaintext it
		results = { value: code };
	}
	
	// set UTF-8 encoding, wrap in pre/code elements, and set font
	var html = '<meta charset="utf-8"><pre style="font-family:' + args.font + '; font-size:' + args.size + '"><code>' + results.value + '</code></pre>';
	
	// set options for inlineCSS including our code style
	var opts = {
		extraCss: fs.readFileSync('node_modules/highlight.js/styles/' + args.style + '.css', 'utf8'),
		removeHtmlSelectors: true,
		url: __filename
	};
	
	// apply css inlining
	inlineCSS(html, opts)
	.then(function(html) { 
		if (args.debug) {
			// debug mode: just dump HTML to STDOUT and exit
			console.log(html);
			process.exit(0);
		}
		
		// convert HTML to hex stream because AppleScript is bizarre 🤷‍♂️
		var hex = Buffer.from(html).toString("hex");
		var script_content = "set the clipboard to «data HTML" + hex + "»";
		
		// write temp script file so we don't blow out the command-line
		var temp_file = os.tmpdir() + '/syntax-clip-' + process.pid + '.txt';
		fs.writeFileSync( temp_file, script_content );
		
		// run script to write to clipboard
		cp.exec( OSASCRIPT_BIN + " " + temp_file, function(err, stdout, stderr) {
			
			// always cleanup temp file
			fs.unlinkSync( temp_file );
			
			if (err) throw err;
			process.exit(0);
		}); // osascript
	}); // inlineCSS
}); // pbpaste
