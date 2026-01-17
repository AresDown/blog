(function () {
  const { randomNum, basicWordCount, btnLink, key: AIKey, Referer: AIReferer, gptName, switchBtn, mode: initialMode } = GLOBAL_CONFIG.postHeadAiDescription;
  const { title, postAI, pageFillDescription } = GLOBAL_CONFIG_SITE;

  let lastAiRandomIndex = -1, animationRunning = true, mode = initialMode, refreshNum = 0, prevParam;
  let audio = null, isPaused = false, summaryID = null;
  const post_ai = document.querySelector(".post-ai-description");
  const aiTitleRefreshIcon = post_ai.querySelector(".ai-title .anzhiyufont.anzhiyu-icon-arrow-rotate-right");
  let aiReadAloudIcon = post_ai.querySelector(".anzhiyufont.anzhiyu-icon-circle-dot");
  const explanation = post_ai.querySelector(".ai-explanation");
  let aiStr = "", aiStrLength = "", delayInit = 600, indexI = 0, indexJ = 0, timeouts = [], elapsed = 0;
  const observer = createIntersectionObserver();
  const aiFunctions = [introduce, aiTitleRefreshIconClick, aiRecommend, aiGoHome];

  const aiBtnList = post_ai.querySelectorAll(".ai-btn-item");
  const filteredHeadings = Array.from(aiBtnList).filter(h => h.id !== "go-tianli-blog");
  filteredHeadings.forEach((item, i) => item.addEventListener("click", () => aiFunctions[i]()));

  document.getElementById("ai-tag").addEventListener("click", onAiTagClick);
  aiTitleRefreshIcon.addEventListener("click", onAiTitleRefreshIconClick);
  document.getElementById("go-tianli-blog").addEventListener("click", () => window.open(btnLink, "_blank"));
  aiReadAloudIcon.addEventListener("click", readAloud);
  if (switchBtn) document.getElementById("ai-Toggle").addEventListener("click", changeShowMode);

  // ---------- 动画逻辑 ----------
  function createIntersectionObserver() {
    return new IntersectionObserver(entries => {
      animationRunning = entries[0].isIntersecting;
      if (animationRunning) {
        delayInit = indexI === 0 ? 200 : 20;
        timeouts[1] = setTimeout(() => {
          if (indexJ) { indexI = 0; indexJ = 0; }
          if (indexI === 0) explanation.innerHTML = aiStr.charAt(0);
          requestAnimationFrame(animate);
        }, delayInit);
      }
    }, { threshold: 0 });
  }

  function animate(timestamp) {
    if (!animationRunning) return;
    if (!animate.start) animate.start = timestamp;
    elapsed = timestamp - animate.start;
    if (elapsed >= 20) {
      animate.start = timestamp;
      if (indexI < aiStrLength - 1) {
        let char = aiStr.charAt(indexI + 1);
        let delay = /[,.，。!?！？]/.test(char) ? 150 : 20;
        if (explanation.firstElementChild) explanation.removeChild(explanation.firstElementChild);
        explanation.innerHTML += char;
        let div = document.createElement("div"); div.className = "ai-cursor"; explanation.appendChild(div);
        indexI++;
        if (delay === 150) post_ai.querySelector(".ai-explanation .ai-cursor").style.opacity = "0.2";
        if (indexI === aiStrLength - 1) { observer.disconnect(); explanation.removeChild(explanation.firstElementChild); }
        timeouts[0] = setTimeout(() => requestAnimationFrame(animate), delay);
      }
    } else requestAnimationFrame(animate);
  }

  function clearTimeouts() { timeouts.forEach(t => t && clearTimeout(t)); }

  function startAI(str, df = true) { 
    indexI = 0; indexJ = 1; clearTimeouts(); animationRunning = false; elapsed = 0; 
    observer.disconnect(); explanation.innerHTML = df ? "生成中. . ." : "请等待. . ."; 
    aiStr = str; aiStrLength = str.length; observer.observe(post_ai); 
  }

  // ---------- 语音播放 ----------
  async function readAloud() {
    if (!summaryID) { anzhiyu.snackbarShow("摘要还没加载完呢，请稍后。。。"); return; }
    aiReadAloudIcon.style.opacity = "0.2";
    if (audio && !isPaused) { audio.pause(); isPaused = true; aiReadAloudIcon.style.opacity = "1"; aiReadAloudIcon.style.animation = ""; return; }
    if (audio && isPaused) { audio.play(); isPaused = false; aiReadAloudIcon.style.cssText = "animation: breathe .5s linear infinite; opacity: 0.2;cursor: pointer"; return; }

    const requestParams = new URLSearchParams({ key: AIKey, id: summaryID });
    try {
      const response = await fetch(`https://summary.tianli0.top/audio?${requestParams}`, { method: "GET", headers: { "Content-Type": "application/json", Referer: AIReferer } });
      if (response.status === 403) console.error("403 refer与key不匹配。");
      else if (response.status === 500) console.error("500 系统内部错误");
      else {
        const audioBlob = await response.blob();
        audio = new Audio(URL.createObjectURL(audioBlob));
        audio.play();
        aiReadAloudIcon.style.cssText = "animation: breathe .5s linear infinite; opacity: 0.2;cursor: pointer";
        audio.addEventListener("ended", () => { audio = null; aiReadAloudIcon.style.opacity = "1"; aiReadAloudIcon.style.animation = ""; });
      }
    } catch (error) { console.error("请求发生错误❎"); }
  }

  // ---------- 云端摘要逻辑（缓存 + 强制刷新精简版） ----------
  async function fetchCloudflareSummary({ num = basicWordCount, force = false, updated = null }) {
    indexI = 0; indexJ = 1; clearTimeouts(); animationRunning = false; elapsed = 0;
    const content = document.querySelector(".post-content")?.innerText.trim() || "";
    const requestBody = { text: content, basicWordCount: num, url: location.href, updated: updated || (force ? Date.now() : window.postUpdatedTimestamp || 0), force };
    const requestOptions = { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + AIKey, "Referer": AIReferer }, body: JSON.stringify(requestBody) };

    try {
      let animationInterval = setInterval(() => { explanation.innerHTML = (force ? "正在生成新摘要" : "加载摘要") + ".".repeat(indexJ); indexJ = (indexJ % 3) + 1; }, 500);
      const response = await fetch(`https://ai.aresdev.qzz.io/api/ai`, requestOptions);
      const result = await response.json();
      clearInterval(animationInterval);
      const summary = result?.summary?.trim() || "";
      summaryID = result?.id || null;
      if (summary) { startAI(summary); if (!force && result?.cached) console.log("摘要来自缓存"); }
      else startAI("摘要获取失败，请稍后重试。");
    } catch (error) { console.error(error); explanation.innerHTML = "发生异常：" + error; }
  }

  async function aiAbstractCloudflare(num) { return fetchCloudflareSummary({ num }); } // 默认加载缓存
  function refreshSummaryCloudflare(num) { return fetchCloudflareSummary({ num, force: true, updated: Date.now() }); }

  // ---------- 页面加载与刷新 ----------
  if (aiTitleRefreshIcon) {
    try { aiTitleRefreshIcon.removeEventListener && aiTitleRefreshIcon.removeEventListener('click', onAiTitleRefreshIconClick); } catch(e) {}
    aiTitleRefreshIcon.addEventListener('click', () => refreshSummaryCloudflare());
  }
  document.addEventListener('DOMContentLoaded', () => aiAbstract(basicWordCount));
  document.addEventListener('pjax:complete', () => aiAbstract(basicWordCount));

  // ---------- 主调函数 ----------
  async function aiAbstract(num = basicWordCount) {
    if (mode === "tianli") await aiAbstractTianli(num);
    else if (mode === "cloudflare") await aiAbstractCloudflare(num);
    else aiAbstractLocal();
  }

  // ---------- 本地摘要 ----------
  function aiAbstractLocal() { 
    const strArr = postAI.split(",").map(i => i.trim());
    if (strArr.length !== 1) { 
      let randomIndex = Math.floor(Math.random() * strArr.length); 
      while(randomIndex === lastAiRandomIndex) randomIndex = Math.floor(Math.random() * strArr.length); 
      lastAiRandomIndex = randomIndex; 
      startAI(strArr[randomIndex]); 
    } else startAI(strArr[0]); 
    setTimeout(()=>{ aiTitleRefreshIcon.style.opacity="1"; },600); 
  }

  // ---------- Tianli摘要 ----------
  async function aiAbstractTianli(num) {
    indexI = 0; indexJ = 1; clearTimeouts(); animationRunning = false; elapsed = 0; observer.disconnect();
    num = Math.max(10, Math.min(2000, num));
    const truncateDescription = (title + pageFillDescription).trim().substring(0, num);
    const requestBody = { key: AIKey, content: truncateDescription, url: location.href };
    const requestOptions = { method: "POST", headers: { "Content-Type": "application/json", Referer: AIReferer }, body: JSON.stringify(requestBody) };

    try {
      let animationInterval = setInterval(() => { explanation.innerHTML = "生成中" + ".".repeat(indexJ); indexJ = (indexJ % 3) + 1; }, 500);
      const response = await fetch(`https://summary.tianli0.top/`, requestOptions);
      let result = response.status === 403 ? { summary:"403 refer与key不匹配。" } : response.status === 500 ? { summary:"500 系统内部错误" } : await response.json();
      clearInterval(animationInterval);
      summaryID = result.id;
      startAI(result.summary?.trim() || "摘要获取失败!!!请检查Tianli服务是否正常!!!");
      setTimeout(() => aiTitleRefreshIcon.style.opacity = "1", 300);
    } catch (error) { console.error(error); explanation.innerHTML = "发生异常" + error; }
  }

  // ---------- 推荐文章 ----------
  function aiRecommend() { indexI=0; indexJ=1; clearTimeouts(); animationRunning=false; elapsed=0; explanation.innerHTML="生成中. . ."; aiStr=""; aiStrLength=""; observer.disconnect(); timeouts[2]=setTimeout(()=>{ explanation.innerHTML=recommendList(); },600);}
  function recommendList(){ 
    let thumbnail=document.querySelectorAll(".relatedPosts-list a"); 
    if(!thumbnail.length){ 
      const cardRecentPost=document.querySelector(".card-widget.card-recent-post"); 
      if(!cardRecentPost) return ""; 
      thumbnail=cardRecentPost.querySelectorAll(".aside-list-item a"); 
      let list=""; 
      for(let i=0;i<thumbnail.length;i++){ 
        const item=thumbnail[i]; 
        list+=`<div class="ai-recommend-item"><span class="index">${i+1}：</span><a href="javascript:;" onclick="pjax.loadUrl('${item.href}')" title="${item.title}" data-pjax-state="">${item.title}</a></div>`;} 
      return `很抱歉，无法找到类似的文章，你也可以看看本站最新发布的文章：<br /><div class="ai-recommend">${list}</div>`;} 
    let list=""; 
    for(let i=0;i<thumbnail.length;i++){ 
      const item=thumbnail[i]; 
      list+=`<div class="ai-recommend-item"><span>推荐${i+1}：</span><a href="javascript:;" onclick="pjax.loadUrl('${item.href}')" title="${item.title}" data-pjax-state="">${item.title}</a></div>`;} 
    return `推荐文章：<br /><div class="ai-recommend">${list}</div>`;}

  // ---------- 首页/标签/刷新 ----------
  function aiGoHome(){ startAI("正在前往博客主页...",false); timeouts[2]=setTimeout(()=>{ if(window.pjax) pjax.loadUrl("/"); else location.href=location.origin; },1000);}
  function introduce(){ startAI(mode=="tianli" ? "我是文章辅助AI: TianliGPT，点击下方的按钮，让我生成本文简介、推荐相关文章等。" : `我是文章辅助AI: ${gptName} GPT，点击下方的按钮，让我生成本文简介、推荐相关文章等。`);}
  function aiTitleRefreshIconClick(){ aiTitleRefreshIcon.click(); }
    function onAiTagClick(){ 
    document.querySelectorAll('#go-tianli-blog').forEach(btn => {
      btn.style.display = 'none';
    });
    post_ai.querySelectorAll('.ai-btn-item').forEach(item => {
      if (item.id !== 'go-tianli-blog') {
        item.style.display = 'block';
      }
    });
    startAI(`你好，我是本站摘要生成助理 ${gptName} GPT，可以为你生成文章摘要、推荐相关文章等。`);
  }
  function onAiTitleRefreshIconClick(){ 
    let textSource=mode==="tianli"? (title+pageFillDescription).trim():document.querySelector(".post-content").innerText.trim(); 
    let truncateLength=Math.min(textSource.length,basicWordCount); 
    aiTitleRefreshIcon.style.opacity="0.2"; 
    aiTitleRefreshIcon.style.transitionDuration="0.3s"; 
    aiTitleRefreshIcon.style.transform="rotate("+360*refreshNum+"deg)"; 
    let value=truncateLength-Math.floor(Math.random()*randomNum); 
    while(value===prevParam||truncateLength-value===prevParam) value=truncateLength-Math.floor(Math.random()*randomNum); 
    prevParam=value; aiAbstract(value); refreshNum++; 
  }

  // ---------- 模式切换 ----------
  function changeShowMode(){ 
    if(mode==="tianli") mode="cloudflare"; 
    else if(mode==="cloudflare") mode="local"; 
    else mode="tianli"; 
    if(mode==="tianli"){ document.getElementById("ai-tag").innerHTML="TianliGPT"; aiReadAloudIcon.style.opacity="1"; aiReadAloudIcon.style.cursor="pointer"; document.getElementById("go-tianli-blog").style.display="block"; document.querySelectorAll(".ai-btn-item").forEach(item=>item.style.display="none"); } 
    else { aiReadAloudIcon.style.opacity="0"; aiReadAloudIcon.style.cursor="auto"; document.getElementById("go-tianli-blog").style.display="none"; document.querySelectorAll(".ai-btn-item").forEach(item=>item.style.display="block"); document.getElementById("ai-tag").innerHTML=gptName+" GPT"; } 
    aiAbstract(); 
  }

  function showAiBtn(){ 
    if(mode==="tianli"){ document.getElementById("ai-tag").innerHTML="TianliGPT"; document.getElementById("go-tianli-blog").style.display="block"; document.querySelectorAll(".ai-btn-item").forEach(item=>item.style.display="none");} 
    else { document.getElementById("ai-tag").innerHTML=gptName+" GPT"; document.getElementById("go-tianli-blog").style.display="none"; document.querySelectorAll(".ai-btn-item").forEach(item=>item.style.display="block");}
  }

  try { aiAbstract(); } catch(e){ console.warn('aiAbstract may have been called earlier:',e); }

})();
