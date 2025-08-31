document.addEventListener('DOMContentLoaded', () => {
  const hbBtn   = document.querySelector('.header__hb-btn');
  const nav     = document.getElementById('site-nav');
  const overlay = document.querySelector('.nav-overlay');
  const links   = nav.querySelectorAll('a');

  // メニューの開閉を切り替える関数
  function toggleMenu() {
    const isOpen = hbBtn.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');

    // アクセシビリティ属性も更新
    hbBtn.setAttribute('aria-expanded', isOpen);
    nav.setAttribute('aria-hidden', !isOpen);
  }

  // ハンバーガーボタンとオーバーレイをクリックしたら開閉
  hbBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // メニュー内リンクをクリックしたら閉じる（スマホ向けUX向上）
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (hbBtn.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
});

  // トップボタンとお問い合わせボタン
document.addEventListener('DOMContentLoaded', () => {
  const slot       = document.querySelector('.floating-slot');
  const pageTopBtn = document.getElementById('page-top');
  const SHOW_AFTER_PX = 200; // 何pxスクロールで表示するか

  function toggle() {
    const y = window.scrollY || window.pageYOffset;
    if (y > SHOW_AFTER_PX) {
      slot?.classList.remove('is-hidden');
    } else {
      slot?.classList.add('is-hidden');
    }
  }

  window.addEventListener('scroll', toggle, { passive: true });
  window.addEventListener('resize', toggle);
  toggle(); // 初期反映

  // トップへ（好みで 'smooth' にしてもOK）
  pageTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
});

//   document.addEventListener('DOMContentLoaded', () => {
//   const floatingBtn = document.getElementById('floating-btn');
//   const pageTopBtn  = document.getElementById('page-top');
//   const footer      = document.querySelector('footer');

//   const SHOW_AFTER_PX = 200;
//   const SAFE_GAP = 8;

//   let ticking = false;
//   let lastLift = -1; // 直前に適用した持ち上げ量（差分反映用）

//   function computeLift() {
//     if (!footer) return 0;
//     const rect = footer.getBoundingClientRect();
//     const overlap = window.innerHeight - rect.top; // 下端とフッター上端の差
//     if (overlap <= 0) return 0;

//     // 揺れ防止：整数化 + デバイスピクセルに丸め
//     const dpr = window.devicePixelRatio || 1;
//     const lift = Math.max(0, overlap + SAFE_GAP);
//     return Math.round(lift * dpr) / dpr;
//   }

//   function update() {
//     const scY = window.scrollY || window.pageYOffset;

//     // 表示/非表示（opacityだけ切替）
//     if (scY > SHOW_AFTER_PX) {
//       if (!floatingBtn.classList.contains('is-visible')) {
//         floatingBtn.classList.add('is-visible');
//       }
//     } else {
//       if (floatingBtn.classList.contains('is-visible')) {
//         floatingBtn.classList.remove('is-visible');
//       }
//       if (lastLift !== 0) {
//         floatingBtn.style.transform = 'translate3d(0,0,0)';
//         lastLift = 0;
//       }
//       ticking = false;
//       return;
//     }

//     // フッター手前だけ「カチッ」と持ち上げる（transformにtransitionは掛けない）
//     const lift = computeLift();
//     if (lift !== lastLift) {
//       if (lift > 0) {
//         floatingBtn.style.transform = `translate3d(0, -${lift}px, 0)`;
//       } else {
//         floatingBtn.style.transform = 'translate3d(0,0,0)';
//       }
//       lastLift = lift;
//     }

//     ticking = false;
//   }

//   function onScrollOrResize() {
//     if (!ticking) {
//       ticking = true;
//       requestAnimationFrame(update);
//     }
//   }

//   // 初期反映 & 監視
//   update();
//   window.addEventListener('scroll', onScrollOrResize, { passive: true });
//   window.addEventListener('resize', onScrollOrResize);

//   // トップへ戻る
//   pageTopBtn?.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'auto' });
//   });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const floatingBtn = document.getElementById('floating-btn');
//   const pageTopBtn  = document.getElementById('page-top');
//   const footer      = document.querySelector('footer');

//   // 何pxスクロールしたら表示するか
//   const threshold   = 200;

//   const SAFE_GAP    = 0;

//   let ticking = false;

//   function update() {
//     const scY = window.scrollY || window.pageYOffset;

//     // 即時の表示/非表示（アニメなし）
//     if (scY > threshold) {
//       floatingBtn.classList.add('is-visible');
//     } else {
//       floatingBtn.classList.remove('is-visible');
//       floatingBtn.style.bottom = '0px'; // 画面下に固定へ戻す
//       ticking = false;
//       return;
//     }


//     if (footer) {
//       const footRect = footer.getBoundingClientRect();
//       const overlap  = window.innerHeight - footRect.top;

//       const offset = overlap > 0 ? Math.max(0, Math.floor(overlap - SAFE_GAP)) : 0;

//       floatingBtn.style.bottom = offset + 'px';
//     } else {
//       floatingBtn.style.bottom = '0px';
//     }

//     ticking = false;
//   }

//   function onScrollOrResize() {
//     if (!ticking) {
//       ticking = true;
//       requestAnimationFrame(update); // 同一フレームで確定値のみ反映（カチッ挙動）
//     }
//   }

//   window.addEventListener('scroll', onScrollOrResize, { passive: true });
//   window.addEventListener('resize', onScrollOrResize);

//   // 初期反映
//   update();

//   // トップへ戻る（カチッと戻す場合は 'auto'）
//   pageTopBtn?.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'auto' });
//   });
// });


// リストページネーション
/**
 * 汎用ページネーション
 * options = {
 *   listSelector:   '記事リストの親要素セレクタ',
 *   pagerSelector:  'ページャー出力先セレクタ',
 *   itemsPerPage:   表示件数,
 *   delta:          前後に見せるページ数
 * }
 */
function initPagination({
  listSelector,
  pagerSelector,
  itemsPerPage = 10,
  delta = 2,
  pageParam = 'page'
}) {
  const listEl  = document.querySelector(listSelector);
  const pagerEl = document.querySelector(pagerSelector);
  if (!listEl || !pagerEl) return;

  const items = Array.from(listEl.children);
  const totalItems  = items.length;
  const totalPages  = Math.ceil(totalItems / itemsPerPage);

  // 1ページ以内なら非表示
  if (totalPages <= 1) {
    pagerEl.style.display = 'none';
    items.forEach(el => { el.style.display = ''; });
    const sp = new URLSearchParams(location.search);
    if (sp.has(pageParam)) {
      sp.delete(pageParam);
      const url = location.pathname + (sp.toString() ? '?' + sp.toString() : '') + location.hash;
      history.replaceState(null, '', url);
    }
    return;
  } else {
    pagerEl.style.display = '';
  }

  const params = new URLSearchParams(location.search);
  let currentPage = Number(params.get(pageParam)) || 1;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end   = start + itemsPerPage;
    items.forEach((item, i) => {
      item.style.display = (i >= start && i < end) ? '' : 'none';
    });
  }

  function getVisiblePages(current, total, d) {
    const pages = [1];
    const start = Math.max(2, current - d);
    const end   = Math.min(total - 1, current + d);
    for (let i = start; i <= end; i++) pages.push(i);
    if (total > 1) pages.push(total);

    const result = [];
    let prev = null;
    for (const p of pages) {
      if (prev !== null && p - prev > 1) result.push('ellipsis');
      result.push(p);
      prev = p;
    }
    return result;
  }

  function renderPager(page) {
    const vis = getVisiblePages(page, totalPages, delta);
    const sp  = new URLSearchParams(location.search);

    function makeHref(target) {
      const copy = new URLSearchParams(sp);
      if (target === 1) copy.delete(pageParam);
      else copy.set(pageParam, String(target));
      return location.pathname + (copy.toString() ? '?' + copy.toString() : '') + location.hash;
    }

    const parts = [];
    for (const item of vis) {
      if (item === 'ellipsis') {
        parts.push(`<li class="ellipsis" aria-hidden="true">…</li>`);
      } else if (item === page) {
        parts.push(`<li class="active"><a aria-current="page">${item}</a></li>`);
      } else {
        parts.push(`<li><a href="${makeHref(item)}">${item}</a></li>`);
      }
    }
    pagerEl.innerHTML = parts.join('');
  }

  function updateURL(page) {
    const sp = new URLSearchParams(location.search);
    if (page === 1) sp.delete(pageParam);
    else sp.set(pageParam, String(page));
    const url = location.pathname + (sp.toString() ? '?' + sp.toString() : '') + location.hash;
    history.replaceState(null, '', url);
  }

  function render(page) {
    showPage(page);
    renderPager(page);
    updateURL(page);
  }

  render(currentPage);

  pagerEl.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const num = Number(a.textContent.trim());
    if (!Number.isNaN(num) && num !== currentPage) {
      currentPage = num;
      render(currentPage);
    }
  });
}

