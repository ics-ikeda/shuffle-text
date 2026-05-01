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
  public static readonly MODE = {
    CHARS:  'chars',
    RANGES: 'ranges',
    MIXED:  'mixed',
  } as const;

  /**
   * Predefined Unicode code point ranges, grouped by script.
   * Each entry is a `[start, end]` inclusive tuple.
   * @see unicodeRanges
   */
  public static readonly RANGES = {
    CJK: {
      RARE_A:   [0x3400, 0x4dbf] as [number, number],
      COMPAT:   [0xf900, 0xfaff] as [number, number],
      RADICALS: [0x2e80, 0x2eff] as [number, number],
      KANGXI:   [0x2f00, 0x2fdf] as [number, number],
      UNIFIED:  [0x4e00, 0x9fff] as [number, number],
    },
    EMOJI: {
      EMOTICONS: [0x1F600, 0x1F64F] as [number, number],
      SYMBOLS:   [0x1F300, 0x1F5FF] as [number, number],
      TRANSPORT: [0x1F680, 0x1F6FF] as [number, number],
      PEOPLE:    [0x1F900, 0x1F9FF] as [number, number],
      MISC:      [0x2600,  0x26FF ] as [number, number],
    },
    HIEROGLYPHS: {
      EGYPTIAN:  [0x13000, 0x1342F] as [number, number],
    },
  } as const;

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
  /**
   * Controls which character pool is used for random characters during the effect.
   * Use ShuffleText.MODE constants to set this value.
   * @default ShuffleText.MODE.CHARS
   */
  public characterMode: (typeof ShuffleText.MODE)[keyof typeof ShuffleText.MODE] = ShuffleText.MODE.CHARS;
  /**
   * Unicode code point ranges to draw from when characterMode is RANGES or MIXED.
   * Each entry is a [start, end] inclusive tuple. Use ShuffleText.RANGES presets or provide custom tuples.
   * @default []
   */
  public unicodeRanges: [number, number][] = [];

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

  private _randomCharFromRanges(): string {
    const total = this.unicodeRanges.reduce((sum, r) => sum + r[1] - r[0] + 1, 0);
    let pick = Math.floor(Math.random() * total);
    for (const range of this.unicodeRanges) {
      const size = range[1] - range[0] + 1;
      if (pick < size) return String.fromCodePoint(range[0] + pick);
      pick -= size;
    }
    return String.fromCodePoint(this.unicodeRanges[this.unicodeRanges.length - 1][1]);
  }

  /** @internal */
  public _getRandomChar(): string {
    const mode = this.characterMode;
    const hasRanges = this.unicodeRanges.length > 0;

    if (mode === ShuffleText.MODE.RANGES) {
      return hasRanges
        ? this._randomCharFromRanges()
        : this.sourceRandomCharacter.charAt(
            Math.floor(Math.random() * this.sourceRandomCharacter.length)
          );
    }

    if (mode === ShuffleText.MODE.MIXED && hasRanges) {
      // 50/50 split: proportional weighting would make sourceRandomCharacter invisible with large CJK ranges
      return Math.random() < 0.5
        ? this._randomCharFromRanges()
        : this.sourceRandomCharacter.charAt(
            Math.floor(Math.random() * this.sourceRandomCharacter.length)
          );
    }

    return this.sourceRandomCharacter.charAt(
      Math.floor(Math.random() * this.sourceRandomCharacter.length)
    );
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
