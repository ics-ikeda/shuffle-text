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
  public sourceRandomCharacter: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  /**
   * The string for effect space.<br />
   * 空白に用いる文字列です。
   * @default '-'
   */
  public emptyCharacter: string = "-";

  /**
   * The milli seconds of effect time.<br />
   * エフェクトの実行時間（ミリ秒）です。
   * @default 600
   */
  public duration: number = 600;

  private _isRunning: boolean = false;
  private _originalStr: string = "";
  private _originalLength: number = 0;
  private _timeCurrent: number = 0;
  private _timeStart: number = 0;
  private _randomIndex: number[] = [];
  private _element: HTMLElement | null = null;
  private _requestAnimationFrameId: number = 0;

  /**
   * @param element DOMエレメントです。
   */
  constructor(element: HTMLElement) {
    this._element = element;
    this.setText(element.textContent ?? "");
  }

  /**
   * Set new strings. <br />
   * テキストを設定します。
   * @param text テキスト文字列です。
   */
  public setText(text: string): void {
    this._originalStr = text;
    this._originalLength = text.length;
  }

  /**
   * It is running flag. <br />
   * 再生中かどうかを示すブール値です。
   * @returns {boolean}
   */
  public get isRunning(): boolean {
    return this._isRunning;
  }

  /**
   * Play effect. <br />
   * 再生を開始します。
   */
  public start(): void {
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
  public stop(): void {
    this._isRunning = false;
    cancelAnimationFrame(this._requestAnimationFrameId);
  }

  /**
   * Dispose this instance.<br />
   * メモリ解放のためインスタンスを破棄します。
   */
  public dispose(): void {
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

  /**
   * インターバルハンドラーです。
   */
  private _onInterval(): void {
    this._timeCurrent = new Date().getTime() - this._timeStart;
    const percent = this._timeCurrent / this.duration;

    let str = "";
    for (let i = 0; i < this._originalLength; i++) {
      if (percent >= this._randomIndex[i]) {
        str += this._originalStr.charAt(i);
      } else if (percent < this._randomIndex[i] / 3) {
        str += this.emptyCharacter;
      } else {
        str += this.sourceRandomCharacter.charAt(
          Math.floor(Math.random() * this.sourceRandomCharacter.length),
        );
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