// ===== 使用例 =====
initPagination({
  listSelector:  '#blog-list',
  pagerSelector: '#pagination',
  itemsPerPage:  10,
  delta:         2,
  pageParam:     'page'
});

initPagination({
  listSelector:  '#search-list',
  pagerSelector: '#pagination',
  itemsPerPage:  10,
  delta:         2,
  pageParam:     'sPage'
});

initPagination({
  listSelector:  '#graduation-list',
  pagerSelector: '#graduation-pagination',
  itemsPerPage:  10,
  delta:         2,
  pageParam:     'gPage'
});

// アコーディオンメニュー
document.addEventListener('DOMContentLoaded', () => {
  // FAQ 内の全質問ボタンを取得
  const questions = document.querySelectorAll('.main__faq .faq__question');

  questions.forEach(btn => {
    const panel  = btn.nextElementSibling;
    // トグル動作をまとめた関数
    function toggle() {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    }

    // 質問ボタンをタップで開閉
    btn.addEventListener('click', toggle);

    // 回答パネルをタップしても閉じる
    panel.addEventListener('click', toggle);
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   // FAQ 内の全質問ボタンを取得
//   const questions = document.querySelectorAll('.main__faq .faq__question');

//   questions.forEach(btn => {
//     btn.addEventListener('click', () => {
//       const panel    = btn.nextElementSibling;                       // 対応する回答パネル
//       const isOpen   = btn.getAttribute('aria-expanded') === 'true'; // 今開いているか？

//       // ── トグル動作 ──
//       btn.setAttribute('aria-expanded', String(!isOpen));
//       panel.hidden = isOpen;

//       // ── 「一度に1つだけ開く」なら他をすべて閉じる ──
//       if (!isOpen) {
//         questions.forEach(other => {
//           if (other !== btn) {
//             other.setAttribute('aria-expanded', 'false');
//             other.nextElementSibling.hidden = true;
//           }
//         });
//       }
//     });
//   });
// });