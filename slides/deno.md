---
theme: simple
customTheme : "soluto"
enableChalkboard: false
---

# Intro to Deno

---

### **secure** runtime for Javascript and **Typescript**

---

## Hello Deno 

https://deno.land/std/examples/welcome.ts
```typescript
console.log("Welcome to Deno 🦕");
```

---

https://deno.land/std/examples/chat/server.ts

---

Why now?

---

A long time ago...

---

Back in 2009, we get **node.js**...  

---

Javascript was **exploding** thanks to **ajax**, **jQuery** and the **“web 2.0”** revolution 

---

### Atwood's Law

> "Any application that can be written in JavaScript, will eventually be written in  JavaScript" - Jeff Atwood 

---

It was exciting, yet a **dark** time for javascript...  

There were so missing pieces...

---

## Module/Script Loaders

---

We suddenly have huge applications like YUI, Google Apps, FB, and many others... 

---

Surely, script tag is not enough...

---

### Several standards
- AMD (browser)
- COMMONJS (nodejs)
- UMD

---

### Various loaders

Requirejs | CurlJS | HeadJS | YUI | SystemJS |  ...

<div style="display:flex; width: 800px; margin: 0 auto; justify-content:center ">
<div>
<img style="border:none;" src="https://firebearstudio.com/blog/wp-content/uploads/2015/09/Advanced-Development-with-RequireJS.png" />
</div>
</div>

---

## Package Managers

Bower | NPM | Jspm | Yarn | PNPM

<div style="display:flex; width: 800px; margin: 0 auto">
<div>
<img style="border:none" src="https://bower.io/img/bower-logo.png" />
</div>
<div>
<img style="border:none" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png" />
</div>
<div>
<img src="https://seeklogo.com/images/Y/yarn-logo-F5E7A65FA2-seeklogo.com.png" style="border:none">
</div>
</div>

---

