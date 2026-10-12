(() => {
  const chinese = document.documentElement.lang.startsWith("zh");
  const labels = chinese ? {copy:"复制",done:"已复制",manual:"请选中复制",aria:"复制这段代码",nav:"章节导航"} : {copy:"Copy",done:"Copied",manual:"Select to copy",aria:"Copy this code",nav:"Contents"};
  const nav = document.querySelector(".site-nav");
  const progress = document.querySelector(".reading-progress");
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".site-nav a")];
  const update = () => {
    const root = document.documentElement;
    const distance = root.scrollHeight - root.clientHeight;
    if (progress) progress.style.transform = "scaleX(" + (distance ? root.scrollTop / distance : 0) + ")";
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 160) current = section.id;
    }
    links.forEach(link => {
      const active = link.hash === "#" + current;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  addEventListener("scroll", update, { passive: true });
  update();
  document.querySelectorAll('a.source-ref[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      const disclosure = target?.closest("details");
      if (disclosure) disclosure.open = true;
    });
  });
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.cssText = "position:fixed;left:-10000px;top:0";
      document.body.append(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      if (!copied) throw new Error("Copy unavailable");
    }
  }
  document.querySelectorAll(".code-block").forEach(block => {
    const code = block.querySelector("pre code");
    if (!code) return;
    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = labels.copy;
    button.setAttribute("aria-label", labels.aria);
    button.addEventListener("click", async () => {
      try {
        await copyText(code.textContent);
        button.textContent = labels.done;
      } catch {
        button.textContent = labels.manual;
      }
      setTimeout(() => { button.textContent = labels.copy; }, 1800);
    });
    block.append(button);
  });
  // Stepped figures. Parts of figure.stepper marked data-step="k" enter at step k and stay; "k-m" shows them from k through m.
  // data-enter picks the entrance (fade, draw, grow-x, grow-y, pop). A part with data-travel="#path" moves once along that path at its step.
  // The figure opens on the complete overview, so readers without scripts, printing or reduced motion lose no content.
  const reduceMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stepText = chinese
    ? {play:"播放",pause:"暂停",replay:"重播",previous:"上一步",next:"下一步",reset:"重置",group:"分步演示",dot:i => "第 " + i + " 步",step:(i, n) => "第 " + i + " / " + n + " 步",overview:n => "全图 · 共 " + n + " 步"}
    : {play:"Play",pause:"Pause",replay:"Replay",previous:"Previous",next:"Next",reset:"Reset",group:"Step-through",dot:i => "Step " + i,step:(i, n) => "Step " + i + " of " + n,overview:n => "Overview · " + n + " steps"};
  const steppers = [];
  document.querySelectorAll("figure.stepper").forEach(figure => {
    const stage = figure.querySelector(".stepper-stage");
    const notes = [...figure.querySelectorAll(".step-notes > li")];
    const parts = [...figure.querySelectorAll("[data-step]:not([data-travel])")].map(el => {
      const [from, to] = el.dataset.step.split("-").map(Number);
      return {el, from, to: to || Infinity};
    });
    const travellers = [...figure.querySelectorAll("[data-travel]")];
    const total = Math.max(notes.length, 0, ...parts.map(part => part.from));
    if (!stage || !total) return;
    const animated = !reduceMotion && typeof stage.animate === "function";
    let current = 0, timer = null, playing = false, running = [];
    const bar = document.createElement("div");
    bar.className = "stepper-controls";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", stepText.group);
    const button = (text, className) => {
      const node = document.createElement("button");
      node.type = "button";
      node.className = className;
      node.textContent = text;
      return node;
    };
    const play = button(stepText.play, "stepper-play");
    const previous = button(stepText.previous, "secondary");
    const next = button(stepText.next, "secondary");
    const reset = button(stepText.reset, "secondary");
    const dotRow = document.createElement("div");
    dotRow.className = "stepper-dots";
    const dots = Array.from({length: total}, (_, i) => {
      const dot = button("", "stepper-dot");
      dot.setAttribute("aria-label", stepText.dot(i + 1));
      dotRow.append(dot);
      return dot;
    });
    const status = document.createElement("span");
    status.className = "stepper-status";
    status.setAttribute("aria-live", "polite");
    play.setAttribute("aria-pressed", "false");
    play.hidden = reduceMotion;
    const progress = document.createElement("div");
    progress.className = "stepper-progress";
    progress.append(dotRow, status);
    bar.append(play, previous, next, reset, progress);
    stage.after(bar);
    const ease = "cubic-bezier(.2,.7,.2,1)";
    const enter = (el, delay) => {
      const kind = el.dataset.enter || "fade";
      if (kind === "draw" && typeof el.getTotalLength === "function") {
        const length = el.getTotalLength(), dash = length + " " + length, marker = el.getAttribute("marker-end");
        const animation = el.animate([{opacity: 0, strokeDasharray: dash, strokeDashoffset: length}, {opacity: 1, offset: .08}, {opacity: 1, strokeDasharray: dash, strokeDashoffset: 0}], {duration: 640, delay, easing: ease, fill: "backwards"});
        // The arrowhead appears once the line reaches it.
        if (marker) {
          el.removeAttribute("marker-end");
          const restore = () => el.setAttribute("marker-end", marker);
          animation.finished.then(restore, restore);
        }
        return animation;
      }
      if (kind === "grow-x" || kind === "grow-y") return el.animate([{scale: kind === "grow-x" ? "0 1" : "1 0"}, {scale: "1 1"}], {duration: 680, delay, easing: ease, fill: "backwards"});
      if (kind === "pop") return el.animate([{opacity: 0, scale: ".84"}, {opacity: 1, scale: "1"}], {duration: 440, delay, easing: "cubic-bezier(.3,1.4,.5,1)", fill: "backwards"});
      return el.animate([{opacity: 0, translate: "0 10px"}, {opacity: 1, translate: "0 0"}], {duration: 420, delay, easing: ease, fill: "backwards"});
    };
    const travel = (el, delay) => {
      const path = figure.querySelector(el.dataset.travel);
      if (typeof path?.getTotalLength !== "function") return null;
      const length = path.getTotalLength(), frames = [];
      for (let i = 0; i <= 30; i++) {
        const point = path.getPointAtLength(length * i / 30);
        frames.push({translate: point.x + "px " + point.y + "px", opacity: i === 0 || i === 30 ? 0 : 1});
      }
      return el.animate(frames, {duration: 1150, delay, easing: "ease-in-out"});
    };
    const render = () => {
      figure.classList.toggle("is-stepping", current > 0);
      notes.forEach((note, i) => {
        if (i + 1 === current) note.setAttribute("aria-current", "step");
        else note.removeAttribute("aria-current");
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-done", i + 1 < current);
        if (i + 1 === current) dot.setAttribute("aria-current", "step");
        else dot.removeAttribute("aria-current");
      });
      previous.disabled = current <= 1;
      next.disabled = current === total;
      play.setAttribute("aria-pressed", String(playing));
      play.textContent = playing ? stepText.pause : current === total ? stepText.replay : stepText.play;
      status.textContent = current ? stepText.step(current, total) : stepText.overview(total);
    };
    // Moving forward, or replaying the current step, plays the entrance; moving back only hides.
    const show = (step, forward = step > 0 && step >= current) => {
      running.forEach(animation => animation.cancel());
      running = [];
      current = step;
      let order = 0;
      parts.forEach(({el, from, to}) => {
        el.classList.toggle("is-off", step > 0 && !(from <= step && step <= to));
        el.classList.toggle("is-current", step > 0 && from === step);
        if (animated && forward && from === step) running.push(enter(el, order++ * 140));
      });
      if (animated && forward) {
        travellers.filter(el => Number(el.dataset.step) === step).forEach(el => {
          const animation = travel(el, order * 140 + 280);
          if (animation) running.push(animation);
        });
      }
      render();
    };
    const dwell = step => {
      if (figure.dataset.dwell) return Number(figure.dataset.dwell);
      const length = (notes[step - 1]?.textContent || "").trim().length;
      return Math.min(9000, Math.max(3200, 1800 + length * (chinese ? 110 : 45)));
    };
    const stop = () => {
      clearTimeout(timer);
      timer = null;
      playing = false;
      render();
    };
    const schedule = () => {
      timer = setTimeout(() => {
        show(current + 1);
        if (current < total) schedule();
        else stop();
      }, dwell(current));
    };
    const go = step => { stop(); show(Math.max(0, Math.min(total, step))); };
    play.addEventListener("click", () => {
      if (playing) return stop();
      playing = true;
      show(current === total ? 1 : current + 1, true);
      if (current < total) schedule();
      else stop();
    });
    previous.addEventListener("click", () => go(current - 1));
    next.addEventListener("click", () => go(current + 1));
    reset.addEventListener("click", () => go(0));
    dots.forEach((dot, i) => dot.addEventListener("click", () => go(i + 1)));
    notes.forEach((note, i) => note.addEventListener("click", event => {
      if (!event.target.closest?.("a")) go(i + 1);
    }));
    if (typeof IntersectionObserver === "function") {
      new IntersectionObserver(entries => entries.forEach(entry => {
        if (playing && (!entry.isIntersecting || entry.intersectionRatio < .2)) stop();
      }), {threshold: [0, .2]}).observe(figure);
    }
    figure.classList.add("is-ready");
    render();
    steppers.push({stop});
  });
  if (steppers.length) document.addEventListener("visibilitychange", () => { if (document.hidden) steppers.forEach(item => item.stop()); });
  if (nav) nav.setAttribute("aria-label", labels.nav);
  // Print every hint, solution and source list, then restore what the reader had open.
  let disclosureState = [];
  addEventListener("beforeprint", () => {
    steppers.forEach(item => item.stop());
    disclosureState = [...document.querySelectorAll("details")].map(node => [node, node.open]);
    disclosureState.forEach(([node]) => { node.open = true; });
  });
  addEventListener("afterprint", () => { disclosureState.forEach(([node, open]) => { node.open = open; }); });
})();
