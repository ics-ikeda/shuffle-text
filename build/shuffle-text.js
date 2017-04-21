(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.effects = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * ShuffleText by Yasunobu Ikeda. Feb 3, 2012
 * Visit http://clockmaker.jp/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 Yasunobu Ikeda
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DOMエレメント用ランダムテキストクラス
 * @param DOMエレメント
 */
var ShuffleText = (function () {
    function ShuffleText(element) {
        /** ランダムテキストに用いる文字列 */
        this.sourceRandomCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        /** 空白に用いる文字列 */
        this.emptyCharacter = "-";
        /** 再生中かどうかを示すブール値 */
        this.isRunning = false;
        /** エフェクトの実行時間 */
        this.duration = 600;
        this._originalStr = "";
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
        var str = "";
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
    ShuffleText.prototype._onInterval = function () {
        var _this = this;
        this._timeCurrent = new Date().getTime() - this._timeStart;
        var percent = this._timeCurrent / this.duration;
        var str = "";
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
exports.ShuffleText = ShuffleText;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvU2h1ZmZsZVRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBTaHVmZmxlVGV4dCBieSBZYXN1bm9idSBJa2VkYS4gRmViIDMsIDIwMTJcbiAqIFZpc2l0IGh0dHA6Ly9jbG9ja21ha2VyLmpwLyBmb3IgZG9jdW1lbnRhdGlvbiwgdXBkYXRlcyBhbmQgZXhhbXBsZXMuXG4gKlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiBZYXN1bm9idSBJa2VkYVxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0XG4gKiByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcbiAqIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcbiAqIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG4gKiBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gKiBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuICogRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuICogTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcbiAqIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxuICogV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG4gKiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBET03jgqjjg6zjg6Hjg7Pjg4jnlKjjg6njg7Pjg4Djg6Djg4bjgq3jgrnjg4jjgq/jg6njgrlcbiAqIEBwYXJhbSBET03jgqjjg6zjg6Hjg7Pjg4hcbiAqL1xudmFyIFNodWZmbGVUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaHVmZmxlVGV4dChlbGVtZW50KSB7XG4gICAgICAgIC8qKiDjg6njg7Pjg4Djg6Djg4bjgq3jgrnjg4jjgavnlKjjgYTjgovmloflrZfliJcgKi9cbiAgICAgICAgdGhpcy5zb3VyY2VSYW5kb21DaGFyYWN0ZXIgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMTIzNDU2Nzg5MFwiO1xuICAgICAgICAvKiog56m655m944Gr55So44GE44KL5paH5a2X5YiXICovXG4gICAgICAgIHRoaXMuZW1wdHlDaGFyYWN0ZXIgPSBcIi1cIjtcbiAgICAgICAgLyoqIOWGjeeUn+S4reOBi+OBqeOBhuOBi+OCkuekuuOBmeODluODvOODq+WApCAqL1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICAvKiog44Ko44OV44Kn44Kv44OI44Gu5a6f6KGM5pmC6ZaTICovXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSA2MDA7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsU3RyID0gXCJcIjtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxMZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl90aW1lQ3VycmVudCA9IDA7XG4gICAgICAgIHRoaXMuX3RpbWVTdGFydCA9IDA7XG4gICAgICAgIHRoaXMuX3JhbmRvbUluZGV4ID0gW107XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLnNldFRleHQoZWxlbWVudC5pbm5lckhUTUwpO1xuICAgIH1cbiAgICAvKiog44OG44Kt44K544OI44KS6Kit5a6a44GX44G+44GZ44CCICovXG4gICAgU2h1ZmZsZVRleHQucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB0aGlzLl9vcmlnaW5hbFN0ciA9IHRleHQ7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsTGVuZ3RoID0gdGV4dC5sZW5ndGg7XG4gICAgfTtcbiAgICAvKiog5YaN55Sf44KS6ZaL5aeL44GX44G+44GZ44CCICovXG4gICAgU2h1ZmZsZVRleHQucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgdGhpcy5fcmFuZG9tSW5kZXggPSBbXTtcbiAgICAgICAgdmFyIHN0ciA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fb3JpZ2luYWxMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHJhdGUgPSBpIC8gdGhpcy5fb3JpZ2luYWxMZW5ndGg7XG4gICAgICAgICAgICB0aGlzLl9yYW5kb21JbmRleFtpXSA9IE1hdGgucmFuZG9tKCkgKiAoMSAtIHJhdGUpICsgcmF0ZTtcbiAgICAgICAgICAgIHN0ciArPSB0aGlzLmVtcHR5Q2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RpbWVTdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fb25JbnRlcnZhbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5pbm5lckhUTUwgPSBzdHI7XG4gICAgfTtcbiAgICAvKiog5YGc5q2i44GX44G+44GZ44CCICovXG4gICAgU2h1ZmZsZVRleHQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgfTtcbiAgICBTaHVmZmxlVGV4dC5wcm90b3R5cGUuX29uSW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3RpbWVDdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLl90aW1lU3RhcnQ7XG4gICAgICAgIHZhciBwZXJjZW50ID0gdGhpcy5fdGltZUN1cnJlbnQgLyB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgc3RyID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9vcmlnaW5hbExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGVyY2VudCA+PSB0aGlzLl9yYW5kb21JbmRleFtpXSkge1xuICAgICAgICAgICAgICAgIHN0ciArPSB0aGlzLl9vcmlnaW5hbFN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwZXJjZW50IDwgdGhpcy5fcmFuZG9tSW5kZXhbaV0gLyAzKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IHRoaXMuZW1wdHlDaGFyYWN0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gdGhpcy5zb3VyY2VSYW5kb21DaGFyYWN0ZXIuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLnNvdXJjZVJhbmRvbUNoYXJhY3Rlci5sZW5ndGgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBlcmNlbnQgPiAxKSB7XG4gICAgICAgICAgICBzdHIgPSB0aGlzLl9vcmlnaW5hbFN0cjtcbiAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWxlbWVudC5pbm5lckhUTUwgPSBzdHI7XG4gICAgICAgIGlmICh0aGlzLmlzUnVubmluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fb25JbnRlcnZhbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTaHVmZmxlVGV4dDtcbn0oKSk7XG5leHBvcnRzLlNodWZmbGVUZXh0ID0gU2h1ZmZsZVRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaHVmZmxlVGV4dC5qcy5tYXAiXX0=
