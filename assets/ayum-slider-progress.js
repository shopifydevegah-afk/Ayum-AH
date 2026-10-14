/*
 * ayum-slider-progress.js — AYUM slider progress bar (Figma 2001:154, "Best sellers" desktop).
 *
 * <ayum-slider-progress aria-controls="Slider-…"> mirrors the scroll position of the native
 * <hdt-slider> it points to. It does not add a slider library: it reads the slider's own Embla
 * API, which <hdt-slider> exposes through its non-bubbling `init:slide` (init + reInit) and
 * `select:slide` events (event.detail.sliderApi).
 *
 * Output: two custom properties on the element, consumed by assets/dev2.css —
 *   --ayum-progress-size  visible share of the track (0–1)
 *   --ayum-progress       scroll progress (0–1)
 */
(() => {
  if (customElements.get('ayum-slider-progress')) return;

  const API_EVENTS = ['scroll', 'reInit', 'resize', 'slidesChanged'];

  class AyumSliderProgress extends HTMLElement {
    connectedCallback() {
      if (this._slider) return;
      const slider = document.getElementById(this.getAttribute('aria-controls'));
      if (!slider) return;

      this._slider = slider;
      this._thumb = this.querySelector('.ayum-slider-progress__thumb');
      this._onSliderEvent = (event) => this._bind(event.detail && event.detail.sliderApi);
      this._paint = this._paint.bind(this);

      slider.addEventListener('init:slide', this._onSliderEvent);
      slider.addEventListener('select:slide', this._onSliderEvent);

      // The slider may have initialised before this element was upgraded and its `init:slide`
      // is already gone; ask it to re-initialise once so it emits again with its API.
      this._frame = requestAnimationFrame(() => {
        this._frame = null;
        if (this._api) return;
        try {
          slider.reInit();
        } catch (error) {
          // Slider not initialised yet: its own `init:slide` will arrive later.
        }
      });
    }

    disconnectedCallback() {
      if (this._frame) cancelAnimationFrame(this._frame);
      this._frame = null;
      if (this._slider) {
        this._slider.removeEventListener('init:slide', this._onSliderEvent);
        this._slider.removeEventListener('select:slide', this._onSliderEvent);
      }
      this._unbind();
      this._slider = null;
    }

    _bind(api) {
      if (!api) return;
      if (api !== this._api) {
        this._unbind();
        this._api = api;
        API_EVENTS.forEach((name) => api.on(name, this._paint));
      }
      this._paint();
    }

    _unbind() {
      if (!this._api) return;
      API_EVENTS.forEach((name) => this._api.off(name, this._paint));
      this._api = null;
    }

    _paint() {
      const api = this._api;
      if (!api || !this._thumb) return;

      const container = api.containerNode();
      const slides = api.slideNodes();
      const total = slides.reduce((width, slide) => width + slide.offsetWidth, 0);
      const visible = container.clientWidth;
      const size = total > 0 ? Math.min(1, visible / total) : 1;
      const progress = Math.min(1, Math.max(0, api.scrollProgress() || 0));

      this.style.setProperty('--ayum-progress-size', size.toFixed(4));
      this.style.setProperty('--ayum-progress', progress.toFixed(4));
      // More than one snap = the slides really scroll (pixel widths round, so `size < 1` can misfire by a pixel).
      this.toggleAttribute('scrollable', api.scrollSnapList().length > 1);
    }
  }

  customElements.define('ayum-slider-progress', AyumSliderProgress);
})();
