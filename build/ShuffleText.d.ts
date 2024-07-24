/**
 * ShuffleText is random text effect class for DOM Elements.<br />
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
    /**
     * インターバルハンドラーです。
     */
    private _onInterval;
}
