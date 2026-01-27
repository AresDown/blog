let anchorApplied = false;

hexo.extend.filter.register('markdown-it:renderer', function (md) {
  if (anchorApplied) return;
  anchorApplied = true;

  const anchor = require('markdown-it-anchor');

  const mySlugify = s => {
    return String(s)
      .replace(/🔗/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/[#\s]+/g, ' ')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      // ✅ 保留中文、字母、数字、连字符
      .replace(/[^\p{L}\p{N}\-]+/gu, '');
  };

  md.use(anchor, {
    level: [1, 2, 3, 4, 5, 6],
    permalink: anchor.permalink.linkInsideHeader({
      symbol: '🔗',
      placement: 'before',
      class: 'header-anchor'
    }),
    slugify: mySlugify
  });
});
