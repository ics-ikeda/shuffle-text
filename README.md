# ShuffleText


This is the JavaScript library for text effect such as Flash contents.



## Setup

### NPM Install

```bash
$ npm install shuffle-text
```

### Script Install

```html
<script src="shuffle-text.js"></script>
```

## Demo

![](http://clockmaker.jp/blog/wp-content/uploads/2012/02/120207_shuffleelementtext.png)

http://clockmaker.jp/labs/120203_html5_shuffletext/dom.html

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
