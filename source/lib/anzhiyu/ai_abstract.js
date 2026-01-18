(function () {

  const {
    basicWordCount,
    btnLink,
    key: AIKey,
    Referer: AIReferer,
    gptName,
    mode: initialMode,
    afdianLink
  } = GLOBAL_CONFIG.postHeadAiDescription;

  const { title, postAI, pageFillDescription, recommendArticles } = GLOBAL_CONFIG_SITE;

  const post_ai = document.querySelector(".post-ai-description");
  if (!post_ai) return;

  const explanation = post_ai.querySelector(".ai-explanation");
  const aiTitleRefreshIcon = post_ai.querySelector(".anzhiyu-icon-arrow-rotate-right");
  const aiReadAloudIcon = post_ai.querySelector(".anzhiyu-icon-circle-dot");
  const aiToggleBtn = document.getElementById("ai-Toggle");
  const aiTag = document.getElementById("ai-tag");

  let mode = initialMode || "local";

  let aiStr = "";
  let indexI = 0;
  let animationRunning = false;
  let timeouts = [];
  let observer = null;

  function clearTimeouts() {
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];
  }

  function hardStopAI() {
    animationRunning = false;
    clearTimeouts();
    observer?.disconnect();
  }

  function startAI(str, loading = false) {
    hardStopAI();
    aiStr = str || "";
    indexI = 0;
    explanation.innerHTML = loading ? "生成中..." : "";

    observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      animationRunning = true;
      explanation.innerHTML = aiStr.charAt(0) || "";
      animate();
    });
    observer.observe(post_ai);
  }

  function animate() {
    if (!animationRunning || indexI >= aiStr.length - 1) {
      observer?.disconnect();
      return;
    }
    const char = aiStr.charAt(++indexI);
    explanation.innerHTML += char;
    const delay = /[,.，。!?！？]/.test(char) ? 120 : 30;
    timeouts.push(setTimeout(animate, delay));
  }

  function aiAbstractLocal() {
    const list = postAI.split(",").map(s => s.trim());
    startAI(list[Math.floor(Math.random() * list.length)]);
  }

  async function aiAbstractTianli(num = basicWordCount) {
    startAI("生成中...", true);
    try {
      const res = await fetch("https://summary.tianli0.top/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Referer: AIReferer
        },
        body: JSON.stringify({
          key: AIKey,
          content: (title + pageFillDescription).slice(0, num),
          url: location.href
        })
      });
      const data = await res.json();
      startAI(data.summary || "摘要生成失败");
    } catch {
      startAI("摘要生成失败");
    }
  }

  async function aiAbstractCloudflare(num = basicWordCount, force = false) {
    startAI(force ? "正在生成新摘要..." : "加载摘要...", true);
    try {
      const res = await fetch("https://ai.aresdev.qzz.io/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AIKey,
          Referer: AIReferer
        },
        body: JSON.stringify({
          text: document.querySelector(".post-content")?.innerText || "",
          basicWordCount: num,
          url: location.href,
          force
        })
      });
      const data = await res.json();
      startAI(data.summary || "摘要获取失败");
    } catch {
      startAI("摘要获取失败");
    }
  }

  function aiAbstract() {
    if (mode === "local") return aiAbstractLocal();
    if (mode === "tianli") return aiAbstractTianli();
    return aiAbstractCloudflare(basicWordCount); // 默认加载缓存
  }

  function refreshCloudflareSummary() {
    hardStopAI();
    aiAbstractCloudflare(basicWordCount, true); // force = true
  }

  function aiRecommend() {
    hardStopAI();
    explanation.innerHTML = "生成中...";
    setTimeout(() => {
      explanation.innerHTML = recommendList();
    }, 600);
  }

  function recommendList() {
    if (recommendArticles && recommendArticles.length > 0) {
      let list = "";
      for (let i = 0; i < recommendArticles.length && i < 5; i++) {
        const item = recommendArticles[i];
        list += `<div class="ai-recommend-item"><span class="index">${
          i + 1
        }：</span><a href="javascript:;" onclick="pjax.loadUrl('${item.url}')" title="${
          item.title
        }" data-pjax-state="">${item.title}</a></div>`;
      }
      return `推荐文章：<br /><div class="ai-recommend">${list}</div>`;
    }

    let thumbnail = document.querySelectorAll(".relatedPosts-list a");
    if (!thumbnail.length) {
      const cardRecentPost = document.querySelector(".card-widget.card-recent-post");
      if (!cardRecentPost) return "暂无推荐文章";

      thumbnail = cardRecentPost.querySelectorAll(".aside-list-item a");

      let list = "";
      for (let i = 0; i < thumbnail.length; i++) {
        const item = thumbnail[i];
        list += `<div class="ai-recommend-item"><span class="index">${
          i + 1
        }：</span><a href="javascript:;" onclick="pjax.loadUrl('${item.href}')" title="${
          item.title
        }" data-pjax-state="">${item.title}</a></div>`;
      }

      return `很抱歉，无法找到类似的文章，你也可以看看本站最新发布的文章：<br /><div class="ai-recommend">${list}</div>`;
    }

    let list = "";
    for (let i = 0; i < thumbnail.length; i++) {
      const item = thumbnail[i];
      list += `<div class="ai-recommend-item"><span>推荐${
        i + 1
      }：</span><a href="javascript:;" onclick="pjax.loadUrl('${item.href}')" title="${
        item.title
      }" data-pjax-state="">${item.title}</a></div>`;
    }

    return `推荐文章：<br /><div class="ai-recommend">${list}</div>`;
  }

  function aiGoHome() {
    hardStopAI();
    startAI("正在前往博客主页...");
    setTimeout(() => {
      window.pjax ? pjax.loadUrl("/") : location.href = "/";
    }, 800);
  }

  function introduce() {
    hardStopAI();
    const map = {
      local: `我是本地摘要助手`,
      cloudflare: `我是摘要助手 ${gptName} GPT`,
      tianli: "我是 TianliGPT 云端摘要助手"
    };
    startAI(map[mode]);
  }

  function initButtons() {
    post_ai.querySelectorAll(".ai-btn-item").forEach(btn => {
      const text = btn.innerText;
      if (/介绍/.test(text)) btn.onclick = introduce;
      if (/生成/.test(text)) btn.onclick = aiAbstract;
      if (/推荐/.test(text)) btn.onclick = aiRecommend;
      if (/主页/.test(text)) btn.onclick = aiGoHome;
    });

    const tianliBlogBtn = document.getElementById("go-tianli-blog");
    if (tianliBlogBtn) {
      tianliBlogBtn.onclick = () => {
        window.open(afdianLink || btnLink, "_blank");
      };
    }

    const afdianBtn = document.getElementById("go-afdian");
    if (afdianBtn && afdianLink) {
      afdianBtn.onclick = () => {
        window.open(afdianLink, "_blank");
      };
    }
  }

  function updateButtonVisibility() {
    post_ai.querySelectorAll(".ai-btn-item").forEach(btn => {
      btn.style.display = "block";
    });

    const afdianBtn = document.getElementById("go-afdian");
    if (afdianBtn) {
      afdianBtn.style.display = mode === "tianli" ? "block" : "none";
    }

    const tianliBtn = document.getElementById("go-tianli-blog");
    if (tianliBtn) {
      tianliBtn.style.display = mode === "tianli" ? "block" : "none";
    }

    aiTag.innerText = mode === "tianli" ? "TianliGPT" : `${gptName} GPT`;
    aiReadAloudIcon.style.opacity = mode === "tianli" ? "1" : "0";
  }

  function changeShowMode() {
    hardStopAI();
    mode = mode === "tianli" ? "cloudflare" : mode === "cloudflare" ? "local" : "tianli";
    updateButtonVisibility();
    aiAbstract();
  }

  aiToggleBtn?.addEventListener("click", changeShowMode);

  aiTitleRefreshIcon?.addEventListener("click", () => {
    if (mode === "cloudflare") {
      refreshCloudflareSummary();
    } else {
      aiAbstract();
    }
  });

  aiTag?.addEventListener("click", introduce);

  initButtons();
  updateButtonVisibility();
  aiAbstract();

})();
