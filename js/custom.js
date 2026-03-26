// 自定义功能脚本

// 页面加载完成后执行
$(document).ready(function() {
  // 1. 实现年月筛选功能
  initYearMonthFilter();
  
  // 2. 为文章添加随机背景颜色
  addRandomBackgroundColors();
  
  // 3. 初始化点赞功能
  initLikeButton();
  
  // 4. 添加时间标签
  addTimeTags();
});

// 1. 年月筛选功能
function initYearMonthFilter() {
  // 检查是否在归档页面
  if ($('.page-archive').length > 0) {
    // 创建筛选控件
    var filterHtml = `
      <div class="archive-filter">
        <h3>按年月筛选</h3>
        <select id="year-filter">
          <option value="all">全部年份</option>
        </select>
        <select id="month-filter">
          <option value="all">全部月份</option>
        </select>
        <button id="filter-btn">筛选</button>
      </div>
    `;
    
    // 将筛选控件添加到归档页面顶部
    $('.archive').before(filterHtml);
    
    // 提取所有文章的年月信息
    var years = new Set();
    var months = new Set();
    
    $('.post-time').each(function() {
      var dateStr = $(this).attr('content');
      if (dateStr) {
        var year = dateStr.split('-')[0];
        var month = dateStr.split('-')[1];
        years.add(year);
        months.add(month);
      }
    });
    
    // 填充年份选项
    years.forEach(function(year) {
      $('#year-filter').append(`<option value="${year}">${year}年</option>`);
    });
    
    // 填充月份选项
    for (var i = 1; i <= 12; i++) {
      var monthStr = i.toString().padStart(2, '0');
      $('#month-filter').append(`<option value="${monthStr}">${monthStr}月</option>`);
    }
    
    // 筛选按钮点击事件
    $('#filter-btn').click(function() {
      var selectedYear = $('#year-filter').val();
      var selectedMonth = $('#month-filter').val();
      
      $('.post').each(function() {
        var postDate = $(this).find('.post-time').attr('content');
        var postYear = postDate.split('-')[0];
        var postMonth = postDate.split('-')[1];
        
        var showPost = true;
        if (selectedYear !== 'all' && postYear !== selectedYear) {
          showPost = false;
        }
        if (selectedMonth !== 'all' && postMonth !== selectedMonth) {
          showPost = false;
        }
        
        if (showPost) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  }
}

// 2. 为文章添加随机背景颜色
function addRandomBackgroundColors() {
  // 定义一组美观护眼的颜色
  var colors = [
    '#f8f9fa', // 浅灰白
    '#e8f4f8', // 浅蓝
    '#e8f5e8', // 浅绿
    '#fff3e0', // 浅橙
    '#f3e5f5', // 浅紫
    '#e0f7fa', // 浅青
    '#fffde7', // 浅黄
    '#f1f8e9'  // 浅黄绿
  ];
  
  // 为每篇文章添加随机背景颜色
  $('.post-block').each(function() {
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    $(this).css('background-color', randomColor);
    $(this).css('border-radius', '8px');
    $(this).css('padding', '20px');
    $(this).css('margin-bottom', '30px');
    $(this).css('box-shadow', '0 2px 8px rgba(0,0,0,0.08)');
  });
}

// 3. 初始化点赞功能
function initLikeButton() {
  // 为每篇文章添加点赞按钮
  $('.post-footer').each(function() {
    var postUrl = $(this).closest('.post-block').find('link[itemprop="mainEntityOfPage"]').attr('href');
    var likeCount = localStorage.getItem('like_' + postUrl) || 0;
    
    var likeButtonHtml = `
      <div class="post-like">
        <button class="like-btn" data-url="${postUrl}">
          <i class="fa fa-heart-o"></i>
          <span class="like-count">${likeCount}</span>
        </button>
      </div>
    `;
    
    $(this).append(likeButtonHtml);
  });
  
  // 点赞按钮点击事件
  $('.like-btn').click(function() {
    var postUrl = $(this).data('url');
    var likeCount = parseInt($(this).find('.like-count').text()) || 0;
    
    // 检查是否已经点赞
    if (!$(this).hasClass('liked')) {
      // 增加点赞数
      likeCount++;
      $(this).addClass('liked');
      $(this).find('i').removeClass('fa-heart-o').addClass('fa-heart');
      $(this).find('i').css('color', '#e74c3c');
    } else {
      // 取消点赞
      likeCount--;
      $(this).removeClass('liked');
      $(this).find('i').removeClass('fa-heart').addClass('fa-heart-o');
      $(this).find('i').css('color', '');
    }
    
    // 更新点赞数
    $(this).find('.like-count').text(likeCount);
    
    // 存储到本地存储
    localStorage.setItem('like_' + postUrl, likeCount);
  });
  
  // 恢复已点赞状态
  $('.like-btn').each(function() {
    var postUrl = $(this).data('url');
    var likeCount = localStorage.getItem('like_' + postUrl) || 0;
    
    if (likeCount > 0) {
      $(this).addClass('liked');
      $(this).find('i').removeClass('fa-heart-o').addClass('fa-heart');
      $(this).find('i').css('color', '#e74c3c');
    }
  });
}

// 4. 添加时间标签
function addTimeTags() {
  $('.post-meta').each(function() {
    var postDate = $(this).find('.post-time').attr('content');
    if (postDate) {
      var date = new Date(postDate);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      
      var timeTagHtml = `
        <span class="time-tag">
          <i class="fa fa-calendar"></i>
          ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}
        </span>
      `;
      
      $(this).append(timeTagHtml);
    }
  });
}
