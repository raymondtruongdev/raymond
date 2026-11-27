(function () {
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var segBtns = document.querySelectorAll('.seg button');

  function apply(pref) {
    var dark = pref === 'dark' || (pref === 'system' && mq.matches);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.setAttribute('data-pref', pref);
    segBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.set === pref)); });
  }
  apply(root.getAttribute('data-pref') || 'system');
  segBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      try { localStorage.setItem('rd-theme', b.dataset.set); } catch (e) {}
      apply(b.dataset.set);
    });
  });
  mq.addEventListener && mq.addEventListener('change', function () {
    if (root.getAttribute('data-pref') === 'system') apply('system');
  });

  // Mobile drawer
  var menuBtn = document.getElementById('menuBtn');
  var useEl = menuBtn.querySelector('use');
  function setDrawer(open) {
    document.body.classList.toggle('drawer-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    useEl.setAttribute('href', open ? '#i-x' : '#i-menu');
  }
  menuBtn.addEventListener('click', function () { setDrawer(!document.body.classList.contains('drawer-open')); });
  document.getElementById('scrim').addEventListener('click', function () { setDrawer(false); });
  document.querySelectorAll('#drawer a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 899) setDrawer(false); });

  // Timeline "Xem thêm"
  document.querySelectorAll('.toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = document.getElementById(btn.getAttribute('aria-controls'));
      var open = !card.classList.contains('open');
      card.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.firstChild.nodeValue = open ? 'Thu gọn ' : 'Xem thêm ';
    });
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el, i) {
      var sib = el.parentElement.querySelectorAll(':scope > .reveal');
      var idx = Array.prototype.indexOf.call(sib, el);
      el.style.transitionDelay = (Math.min(idx, 4) * 60) + 'ms';
      io.observe(el);
    });
  }
})();
