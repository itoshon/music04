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
    const floatingBtn = document.getElementById('floating-btn');
    const pageTopBtn  = document.getElementById('page-top');
    const footer      = document.querySelector('footer');
    const threshold   = 200;  // 何pxスクロールしたら表示するか

    window.addEventListener('scroll', () => {
      const scY = window.scrollY;

      // 200px超えたら表示
      if (scY > threshold) {
        floatingBtn.style.display = 'flex';
      } else {
        floatingBtn.style.display = 'none';
        return;
      }

      // フッターと重なっているか判定
      const footRect = footer.getBoundingClientRect();
      const overlap  = window.innerHeight - footRect.top;

      if (overlap > 0) {
        // フッターにかかった分だけ上に浮かす
        floatingBtn.style.bottom = `${overlap}px`;
      } else {
        // 通常時は画面下
        floatingBtn.style.bottom = '0px';
      }
    });

    // トップへ戻る
    pageTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });


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
function initPagination({ listSelector, pagerSelector, itemsPerPage = 10, delta = 2 }) {
  const listEl  = document.querySelector(listSelector);
  const pagerEl = document.querySelector(pagerSelector);
  if (!listEl || !pagerEl) return;  // 存在しなければ何もしない

  const items      = Array.from(listEl.children);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const params     = new URLSearchParams(location.search);
  let currentPage  = Math.min(
    Math.max(Number(params.get('page')) || 1, 1),
    totalPages
  );

  function getVisiblePages(current, total, delta) {
    const pages = [1];
    const start = Math.max(2, current - delta);
    const end   = Math.min(total - 1, current + delta);
    for (let i = start; i <= end; i++) pages.push(i);
    if (total > 1) pages.push(total);

    const result = [];
    let prev = null;
    for (const p of pages) {
      if (prev !== null && p - prev > 1) result.push('…');
      result.push(p);
      prev = p;
    }
    return result;
  }

  function renderPager() {
    const visible = getVisiblePages(currentPage, totalPages, delta);
    pagerEl.innerHTML = visible.map(item => {
      if (item === '…') return `<li class="ellipsis">…</li>`;
      return item === currentPage
        ? `<li class="active"><a>${item}</a></li>`
        : `<li><a href="?page=${item}">${item}</a></li>`;
    }).join('');
  }

  function showPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end   = start + itemsPerPage;
    items.forEach((item, idx) => {
      item.style.display = idx >= start && idx < end ? '' : 'none';
    });
  }

  renderPager();
  showPage();

  pagerEl.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const num = Number(e.target.textContent);
      if (!Number.isNaN(num) && num !== currentPage) {
        currentPage = num;
        renderPager();
        showPage();
      }
    }
  });
}

// ：ブログリスト用
initPagination({
  listSelector:  '#blog-list',
  pagerSelector: '#pagination',
  itemsPerPage:  10,
  delta:         2
});

// ：検索ページ用
initPagination({
  listSelector:  '#search-list',
  pagerSelector: '#pagination',
  itemsPerPage:  10,
  delta:         2,
});

// 卒業実績リスト用
initPagination({
  listSelector:  '#graduation-list',
  pagerSelector: '#graduation-pagination',
  itemsPerPage:  10,
  delta:         2,
});

// アコーディオンメニュー
document.addEventListener('DOMContentLoaded', () => {
  // FAQ 内の全質問ボタンを取得
  const questions = document.querySelectorAll('.main__faq .faq__question');

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel    = btn.nextElementSibling;                       // 対応する回答パネル
      const isOpen   = btn.getAttribute('aria-expanded') === 'true'; // 今開いているか？

      // ── トグル動作 ──
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;

      // ── 「一度に1つだけ開く」なら他をすべて閉じる ──
      if (!isOpen) {
        questions.forEach(other => {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            other.nextElementSibling.hidden = true;
          }
        });
      }
    });
  });
});