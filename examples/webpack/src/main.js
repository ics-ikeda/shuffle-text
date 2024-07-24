import ShuffleText from "shuffle-text";

window.addEventListener("load", init);

function init() {
  /** @type {HTMLElement[]} */
  const elementList = document.querySelectorAll(".my-effect");

  for (let i = 0; i < elementList.length; i++) {

    const element = elementList[i];

    // インスタンスを取得する
    const effect = new ShuffleText(element);

    // マウスオーバー時に再生する
    element.addEventListener("mouseenter", () => {
      effect.start();
    });

    // マウスアウト時に再生する
    element.addEventListener("mouseleave", () => {
      effect.start();
    });

    // 初回を再生する
    effect.start();
  }
}
