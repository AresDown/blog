(function () {

  const {
    basicWordCount,
    btnLink,
    key: AIKey,
    Referer: AIReferer,
    gptName,
    mode: initialMode
  } = GLOBAL_CONFIG.postHeadAiDescription;

  const { title, postAI, pageFillDescription } = GLOBAL_CONFIG_SITE;

  const post_ai = document.querySelector(".post-ai-description");
  if (!post_ai) return;

  const explanation = post_ai.querySelector(".ai-explanation");
  const aiTitleRefreshIcon = post_ai.querySelector(".anzhiyu-icon-arrow-rotate-right");
  const aiReadAloudIcon = post_ai.querySelector(".anzhiyu-icon-circle-dot");
  const aiToggleBtn = document.getElementById("ai-Toggle");
  const aiTag = document.getElementById("ai-tag");

  let mode = initialMode || "local";

  /* =========================
     动画与中断控制
  ========================= */
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

  /* =========================
     AI 摘要功能
  ========================= */
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

  async function aiAbstractCloudflare(num = basicWordCount) {
    startAI("加载摘要...", true);
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
          url: location.href
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
    return aiAbstractCloudflare();
  }

  /* =========================
     Cloudflare 专用刷新
  ========================= */
  function refreshCloudflareSummary() {
    hardStopAI();
    aiAbstractCloudflare(basicWordCount);
  }

  /* =========================
     其他功能
  ========================= */
  function aiRecommend() {
    hardStopAI();
    const map = new Map();
    document.querySelectorAll(".relatedPosts-list a,.aside-list-item a").forEach(a => {
      if (a.href !== location.href) map.set(a.href, a.title);
    });

    if (!map.size) {
      explanation.innerHTML = "暂无推荐文章";
      return;
    }

    explanation.innerHTML = `
      <div class="ai-recommend">
        ${[...map.entries()].slice(0, 5).map(
          ([u, t], i) =>
            `<div>${i + 1}：<a href="javascript:;" onclick="pjax.loadUrl('${u}')">${t}</a></div>`
        ).join("")}
      </div>
    `;
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
      local: `我是本地摘要助手 ${gptName} GPT`,
      cloudflare: `我是 Cloudflare 摘要助手 ${gptName} GPT`,
      tianli: "我是 TianliGPT 云端摘要助手"
    };
    startAI(map[mode]);
  }

  /* =========================
     按钮绑定
  ========================= */
  function initButtons() {
    post_ai.querySelectorAll(".ai-btn-item").forEach(btn => {
      const text = btn.innerText;
      if (/介绍/.test(text)) btn.onclick = introduce;
      if (/生成/.test(text)) btn.onclick = aiAbstract;
      if (/推荐/.test(text)) btn.onclick = aiRecommend;
      if (/主页/.test(text)) btn.onclick = aiGoHome;
    });
  }

  function updateButtonVisibility() {
    post_ai.querySelectorAll(".ai-btn-item").forEach(btn => {
      btn.style.display = "block";
    });

    const tianliBtn = document.getElementById("go-tianli-blog");
    if (tianliBtn) {
      tianliBtn.style.display = mode === "tianli" ? "block" : "none";
    }

    aiTag.innerText = mode === "tianli" ? "TianliGPT" : `${gptName} GPT`;
    aiReadAloudIcon.style.opacity = mode === "tianli" ? "1" : "0";
  }

  /* =========================
     模式切换
  ========================= */
  function changeShowMode() {
    hardStopAI();
    mode = mode === "tianli" ? "cloudflare" : mode === "cloudflare" ? "local" : "tianli";
    updateButtonVisibility();
    aiAbstract();
  }

  /* =========================
     事件绑定 & 初始化
  ========================= */
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
