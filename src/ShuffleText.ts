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

/**
 * DOMエレメント用ランダムテキストクラス
 * @param DOMエレメント
 */
export class ShuffleText {

  /** ランダムテキストに用いる文字列 */
  public sourceRandomCharacter:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  /** 空白に用いる文字列 */
  public emptyCharacter:string = "-";
  /** 再生中かどうかを示すブール値 */
  public isRunning:boolean = false;
  /** エフェクトの実行時間 */
  public duration:number = 600;
  private _originalStr:string = "";
  private _originalLength:number = 0;
  private _timeCurrent:number = 0;
  private _timeStart:number = 0;
  private _randomIndex:number[] = [];
  private _element:HTMLElement;

  constructor(element:HTMLElement) {
    this._element = element;
    this.setText(element.innerHTML);
  }

  /** テキストを設定します。 */
  public setText(text:string):void {
    this._originalStr = text;
    this._originalLength = text.length;
  }

  /** 再生を開始します。 */
  public start():void {
    this.stop();

    this._randomIndex = [];
    let str = "";
    for (let i = 0; i < this._originalLength; i++) {
      let rate = i / this._originalLength;
      this._randomIndex[i] = Math.random() * (1 - rate) + rate;
      str += this.emptyCharacter;
    }

    this._timeStart = new Date().getTime();
    this.isRunning = true;

    requestAnimationFrame(()=> {
      this._onInterval();
    });

    this._element.innerHTML = str;
  }

  /** 停止します。 */
  public stop():void {
    this.isRunning = false;
  }

  private _onInterval():void {
    this._timeCurrent = new Date().getTime() - this._timeStart;
    const percent = this._timeCurrent / this.duration;

    let str = "";
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
      this.isRunning = false;
    }
    this._element.innerHTML = str;

    if (this.isRunning === true) {
      requestAnimationFrame(()=> {
        this._onInterval();
      });
    }
  }
}
