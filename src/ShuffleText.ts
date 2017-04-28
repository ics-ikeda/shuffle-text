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
export default class ShuffleText {
  /**
   * The string for random text.
   * ランダムテキストに用いる文字列です。
   * @type {string}
   * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
   */
  public sourceRandomCharacter: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  /**
   * The string for effect space.
   * 空白に用いる文字列です。
   * @type {string}
   * @default '-'
   */
  public emptyCharacter: string = '-';

  /**
   * The milli seconds of effect time.
   * エフェクトの実行時間です。
   * @type {number}
   * @default 600
   */
  public duration: number = 600;

  private _isRunning: boolean = false;
  private _originalStr: string = '';
  private _originalLength: number = 0;
  private _timeCurrent: number = 0;
  private _timeStart: number = 0;
  private _randomIndex: number[] = [];
  private _element: HTMLElement;
  private _requestAnimationFrameId: number = 0;


  /**
   * Constructor.
   * @param element DOMエレメント
   */
  constructor(element: HTMLElement) {
    this._element = element;
    this.setText(element.innerHTML);
  }

  /** テキストを設定します。 */
  public setText(text: string): void {
    this._originalStr = text;
    this._originalLength = text.length;
  }

  /**
   * It is running flag. 再生中かどうかを示すブール値です。
   * @returns {boolean}
   */
  public get isRunning(): boolean {
    return this.isRunning;
  }

  /** 再生を開始します。 */
  public start(): void {
    this.stop();

    this._randomIndex = [];
    let str = '';
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

    this._element.innerHTML = str;
  }

  /** 停止します。 */
  public stop(): void {
    this._isRunning = false;
    cancelAnimationFrame(this._requestAnimationFrameId);
  }

  public dispose(): void {
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
  }

  /**
   * インターバルハンドラーです。
   * @private
   */
  private _onInterval(): void {
    this._timeCurrent = new Date().getTime() - this._timeStart;
    const percent = this._timeCurrent / this.duration;

    let str = '';
    for (let i = 0; i < this._originalLength; i++) {
      if (percent >= this._randomIndex[i]) {
        str += this._originalStr.charAt(i);
      } else if (percent < this._randomIndex[i] / 3) {
        str += this.emptyCharacter;
      } else {
        str += this.sourceRandomCharacter.charAt(Math.floor(Math.random() * (this.sourceRandomCharacter.length)));
      }
    }

    if (percent > 1) {
      str = this._originalStr;
      this._isRunning = false;
    }
    this._element.innerHTML = str;

    if (this._isRunning === true) {
      this._requestAnimationFrameId = requestAnimationFrame(() => {
        this._onInterval();
      });
    }
  }
}
