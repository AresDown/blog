hexo.extend.tag.register('imgf', function(args){
  const filepath = args[0];
  const alt = args[1] || filepath;
  const repo = args[2] || 'default';

  // 主源映射表（Cloudflare Pages，可无限扩展）
  const primaries = {
    default: `https://ares-images-1.pages.dev/images/`,
    repo2:   `https://ares-images-2.pages.dev/images/`,
    repo3:   `https://ares-images-3.pages.dev/images/`
  };

  // 备用源映射表（GitHub Raw，可无限扩展）
  const backups = {
    default: `https://raw.githubusercontent.com/AresDown/ares-images-1/main/images/`,
    repo2:   `https://raw.githubusercontent.com/AresDown/备用仓库2/main/images/`,
    repo3:   `https://raw.githubusercontent.com/AresDown/备用仓库3/main/images/`
  };

  // 主源选择（如果 repo 不存在，fallback 到 default）
  const primaryBase = primaries[repo] || primaries.default;
  const primary = primaryBase + filepath;

  // 备用源选择（如果 repo 不存在，fallback 到 default）
  const backupBase = backups[repo] || backups.default;
  const backup = backupBase + filepath;

  return `
<img src="${primary}"
     onerror="this.onerror=null;this.src='${backup}';"
     alt="${alt}">
  `;
});

// 使用方法
// 默认仓库（仓库1）
// {% imgf hexo主题选择/theme-next.png NexT主题图标 %}
// 使用仓库2
// {% imgf hexo主题选择/theme-next.png NexT主题图标 repo2 %}
// 使用仓库3
// {% imgf hexo主题选择/theme-next.png NexT主题图标 repo3 %}