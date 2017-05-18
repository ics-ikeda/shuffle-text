# shuffle-text / rollup sample


## initialize

このサンプルを利用するときには[Node\.js](https://nodejs.org/ja/)を事前にインストールください。

コマンドライン(Windowsではコマンドプロンプト、macOSではターミナル)を起動し、次のコマンドを入力します。

```bash
npm install
```

すると、必要なモジュールが`node_modules`フォルダーにインストールされます。

## build

ソースファイルは`src`フォルダーに入っています。このファイルはそのままではブラウザーで使えないので、`import`文を解決する必要があります。

コマンドラインを起動し、次のコマンドを入力しビルドします。

```bash
npm run build
```

すると、`build`フォルダーに`import`文を解決したファイル`bundle.js`が生成されます。これを`script`タグで読み込めば使えます。
