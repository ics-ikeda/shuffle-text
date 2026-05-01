/**
 * ShuffleText is random text effect class for DOM Elements.<br />
 * ShuffleTextはDOMエレメント用ランダムテキストクラスです。
 * @author IKEDA Yasunobu
 * @since 2012-02-07
 */
export default class ShuffleText {
    /**
     * Character mode constants for controlling the random character source.
     * @see characterMode
     */
    static readonly MODE: {
        readonly CHARS: "chars";
        readonly RANGES: "ranges";
        readonly MIXED: "mixed";
    };
    /**
     * Predefined Unicode code point ranges, grouped by script.
     * Each entry is a `[start, end]` inclusive tuple.
     * @see unicodeRanges
     */
    static readonly RANGES: {
        readonly CJK: {
            readonly RARE_A: [number, number];
            readonly COMPAT: [number, number];
            readonly RADICALS: [number, number];
            readonly KANGXI: [number, number];
            readonly UNIFIED: [number, number];
        };
    };
    /**
     * The string for random text.
     * ランダムテキストに用いる文字列です。
     * @type {string}
     * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
     */
    sourceRandomCharacter: string;
    /**
     * The string for effect space.<br />
     * 空白に用いる文字列です。
     * @default '-'
     */
    emptyCharacter: string;
    /**
     * The milli seconds of effect time.<br />
     * エフェクトの実行時間（ミリ秒）です。
     * @default 600
     */
    duration: number;
    /**
     * Controls which character pool is used for random characters during the effect.
     * Use ShuffleText.MODE constants to set this value.
     * @default ShuffleText.MODE.CHARS
     */
    characterMode: (typeof ShuffleText.MODE)[keyof typeof ShuffleText.MODE];
    /**
     * Unicode code point ranges to draw from when characterMode is RANGES or MIXED.
     * Each entry is a [start, end] inclusive tuple. Use ShuffleText.RANGES presets or provide custom tuples.
     * @default []
     */
    unicodeRanges: [number, number][];
    private _isRunning;
    private _originalStr;
    private _originalLength;
    private _timeCurrent;
    private _timeStart;
    private _randomIndex;
    private _element;
    private _requestAnimationFrameId;
    /**
     * @param element DOMエレメントです。
     */
    constructor(element: HTMLElement);
    /**
     * Set new strings. <br />
     * テキストを設定します。
     * @param text テキスト文字列です。
     */
    setText(text: string): void;
    /**
     * It is running flag. <br />
     * 再生中かどうかを示すブール値です。
     * @returns {boolean}
     */
    get isRunning(): boolean;
    /**
     * Play effect. <br />
     * 再生を開始します。
     */
    start(): void;
    /**
     * Stop effect.<br />
     * 停止します。
     */
    stop(): void;
    /**
     * Dispose this instance.<br />
     * メモリ解放のためインスタンスを破棄します。
     */
    dispose(): void;
    private _randomCharFromRanges;
    /** @internal */
    _getRandomChar(): string;
    /**
     * インターバルハンドラーです。
     */
    private _onInterval;
}