![](https://img.devrant.com/devrant/rant/r_760537_vKvzh.jpg)

---

## Language?

---

JScript | Javascript | ECMAScript

---

- ES3 
- ES4 (Harmony) vs ES3.1/ES5
- ES6
- Eventually ES2015-2021

---

- Google Traceur
- 6to5 -> Babel

---

###  And...

---

CoffeeScript | Dart | **Typescript** | Flow | ReasonML


<div style="display:flex; width: 800px; margin: 0 auto">
<div>
<img style="border:none" src="https://cdn.worldvectorlogo.com/logos/coffeescript.svg" />
</div>
<div>
<img style="border:none" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT26BRH9gk9Fz-yzdOEFcJZhYCsWNjJAP1RVg&usqp=CAU" />
</div>
<div>
<img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" style="border:none" />
</div>
<div>
<img src="https://listimg.pinclipart.com/picdir/s/126-1264324_flow-js-logo-svg-clipart.png" style="border:none" />
</div>
</div>

---

### Source Maps?

---

List of languages that compile to js

<div style="font-size:16px">
CoffeeScript | CoffeeScript II: The Wrath of Khan | Coco | LiveScript | IcedCoffeeScript | Parsec CoffeeScript | Contracts.coffee | Uberscript | ToffeeScript | Caffeine | heap.coffee | EmberScript | BlackCoffee | NodeScript | Bizubee | Kaffeine | Moescript | pogoscript | LispyScript | Hot Cocoa Lisp | Sibilant | ki | jisp | Ham | GorillaScript | RedScript | Daonode | LiteScript | ColaScript | Taijilang | MoonScript | Earl Grey | Khepri | Spider | CirruScript | TLC | CokeScript | imba | Cor | Iode | FutureScript | PearScript | RamdaScript | RoyalScript | Caja | ADsafe | Jacaranda | Dojo Secure | Dart | TypeScript | TeJaS | asm.js | JavaScript++ | Mascara | Roy | Elm | Swym | Typecast.js | PureScript | Flow | ActionScript | BuckleScript | Streamline.js | mobl | StratifiedJS | NarrativeJS | jwacs | Wind.js | TameJS | Continuation.js | Kal | JSPipe | promiseLand | ContextJS | Objective-J | Mochiscript | jangaroo | Flapjax | jLang | Restrict Mode | TIScript | Six | js-- | Latte JS | JSX | oj | mfjs | Opal | HotRuby | ColdRuby | rb2js | RubyJS | Red | Quby | 8ball | Ruby2JS | ruby-parser.js | Pyodide | PYXC-PJ | Pyjamas | Pyjaco | Pyjs | Skulpt | PyCow | PyvaScript | RapydScript | Bulbul | Brython | PythonScript | pythonscript | Rusthon | PyPyJS | Batavia | Transcrypt | pseudo-python | JavaScripthon | PScript | Shen | LuvvieScript | browserl | ElixirScript | Perlito | p2js | perl.js | GWT | Java2Script/SwingJS | j2js | Strongly-Typed JavaScript (STJS) | BicaJVM | Doppio | Processing.js | Kotlin | Ceylon | GrooScript | node-jvm | Bck2Brwsr | QWT | TeaVM | Dragome SDK | JSweet | j2cl | Scala.js | js-scala | scalagwt | JScala | jsc | JSIL | Script# | CilJs | Prefix | Blade | SharpKit | Saltarelle | FunScript | Pit | WebSharper | NemerleWeb | Blue Storm | JScriptSuite | DotNetWebToolkit | Netjs | WootzJs | DuoCode | Bridge.NET | Fable | ClojureScript | ClojureJS | Chlorinejs | wisp | Scriptjure | ki | BiwaScheme | Fargo | Moby Scheme | nconc | Scheje | scheme2js | Spock | Whalesong | RacketScript | urlang | eslisp | EdgeLisp | Parenscript | Ralph | Oppo | LispyScript | Outlet | Hot Cocoa Lisp | Sibilant | jisp | JSCL | Ocamljs | O'Browser | Js_of_ocaml | Bucklescript | UHC | ghcjs | jmacro | lambdascript | YHC | jshaskell | haste | fay | forml | Amber | Clamato | Silver Smalltalk | Lively Kernel | Little Smallscript | SqueakJS | PharoJS | Emscripten | Cheerp | maja | Clue | LLJS | Mandreel | Bonsai-C | NS Basic/App Studio | qb.js | Spiderbasic | B4J | Smart Mobile Studio | Elevate Web Builder | Oberon 07 | Pas2JS | Go2js | GopherJS | TARDISgo | Haxe | Fantom | LZX (Laszlo XML) | Nim | Monkey | defrac | Ć Programming Language | Skew | Chicken Scheme | Fun | Ur | mobl | E | Sugar | Opa | STIP.js | SCION SCXML | Waterbear | Snap | ScriptBlocks | Illumination | JsMaker | Meemoo | NoFlo | Blockly | Maeda Block | sql-parser | sqld3 | Alasql | sql.js | RBQL | phype | uniter | php.js | lua.js | Brozula | Fengari | prolog.js | Yield Prolog | Tau Prolog | Z | Pyret | Oia | Plaid | Quixe | Gnusto | Logo Interpreter | Reb2Static | RPN | jsForth | wForth | Agda | XLCC | SMLtoJs | Pygmy | ErlyJS | Topaz | NGN APL | CobolScript | Idris | Wortel | oK | JEnglish | uilang | uiscript | Hodor | L2 | YoptaScript | Narcissus | CommonJS version in DoctorJS | Jasy: Python port of Narcissus with some enhancements | PyNarcissus | rbnarcissus | Traceur | EcmaScript 5 Parser (es-lab) | EcmaScript 5 Parser (qfox) | reflect.js | bdParse | parse-js | ZeParser | Esprima | js.js | sweet.js | smpl.js | acorn | Babel | Closure Compiler | UglifyJS | jison | nearley | OMeta/JS | PEG.js | languagejs | Canopy | JS/CC | jsparse | ReParse | p4js | JSGLR | ANTLR 3 | Cruiser.Parse | MetaCoffee | Bennu | bison-lalr1.js | WebAssembly | Closure Compiler AST Documentation | SpiderMonkey Parser API | ESTree Specification | Shift JavaScript AST Specification | JsonML AST | treehugger | JavaScript Shaper | burrito | js-traverse | falafel | rocambole | JavaScript types | SourceMap | Zeon | escodegen | esmangle | estraverse | ecma-ast | esast | Astring
</div>

---

## Async

---

## Async - the callback hell
(callbackhell.com)

```javascript
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```

---

## Promises!

Started with Deferred. (jQuery, Dojo)

Attempt to standard with:  
- <del>Promises/A</del> 
- <del>Promises/B</del> 
- <del>Promises/Kiss</del> 
- <del>Promises/C </del> 
- <del>Promises/D </del> 
- Promise A+

---

### Async/Await

---

## Testing

---

QUnit | Jasmine | Mocha | Chai? | Jest

---

## Bundlers

---

## Formatters/Linters

---

## And who remember these?

![](https://miro.medium.com/max/949/1*Wh_DnDH2zLPQSovOSMIy-w.jpeg)

---

Stuff changed, decisions were made, libraries and frameworks won, and we suffer from the after-effects.

---

### Why js was different?

- No standard library
- Tons of legacy from browser wars
- Lack of single ownership
    - Language design
    - Tooling/IDE
    - Runtime
- Extremely popular

---

> "Javascript is too important to be left to the experts" - Jeremy Ashkenas, Coffeescrpt creator

---

### JS is pretty Awesome

- Expressive
- Functions/Closures
- JSON
- Huge Ecosystem
- Run everywhere

---

##  So, why now?

---

Simply, we're smarter...!

Equipped with the power of **hindsight**

---

### 10 Things I Regret About Node.js
Ryan Dahl (node.js creator)

---

### Go Language 

- Integrated and opinionated tool-chain
- Powerful standard library
- Distrubted package management

---

## Deno?

Rethinking and standardizing tools and practices

---

Rethinking and standardizing toolchain

---

**Deno CLI** - one cli to rule them all

---

## Single binary

Can easily upgraded with **deno upgrade**

---

## First class Typescript support

---

### Deno run

---

## Deno test

---

## Deno fmt 

---

## Deno bundle

---

## Deno lint

---

## Deno install

https://deno.land/std/examples/cat.ts
```typescript
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  await Deno.copy(file, Deno.stdout);
  file.close();
}
```

---

Rethinking and standardizing api

---

### Promises everywhere

No need to promisfy all node.js apis

---

### Browser compatibility

- Fetch! - No more cross-fetch, isomporphic-fetch, node-fetch, etc...
- Standard Webworkers
- AddEventListener

---

### Leverage advanced js primitives

AsyncIterables!

---

### https://deno.land/std

---

Rethinking security

---

### Sandboxing

---

### Scoped permissions

---

### Permission grants in runtime

---

Rethinking Package management

---

### Urls as imports

- Very easy to share code

---

### Global cached depedencies

- Support "lock" file for security
- deno info
- deno cache

---

### https://deno.land/x

- Redirection service
- Docs site
- https://deno.land/x/gh:yshayy:deno-demo/smart-home.ts 

---

### Cohesive expericene

---

### Problems? Yes, Many!

- Editor support
- --unstable flag
- Typescript version

---

### And there's more

- Compatibility with npm packages
- Compatibility with node eco-system
- Private pacakges
- Multiple dependencies versions

---

### No more boilerplate!!

TS service "template": 
- Hundreds of dependencies
- +10 configuration files

---

### Bringing scripting back!

```javascript
import { serve } from "https://deno.land/std@0.59.0/http/server.ts";
const s = serve({ port: 8000 });
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

---

### Easy to "publish" code

---

### Deno is trending (64k stars)

---

## Should you use it?

- Easy to run with Docker
- Can be scoped for a single microservice
- Good ecosystem
- Especially useful for tooling/scripts

---

## Deploykit

* Deno toolkit for generating k8s configuration files
* Complex deployment can be described with a single TS file
* Enjoy type-safety and composition features of typescript

---

### Deploy.ts

---

# Thank you!