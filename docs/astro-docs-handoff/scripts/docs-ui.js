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

  // Search shortcut
  var input = document.getElementById('searchInput');
  var search = document.getElementById('search');
  if (!/Mac|iPhone|iPad/.test(navigator.platform || '')) document.getElementById('kbdHint').textContent = 'Ctrl K';
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault(); search.classList.add('open'); input.focus(); input.select();
    }
    if (e.key === 'Escape') { closeDrawer(); if (document.activeElement === input) input.blur(); }
  });
  search.addEventListener('click', function () { search.classList.add('open'); input.focus(); });
  input.addEventListener('blur', function () { search.classList.remove('open'); });

  // Sidebar collapse
  document.querySelectorAll('.group-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var g = btn.closest('.group');
      var open = g.dataset.open !== 'true';
      g.dataset.open = String(open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Drawer
  var menuBtn = document.getElementById('menuBtn');
  function closeDrawer() { document.body.classList.remove('drawer-open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () {
    var open = !document.body.classList.contains('drawer-open');
    document.body.classList.toggle('drawer-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.getElementById('scrim').addEventListener('click', closeDrawer);

  // Copy
  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = Array.prototype.map.call(document.getElementById(btn.dataset.copy).querySelectorAll('.ln'), function (l) { return l.textContent; }).join('\n');
      function ok() {
        btn.classList.add('done'); btn.querySelector('span').textContent = 'Đã chép';
        btn.querySelector('use').setAttribute('href', '#i-check');
        clearTimeout(btn._t); btn._t = setTimeout(function () {
          btn.classList.remove('done'); btn.querySelector('span').textContent = 'Sao chép';
          btn.querySelector('use').setAttribute('href', '#i-copy');
        }, 1800);
      }
      function fallback() {
        var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        ta.remove(); ok();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback);
      else fallback();
    });
  });

  // TOC scroll-spy
  var links = Array.prototype.slice.call(document.querySelectorAll('#toc a'));
  var ind = document.getElementById('tocInd');
  var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var current = -1;
  function setActive(i) {
    if (i === current) return; current = i;
    links.forEach(function (a, j) { a.classList.toggle('active', j === i); });
    if (i < 0) { ind.style.opacity = 0; return; }
    var a = links[i];
    ind.style.opacity = 1; ind.style.top = a.offsetTop + 'px'; ind.style.height = a.offsetHeight + 'px';
  }
  function spy() {
    var y = window.scrollY + 120, idx = 0;
    for (var i = 0; i < targets.length; i++) { if (targets[i].offsetTop <= y) idx = i; }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) idx = targets.length - 1;
    setActive(idx);
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { spy(); ticking = false; }); } }, { passive: true });
  window.addEventListener('resize', function () { current = -1; spy(); });
  document.fonts && document.fonts.ready.then(function () { current = -1; spy(); });
  spy();

  document.getElementById('toTop').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
