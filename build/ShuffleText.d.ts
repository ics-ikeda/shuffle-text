/**
 * ShuffleText is random text effect class for DOM Elements.
 * ShuffleTextはDOMエレメント用ランダムテキストクラスです。
 * @author IKEDA Yasunobu
 * @since 2012-02-07
 */
export default class ShuffleText {
    /**
     * The string for random text.
     * ランダムテキストに用いる文字列です。
     * @type {string}
     * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
     */
    sourceRandomCharacter: string;
    /**
     * The string for effect space.
     * 空白に用いる文字列です。
     * @type {string}
     * @default '-'
     */
    emptyCharacter: string;
    /**
     * The milli seconds of effect time.
     * エフェクトの実行時間（ミリ秒）です。
     * @type {number}
     * @default 600
     */
    duration: number;
    private _isRunning;
    private _originalStr;
    private _originalLength;
    private _timeCurrent;
    private _timeStart;
    private _randomIndex;
    private _element;
    private _requestAnimationFrameId;
    /**
     * Constructor.
     * @param element DOMエレメントです。
     */
    constructor(element: HTMLElement);
    /**
     * Set new strings. テキストを設定します。
     * @param text テキスト文字列です。
     */
    setText(text: string): void;
    /**
     * It is running flag. 再生中かどうかを示すブール値です。
     * @returns {boolean}
     */
    get isRunning(): boolean;
    /** Play effect. 再生を開始します。 */
    start(): void;
    /** Stop effect. 停止します。 */
    stop(): void;
    /**
     * Dispose this instance.
     * メモリ解放のためインスタンスを破棄します。
     */
    dispose(): void;
    /**
     * インターバルハンドラーです。
     * @private
     */
    private _onInterval;
}
