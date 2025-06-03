// ここから──「ドラッグでグリグリ横スクロール」の実装
document.addEventListener("DOMContentLoaded", function(){
  // SimpleBarが適用された内部の content 要素を取得
  // SimpleBar は data-simplebar をつけた要素の直下に .simplebar-content-wrapper が自動で生成される
  const wrappers = document.querySelectorAll(".table-wrapper[data-simplebar]");

  wrappers.forEach(wrapper => {
    const content = wrapper.querySelector(".simplebar-content-wrapper");
    let isDragging = false;
    let startX, scrollLeft;

    // マウスダウンした瞬間
    content.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - content.offsetLeft;
      // 現在のスクロール位置を保存
      scrollLeft = content.scrollLeft;
      content.style.cursor = "grabbing";
      e.preventDefault(); // テキスト選択などを抑制
    });

    // マウスを動かしている間
    content.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const x = e.pageX - content.offsetLeft;
      const walk = (startX - x); // どれだけ移動したか
      content.scrollLeft = scrollLeft + walk;
    });

    // マウスアップ or マウスが外れたときにドラッグを終了
    ["mouseup", "mouseleave"].forEach(evt => {
      content.addEventListener(evt, () => {
        isDragging = false;
        content.style.cursor = "grab";
      });
    });

    // 最初は「つまむ」イメージとしてカーソルを grab にしておく
    content.style.cursor = "grab";
  });
});