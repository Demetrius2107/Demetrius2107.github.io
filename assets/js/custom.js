/**
 * 配色方案切换器（秋月橙 / 灰绿 / FixIt 原生蓝）
 * 通过 <html data-scheme="..."> 驱动 assets/css/_custom.scss 中的 [data-scheme] 变量块，
 * 选择持久化到 localStorage（键名 scheme），与主题自带的亮暗切换（键名 theme）互不冲突。
 *
 * FOUC 修复：data-scheme 已由 layouts/_partials/custom/fouc.html 在 <head> 内联提前设置，
 * 此处仅在 DOMContentLoaded 后补建切换按钮并同步图标状态。
 */
(function () {
  'use strict';

  var SCHEMES = [
    { id: 'autumn', label: '秋月橙', icon: 'fa-sun' },
    { id: 'sage', label: '灰绿', icon: 'fa-leaf' },
    { id: 'blue', label: '原生蓝', icon: 'fa-droplet' }
  ];
  var STORAGE_KEY = 'scheme';

  function currentIndex() {
    var saved = '';
    try { saved = localStorage.getItem(STORAGE_KEY) || ''; } catch (e) {}
    var idx = SCHEMES.findIndex(function (s) { return s.id === saved; });
    return idx >= 0 ? idx : 0;
  }

  function apply(index) {
    var scheme = SCHEMES[index % SCHEMES.length];
    document.documentElement.dataset.scheme = scheme.id;
    try { localStorage.setItem(STORAGE_KEY, scheme.id); } catch (e) {}
    document.querySelectorAll('.scheme-switch').forEach(function (btn) {
      btn.setAttribute('title', '配色：' + scheme.label + '（点击切换）');
      btn.setAttribute('aria-label', '配色：' + scheme.label + '（点击切换）');
      var icon = btn.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid ' + scheme.icon;
      }
    });
  }

  function next() {
    apply(currentIndex() + 1);
  }

  // 切换按钮：用 <button> 保证键盘可达，Enter/Space 原生触发 click
  function buildButton() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-item scheme-switch';
    btn.style.cursor = 'pointer';
    // 内嵌图标，与主题菜单图标风格一致
    btn.innerHTML = '<i class="fa-solid fa-palette"></i>';
    btn.addEventListener('click', next);
    return btn;
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.theme-switch').forEach(function (el) {
      if (!el.parentNode.querySelector(':scope > .scheme-switch')) {
        el.parentNode.insertBefore(buildButton(), el.nextSibling);
      }
    });
    apply(currentIndex());
  });
})();

/**
 * 文章阅读进度条
 * 在文章详情页顶部显示一条主色进度条，随滚动位置填充。
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var content = document.querySelector('.single-content') || document.querySelector('.single');
    if (!content) { return; }

    var bar = document.createElement('div');
    bar.className = 'reading-progress-bar';
    document.body.appendChild(bar);

    function update() {
      var rect = content.getBoundingClientRect();
      var total = content.offsetHeight - window.innerHeight;
      if (total <= 0) { bar.style.width = '0%'; return; }
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var pct = (scrolled / total) * 100;
      bar.style.width = pct + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
