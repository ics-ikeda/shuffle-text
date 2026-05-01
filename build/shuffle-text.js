(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ShuffleText = factory());
})(this, (function () { 'use strict';

    /**
     * ShuffleText is random text effect class for DOM Elements.<br />
     * ShuffleTextはDOMエレメント用ランダムテキストクラスです。
     * @author IKEDA Yasunobu
     * @since 2012-02-07
     */
    class ShuffleText {
        /**
         * @param element DOMエレメントです。
         */
        constructor(element) {
            /**
             * The string for random text.
             * ランダムテキストに用いる文字列です。
             * @type {string}
             * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
             */
            this.sourceRandomCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            /**
             * The string for effect space.<br />
             * 空白に用いる文字列です。
             * @default '-'
             */
            this.emptyCharacter = "-";
            /**
             * The milli seconds of effect time.<br />
             * エフェクトの実行時間（ミリ秒）です。
             * @default 600
             */
            this.duration = 600;
            /**
             * Controls which character pool is used for random characters during the effect.
             * Use ShuffleText.MODE constants to set this value.
             * @default ShuffleText.MODE.CHARS
             */
            this.characterMode = ShuffleText.MODE.CHARS;
            /**
             * Unicode code point ranges to draw from when characterMode is RANGES or MIXED.
             * Each entry is a [start, end] inclusive tuple. Use ShuffleText.RANGES presets or provide custom tuples.
             * @default []
             */
            this.unicodeRanges = [];
            this._isRunning = false;
            this._originalStr = "";
            this._originalLength = 0;
            this._timeCurrent = 0;
            this._timeStart = 0;
            this._randomIndex = [];
            this._element = null;
            this._requestAnimationFrameId = 0;
            this._element = element;
            this.setText(element.textContent ?? "");
        }
        /**
         * Set new strings. <br />
         * テキストを設定します。
         * @param text テキスト文字列です。
         */
        setText(text) {
            this._originalStr = text;
            this._originalLength = text.length;
        }
        /**
         * It is running flag. <br />
         * 再生中かどうかを示すブール値です。
         * @returns {boolean}
         */
        get isRunning() {
            return this._isRunning;
        }
        /**
         * Play effect. <br />
         * 再生を開始します。
         */
        start() {
            this.stop();
            this._randomIndex = [];
            let str = "";
            for (let i = 0; i < this._originalLength; i++) {
                let rate = i / this._originalLength;
                this._randomIndex[i] = Math.random() * (1 - rate) + rate;
                str += this.emptyCharacter;
            }
            this._timeStart = new Date().getTime();
            this._isRunning = true;
            this._requestAnimationFrameId = requestAnimationFrame(() => {
                this._onInterval();
            });
            if (this._element) {
                this._element.textContent = str;
            }
        }
        /**
         * Stop effect.<br />
         * 停止します。
         */
        stop() {
            this._isRunning = false;
            cancelAnimationFrame(this._requestAnimationFrameId);
        }
        /**
         * Dispose this instance.<br />
         * メモリ解放のためインスタンスを破棄します。
         */
        dispose() {
            cancelAnimationFrame(this._requestAnimationFrameId);
            this._isRunning = false;
            this.duration = 0;
            this._originalStr = "";
            this._originalLength = 0;
            this._timeCurrent = 0;
            this._timeStart = 0;
            this._randomIndex = [];
            this._element = null;
            this._requestAnimationFrameId = 0;
        }
        _randomCharFromRanges() {
            const total = this.unicodeRanges.reduce((sum, r) => sum + r[1] - r[0] + 1, 0);
            let pick = Math.floor(Math.random() * total);
            for (const range of this.unicodeRanges) {
                const size = range[1] - range[0] + 1;
                if (pick < size)
                    return String.fromCodePoint(range[0] + pick);
                pick -= size;
            }
            return String.fromCodePoint(this.unicodeRanges[this.unicodeRanges.length - 1][1]);
        }
        /** @internal */
        _getRandomChar() {
            const mode = this.characterMode;
            const hasRanges = this.unicodeRanges.length > 0;
            if (mode === ShuffleText.MODE.RANGES) {
                return hasRanges
                    ? this._randomCharFromRanges()
                    : this.sourceRandomCharacter.charAt(Math.floor(Math.random() * this.sourceRandomCharacter.length));
            }
            if (mode === ShuffleText.MODE.MIXED && hasRanges) {
                // 50/50 split: proportional weighting would make sourceRandomCharacter invisible with large CJK ranges
                return Math.random() < 0.5
                    ? this._randomCharFromRanges()
                    : this.sourceRandomCharacter.charAt(Math.floor(Math.random() * this.sourceRandomCharacter.length));
            }
            return this.sourceRandomCharacter.charAt(Math.floor(Math.random() * this.sourceRandomCharacter.length));
        }
        /**
         * インターバルハンドラーです。
         */
        _onInterval() {
            this._timeCurrent = new Date().getTime() - this._timeStart;
            const percent = this._timeCurrent / this.duration;
            let str = "";
            for (let i = 0; i < this._originalLength; i++) {
                if (percent >= this._randomIndex[i]) {
                    str += this._originalStr.charAt(i);
                }
                else if (percent < this._randomIndex[i] / 3) {
                    str += this.emptyCharacter;
                }
                else {
                    str += this._getRandomChar();
                }
            }
            if (percent > 1) {
                str = this._originalStr;
                this._isRunning = false;
            }
            if (this._element) {
                this._element.textContent = str;
            }
            if (this._isRunning) {
                this._requestAnimationFrameId = requestAnimationFrame(() => {
                    this._onInterval();
                });
            }
        }
    }
    /**
     * Character mode constants for controlling the random character source.
     * @see characterMode
     */
    ShuffleText.MODE = {
        CHARS: 'chars',
        RANGES: 'ranges',
        MIXED: 'mixed',
    };
    /**
     * Predefined Unicode code point ranges, grouped by script.
     * Each entry is a `[start, end]` inclusive tuple.
     * @see unicodeRanges
     */
    ShuffleText.RANGES = {
        CJK: {
            RARE_A: [0x3400, 0x4dbf],
            COMPAT: [0xf900, 0xfaff],
            RADICALS: [0x2e80, 0x2eff],
            KANGXI: [0x2f00, 0x2fdf],
            UNIFIED: [0x4e00, 0x9fff],
        },
        EMOJI: {
            EMOTICONS: [0x1F600, 0x1F64F],
            SYMBOLS: [0x1F300, 0x1F5FF],
            TRANSPORT: [0x1F680, 0x1F6FF],
            PEOPLE: [0x1F900, 0x1F9FF],
            MISC: [0x2600, 0x26FF],
        },
        HIEROGLYPHS: {
            EGYPTIAN: [0x13000, 0x1342F],
        },
    };

    return ShuffleText;

}));
