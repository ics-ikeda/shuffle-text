/**
 * ShuffleText is random text effect class for DOM Elements.
 * ShuffleTextはDOMエレメント用ランダムテキストクラスです。
 * @author Yasunobu Ikeda
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
     * エフェクトの実行時間です。
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
     * @param element DOMエレメント
     */
    constructor(element: HTMLElement);
    /** テキストを設定します。 */
    setText(text: string): void;
    /**
     * It is running flag. 再生中かどうかを示すブール値です。
     * @returns {boolean}
     */
    readonly isRunning: boolean;
    /** 再生を開始します。 */
    start(): void;
    /** 停止します。 */
    stop(): void;
    dispose(): void;
    /**
     * インターバルハンドラーです。
     * @private
     */
    private _onInterval();
}
