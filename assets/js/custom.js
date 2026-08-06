/**
 * 配色方案切换器（秋月橙 / 灰绿 / FixIt 原生蓝）
 * 通过 <html data-scheme="..."> 驱动 assets/css/_custom.scss 中的 [data-scheme] 变量块，
 * 选择持久化到 localStorage（键名 scheme），与主题自带的亮暗切换（键名 theme）互不冲突。
 */
(function () {
  'use strict';

  const SCHEMES = [
    { id: 'autumn', label: '秋月橙', icon: 'fa-sun' },
    { id: 'sage', label: '灰绿', icon: 'fa-leaf' },
    { id: 'blue', label: '原生蓝', icon: 'fa-droplet' },
  ];
  const STORAGE_KEY = 'scheme';

  function currentIndex() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const idx = SCHEMES.findIndex((s) => s.id === saved);
    return idx >= 0 ? idx : 0;
  }

  function apply(index) {
    const scheme = SCHEMES[index % SCHEMES.length];
    document.documentElement.dataset.scheme = scheme.id;
    localStorage.setItem(STORAGE_KEY, scheme.id);
    document.querySelectorAll('.scheme-switch').forEach((btn) => {
      btn.title = '配色：' + scheme.label + '（点击切换）';
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid ' + scheme.icon;
      }
    });
  }

  function buildButton() {
    const btn = document.createElement('li');
    btn.className = 'menu-item scheme-switch';
    btn.setAttribute('role', 'button');
    btn.style.cursor = 'pointer';
    btn.innerHTML = '<i class="fa-solid fa-palette"></i>';
    btn.addEventListener('click', () => {
      apply(currentIndex() + 1);
    });
    return btn;
  }

  // 立即应用持久化的配色（避免首屏闪烁）
  apply(currentIndex());

  // 在亮暗切换按钮旁边注入配色切换按钮
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-switch').forEach((el) => {
      if (!el.parentNode.querySelector(':scope > .scheme-switch')) {
        el.parentNode.insertBefore(buildButton(), el.nextSibling);
      }
    });
    apply(currentIndex());
  });
})();
