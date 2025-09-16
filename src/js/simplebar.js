document.addEventListener("DOMContentLoaded", function() {
  // まず SP かどうかを判定する
  const isSP = window.matchMedia("(max-width: 767px)").matches;
  if (!isSP) {
    // PC ならここで処理を打ち切って何もしない
    return;
  }

  // ここ以降は SP のときのみ実行される
  const wrappers = document.querySelectorAll(".table-wrapper[data-simplebar]");

  wrappers.forEach(wrapper => {
    const content = wrapper.querySelector(".simplebar-content-wrapper");
    let isDragging = false;
    let startX, scrollLeft;

    // マウスダウンまたはタッチスタート時（SP の場合、タッチ操作も考えたい場合は touchstart を追加してもOK）
    content.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - content.offsetLeft;
      scrollLeft = content.scrollLeft;
      // SP のときだけ grab → grabbing に切り替える
      content.style.cursor = "grabbing";
      e.preventDefault();
    });

    // マウス移動時
    content.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const x = e.pageX - content.offsetLeft;
      const walk = (startX - x);
      content.scrollLeft = scrollLeft + walk;
    });

    // マウスアップまたはマウスが外れたとき
    ["mouseup", "mouseleave"].forEach(evt => {
      content.addEventListener(evt, () => {
        isDragging = false;
        // SP であっても、ドラッグが終わったら cursor を空文字にして CSS に戻す
        content.style.cursor = "";
      });
    });
  });

  // 画面がリサイズされて PC ⇄ SP が切り替わったときにも再判定したい場合
  window.addEventListener("resize", () => {
    const nowSP = window.matchMedia("(max-width: 767px)").matches;

    if (nowSP !== isSP) {
      window.location.reload();
    }
  });
});
