(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ShuffleText = factory());
}(this, function () { 'use strict';

  /**
   * ShuffleText is random text effect class for DOM Elements.
   * ShuffleTextはDOMエレメント用ランダムテキストクラスです。
   * @author Yasunobu Ikeda
   * @since 2012-02-07
   */
  var ShuffleText = /** @class */ (function () {
      /**
       * Constructor.
       * @param element DOMエレメントです。
       */
      function ShuffleText(element) {
          /**
           * The string for random text.
           * ランダムテキストに用いる文字列です。
           * @type {string}
           * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
           */
          this.sourceRandomCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
          /**
           * The string for effect space.
           * 空白に用いる文字列です。
           * @type {string}
           * @default '-'
           */
          this.emptyCharacter = '-';
          /**
           * The milli seconds of effect time.
           * エフェクトの実行時間（ミリ秒）です。
           * @type {number}
           * @default 600
           */
          this.duration = 600;
          this._isRunning = false;
          this._originalStr = '';
          this._originalLength = 0;
          this._timeCurrent = 0;
          this._timeStart = 0;
          this._randomIndex = [];
          this._element = null;
          this._requestAnimationFrameId = 0;
          this._element = element;
          this.setText(element.innerHTML);
      }
      /**
       * Set new strings. テキストを設定します。
       * @param text テキスト文字列です。
       */
      ShuffleText.prototype.setText = function (text) {
          this._originalStr = text;
          this._originalLength = text.length;
      };
      Object.defineProperty(ShuffleText.prototype, "isRunning", {
          /**
           * It is running flag. 再生中かどうかを示すブール値です。
           * @returns {boolean}
           */
          get: function () {
              return this.isRunning;
          },
          enumerable: true,
          configurable: true
      });
      /** Play effect. 再生を開始します。 */
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
          this._isRunning = true;
          this._requestAnimationFrameId = requestAnimationFrame(function () {
              _this._onInterval();
          });
          this._element.innerHTML = str;
      };
      /** Stop effect. 停止します。 */
      ShuffleText.prototype.stop = function () {
          this._isRunning = false;
          cancelAnimationFrame(this._requestAnimationFrameId);
      };
      /**
       * Dispose this instance.
       * メモリ解放のためインスタンスを破棄します。
       */
      ShuffleText.prototype.dispose = function () {
          cancelAnimationFrame(this._requestAnimationFrameId);
          this.sourceRandomCharacter = null;
          this.emptyCharacter = null;
          this._isRunning = false;
          this.duration = 0;
          this._originalStr = null;
          this._originalLength = 0;
          this._timeCurrent = 0;
          this._timeStart = 0;
          this._randomIndex = null;
          this._element = null;
          this._requestAnimationFrameId = 0;
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
              this._isRunning = false;
          }
          this._element.innerHTML = str;
          if (this._isRunning === true) {
              this._requestAnimationFrameId = requestAnimationFrame(function () {
                  _this._onInterval();
              });
          }
      };
      return ShuffleText;
  }());

  return ShuffleText;

}));
