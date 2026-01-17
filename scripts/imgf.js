const path = require('path');

const imagesData = hexo.locals.get('data').images || {};

hexo.extend.tag.register('imgf', function(args){
  const filepath = args[0]; // 第一个参数永远是文件路径

  // 默认值
  let alt = filepath;
  let repo = 'default';
  let width = null;
  let height = null;

  // 智能解析参数
  for (let i = 1; i < args.length; i++) {
    const val = args[i];

    // 数字 → width 或 height
    if (/^\d+$/.test(val)) {
      if (!width) width = val;
      else if (!height) height = val;
      continue;
    }

    // repo
    if (['default', 'repo2', 'repo3'].includes(val)) {
      repo = val;
      continue;
    }

    // alt
    alt = val;
  }

  // 自动填充宽高（如果用户没有手动写）
  if (!width || !height) {
    const key = filepath; // JSON 的 key 就是 filepath
    if (imagesData[key]) {
      width = width || imagesData[key].width;
      height = height || imagesData[key].height;
    }
  }

  // 主源映射表（Cloudflare Pages）
  const primaries = {
    default: `https://img.aresdev.qzz.io/images/`,
    repo2:   `https://img2.aresdev.qzz.io/images/`,
    repo3:   `https://img3.aresdev.qzz.io/images/`
  };

  // 备用源映射表（GitHub Raw）
  const backups = {
    default: `https://raw.githubusercontent.com/AresDown/ares-images-1/main/images/`,
    repo2:   `https://raw.githubusercontent.com/AresDown/备用仓库2/main/images/`,
    repo3:   `https://raw.githubusercontent.com/AresDown/备用仓库3/main/images/`
  };

  const primary = primaries[repo] + filepath;
  const backup = backups[repo] + filepath;

  // 宽高属性
  const sizeAttr =
    (width ? ` width="${width}"` : '') +
    (height ? ` height="${height}"` : '');

  return `
<img src="${primary}"
     onerror="this.onerror=null;this.src='${backup}';"
     alt="${alt}"${sizeAttr}>
  `;
});

// 使用方法
// 默认仓库（仓库1）
// {% imgf hexo主题选择/theme-next.png NexT主题图标 %}
// 使用仓库2
// {% imgf hexo主题选择/theme-next.png NexT主题图标 repo2 %}
// 使用仓库3
// {% imgf hexo主题选择/theme-next.png NexT主题图标 repo3 %}
// 新增：添加宽高参数(不添加默认自动调整)
//{% imgf filepath alt repo width height %}
