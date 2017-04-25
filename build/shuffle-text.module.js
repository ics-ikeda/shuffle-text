/*
 * The MIT License
 *
 * ShuffleText by Yasunobu Ikeda. Feb 3, 2012
 * Visit http://clockmaker.jp/ for documentation, updates and examples.
 *
 * Copyright (c) 2012-2017 Yasunobu Ikeda
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * ShuffleText is random text effect class for DOM Elements.
 * ShuffleTextはDOMエレメント用ランダムテキストクラスです。
 * @author Yasunobu Ikeda
 */
var ShuffleText = (function () {
    /**
     * Constructor.
     * @param element DOMエレメント
     */
    function ShuffleText(element) {
        /** The string for random text. ランダムテキストに用いる文字列です。 */
        this.sourceRandomCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        /** The string for effect space. 空白に用いる文字列です。 */
        this.emptyCharacter = '-';
        /** It is running flag. 再生中かどうかを示すブール値です。 */
        this.isRunning = false;
        /** The milli seconds of effect time. エフェクトの実行時間です。 */
        this.duration = 600;
        this._originalStr = '';
        this._originalLength = 0;
        this._timeCurrent = 0;
        this._timeStart = 0;
        this._randomIndex = [];
        this._element = element;
        this.setText(element.innerHTML);
    }
    /** テキストを設定します。 */
    ShuffleText.prototype.setText = function (text) {
        this._originalStr = text;
        this._originalLength = text.length;
    };
    /** 再生を開始します。 */
    ShuffleText.prototype.start = function () {
        var _this = this;
        this.stop();
        this._randomIndex = [];
        var str = '';
        for (var i = 0; i < this._originalLength; i++) {
            var rate = i / this._originalLength;
            this._randomIndex[i] = Math.random() * (1 - rate) + rate;
            str += this.emptyCharacter;
        }
        this._timeStart = new Date().getTime();
        this.isRunning = true;
        requestAnimationFrame(function () {
            _this._onInterval();
        });
        this._element.innerHTML = str;
    };
    /** 停止します。 */
    ShuffleText.prototype.stop = function () {
        this.isRunning = false;
    };
    /**
     * インターバルハンドラーです。
     * @private
     */
    ShuffleText.prototype._onInterval = function () {
        var _this = this;
        this._timeCurrent = new Date().getTime() - this._timeStart;
        var percent = this._timeCurrent / this.duration;
        var str = '';
        for (var i = 0; i < this._originalLength; i++) {
            if (percent >= this._randomIndex[i]) {
                str += this._originalStr.charAt(i);
            }
            else if (percent < this._randomIndex[i] / 3) {
                str += this.emptyCharacter;
            }
            else {
                str += this.sourceRandomCharacter.charAt(Math.floor(Math.random() * (this.sourceRandomCharacter.length)));
            }
        }
        if (percent > 1) {
            str = this._originalStr;
            this.isRunning = false;
        }
        this._element.innerHTML = str;
        if (this.isRunning === true) {
            requestAnimationFrame(function () {
                _this._onInterval();
            });
        }
    };
    return ShuffleText;
}());

export default ShuffleText;
//# sourceMappingURL=shuffle-text.module.js.map
