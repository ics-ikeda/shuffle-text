ShuffleText
========

[![Latest NPM release][npm-badge]][npm-badge-url]
[![License][license-badge]][license-badge-url]


This is the JavaScript library for text effect such as Flash contents.

![](https://github.com/ics-ikeda/shuffle-text/raw/master/images/shuffle-text-example.gif)

## Setup


### Script Install

```html
<script src="shuffle-text.js"></script>
```


### NPM Install

```bash
$ npm install shuffle-text
```

If you use this js library in es6.

```js
import ShuffleText from 'shuffle-text';
```

## Demo

![](http://clockmaker.jp/blog/wp-content/uploads/2012/02/120207_shuffleelementtext.png)

https://ics-ikeda.github.io/shuffle-text/examples/plain/

## Basic Usage Example

```html
<!DOCTYPE html>
<html>
<head>
  <script src="shuffle-text.js"></script>
</head>
<body>
  <h1 id="myText">This is a ShuffleText.js Examle</h1>
  <script>
    var el = document.getElementById("myText");
    var text = new ShuffleText(el);
    text.start();
  </script>
</body>
</html>
```

## Showcase

![](http://clockmaker.jp/labs/_labs/images/preview_160208.jpg)

[ClockMaker Labs \- Interaction Design × Web Technology](http://clockmaker.jp/labs/)

![](http://beautifl.net/imgs/summary_large_image.png)

[Beautifl \- Flash Gallery of wonderfl](http://beautifl.net/)

![](http://ics-web.jp/imgs/140220_pollenmap_4.png)

[日本全国花粉飛散マップ Pollen Map in Japan \| ICS](http://ics-web.jp/projects/pollenmap/)


## APIs

Constructor

```js
new ShuffleText(element)
```

[API Reference](https://ics-ikeda.github.io/shuffle-text/docs/) is here.



[npm-badge]: https://img.shields.io/npm/v/shuffle-text.svg
[npm-badge-url]: https://www.npmjs.com/package/shuffle-text
[license-badge]: https://img.shields.io/npm/l/shuffle-text.svg
[license-badge-url]: ./LICENSE
[dependencies-badge]: https://img.shields.io/david/ics-ikeda/shuffle-text.svg
[dependencies-badge-url]: https://david-dm.org/ics-ikeda/shuffle-text
[devDependencies-badge]: https://img.shields.io/david/dev/ics-ikeda/shuffle-text.svg
[devDependencies-badge-url]: https://david-dm.org/ics-ikeda/shuffle-text#info=devDependencies
