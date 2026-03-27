// 自定义功能脚本

// 页面加载完成后执行
$(document).ready(function() {
  // 1. 初始化点赞功能
  initLikeButton();
  
  // 2. 添加时间标签
  addTimeTags();
});

// 移除随机背景颜色功能，采用统一的苹果风格设计

// 1. 初始化点赞功能
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

// 2. 添加时间标签
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

// 3. 文章目录展开/收起功能
function togglePosts() {
  var postsContainer = $('#posts-container');
  var toggleBtn = $('.toggle-btn');
  var icon = toggleBtn.find('i');
  
  if (postsContainer.is(':visible')) {
    postsContainer.slideUp();
    icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
  } else {
    postsContainer.slideDown();
    icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
  }
}
