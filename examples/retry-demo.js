(() => {
  const panel = document.querySelector("#trace");
  const next = panel.querySelector("#next");
  const previous = panel.querySelector("#previous");
  const play = panel.querySelector("#play");
  const amountInput = panel.querySelector("#amount");
  const flow = panel.querySelector(".mechanism-flow");
  let index = 0, amount = 10, playing = false, timer = null;

  function updateControls() {
    next.disabled = index === 4;
    previous.disabled = index === 0;
    play.textContent = playing ? "暂停" : index === 4 ? "重新播放" : index ? "继续播放" : "播放演示";
    play.setAttribute("aria-pressed", String(playing));
  }
  function stop() {
    playing = false;
    clearTimeout(timer);
    timer = null;
    updateControls();
  }
  function show() {
    const state = retryState(index, amount);
    panel.querySelector("#state").textContent = "当前累计金额：" + state.total + "；本次返回：" + (state.result === null ? "尚无" : state.result) + "。";
    panel.querySelector("#reason").textContent = state.reason;
    panel.querySelector("#step-label").textContent = state.label;
    panel.querySelector("#flow-request").textContent = state.request;
    panel.querySelector("#flow-amount").textContent = "请求金额 " + amount;
    panel.querySelector("#flow-lookup").textContent = state.lookup;
    panel.querySelector("#flow-lookup-detail").textContent = state.lookupDetail;
    panel.querySelector("#flow-effect").textContent = state.effect;
    panel.querySelector("#flow-result").textContent = "返回结果 " + (state.result === null ? "尚无" : state.result);
    panel.querySelector("#without-value").textContent = state.withoutDeduplication;
    panel.querySelector("#with-value").textContent = state.total;
    panel.querySelector("#without-bar").style.width = state.withoutDeduplication + "%";
    panel.querySelector("#with-bar").style.width = state.total + "%";
    panel.querySelector("#amount-value").value = String(amount);
    panel.querySelectorAll(".trace-step").forEach(node => {
      const active = Number(node.dataset.step) === index;
      node.classList.toggle("active", active);
      if (active) node.setAttribute("aria-current", "step");
      else node.removeAttribute("aria-current");
    });
    flow.classList.remove("animating");
    if (index) { void flow.offsetWidth; flow.classList.add("animating"); }
    updateControls();
  }
  function schedule() {
    timer = setTimeout(() => {
      if (!playing) return;
      index++;
      show();
      if (index === 4) stop();
      else schedule();
    }, 4000);
  }
  play.addEventListener("click", () => {
    if (playing) { stop(); return; }
    if (index === 4) index = 0;
    if (index === 0) index = 1;
    playing = true;
    show();
    schedule();
  });
  next.addEventListener("click", () => { stop(); index = Math.min(4, index + 1); show(); });
  previous.addEventListener("click", () => { stop(); index = Math.max(0, index - 1); show(); });
  panel.querySelector("#reset").addEventListener("click", () => { stop(); index = 0; show(); });
  panel.querySelectorAll(".trace-step").forEach(node => node.addEventListener("click", () => { stop(); index = Number(node.dataset.step); show(); }));
  amountInput.addEventListener("input", () => { stop(); amount = Number(amountInput.value); index = 0; show(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
  new IntersectionObserver(entries => { if (!entries[0].isIntersecting) stop(); }).observe(panel);
  show();
})();
