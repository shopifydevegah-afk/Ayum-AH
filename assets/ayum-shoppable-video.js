/*
 * ayum-shoppable-video.js — playback controller for the AYUM "Shoppable Video" section
 * (sections/ayum-product-video.liquid, Figma 2001:366 / 2001:861).
 *
 * <ayum-shoppable-video aria-controls="Slider-…" hidden> sits next to the native <hdt-slider>. It adds no player and
 * no slider: it calls the native <hdt-video-player> play()/pause() and the native slider goToTarget().
 * - The play button plays its card's player (and toggles it when native controls are off; the native player's own
 *   click handler is play-only and runs once).
 * - Exclusive playback is the player's native `group` attribute; this element only mirrors the state on the button
 *   (aria-pressed) and the media box ([data-playing], [data-started]) from the bubbling media:play / media:pause events.
 * - Native controls ([data-controls], section setting): the <video> is rendered with `controls`; they are hidden until
 *   the first play (Figma look: play circle + badges) and shown from then on. Pointer presses on the controls bar do not
 *   reach the slider, so seeking / volume never drags the carousel.
 * - Tapping a card that is not the active slide (a mobile peek) centres it; its play button centres and plays it.
 * - When the slider selects other slides, players outside the selected snap are paused and reset to their poster look.
 */
(() => {
  if (customElements.get('ayum-shoppable-video')) return;

  const CONTROLS_ZONE = 56; // px from the bottom of the video: native control bar (seek, volume, fullscreen)
  const POINTER_EVENTS = ['pointerdown', 'mousedown', 'touchstart'];

  class AyumShoppableVideo extends HTMLElement {
    connectedCallback() {
      if (this._slider) return;
      const slider = document.getElementById(this.getAttribute('aria-controls'));
      if (!slider) return;

      this._slider = slider;
      this._onClick = this._onClick.bind(this);
      this._onPeekClick = this._onPeekClick.bind(this);
      this._onMedia = this._onMedia.bind(this);
      this._onSelect = this._onSelect.bind(this);
      this._onControlsPointer = this._onControlsPointer.bind(this);

      slider.addEventListener('click', this._onPeekClick, true);
      slider.addEventListener('click', this._onClick);
      slider.addEventListener('media:play', this._onMedia);
      slider.addEventListener('media:pause', this._onMedia);
      slider.addEventListener('select:slide', this._onSelect);

      this._controlled = Array.from(slider.querySelectorAll('.ayum-pv__media[data-controls]'));
      this._controlled.forEach((media) => {
        this._reset(media);
        POINTER_EVENTS.forEach((type) => media.addEventListener(type, this._onControlsPointer, { passive: true }));
      });
    }

    disconnectedCallback() {
      if (!this._slider) return;
      this._slider.removeEventListener('click', this._onPeekClick, true);
      this._slider.removeEventListener('click', this._onClick);
      this._slider.removeEventListener('media:play', this._onMedia);
      this._slider.removeEventListener('media:pause', this._onMedia);
      this._slider.removeEventListener('select:slide', this._onSelect);
      this._controlled.forEach((media) => {
        POINTER_EVENTS.forEach((type) => media.removeEventListener(type, this._onControlsPointer, { passive: true }));
      });
      this._controlled = [];
      this._slider = null;
    }

    // A neighbouring (not selected) card: a tap on its video centres it instead of interacting with it.
    _onPeekClick(event) {
      const media = event.target.closest('.ayum-pv__media');
      if (!media || event.target.closest('.ayum-pv__play')) return;
      const slide = media.closest('.hdt-slider__slide');
      if (!slide || slide.classList.contains('is-selected') || !this._slider.contains(slide)) return;
      event.preventDefault();
      event.stopPropagation();
      this._goTo(slide);
    }

    _onClick(event) {
      const button = event.target.closest('.ayum-pv__play');
      if (!button || !this._slider.contains(button)) return;
      const player = button.closest('.ayum-pv__media')?.querySelector('hdt-video-player');
      if (!player) return;

      if (player.playing) {
        player.pause();
        return;
      }
      const slide = button.closest('.hdt-slider__slide');
      if (slide && !slide.classList.contains('is-selected')) this._goTo(slide);
      player.play();
    }

    // Presses on the native controls bar stay with the video (seek / volume drags must not swipe the carousel).
    _onControlsPointer(event) {
      const media = event.currentTarget;
      const video = media.querySelector('video');
      if (!video || !video.controls) return;
      const point = event.touches ? event.touches[0] : event;
      const rect = media.getBoundingClientRect();
      if (point.clientY >= rect.bottom - CONTROLS_ZONE) event.stopPropagation();
    }

    _onMedia(event) {
      const player = event.target;
      if (!player || player.localName !== 'hdt-video-player') return;
      const media = player.closest('.ayum-pv__media');
      if (!media) return;
      const playing = event.type === 'media:play';
      media.toggleAttribute('data-playing', playing);
      if (playing) {
        media.setAttribute('data-started', '');
        if (media.hasAttribute('data-controls')) {
          const video = media.querySelector('video');
          if (video) video.controls = true;
        }
      }
      media.querySelector('.ayum-pv__play')?.setAttribute('aria-pressed', String(playing));
    }

    _onSelect(event) {
      const api = event.detail && event.detail.sliderApi;
      if (!api) return;
      const slides = api.slideNodes();
      const group = api.internalEngine().slideRegistry[api.selectedScrollSnap()] || [];
      slides.forEach((slide, index) => {
        if (group.includes(index)) return;
        slide.querySelectorAll('hdt-video-player[playing]').forEach((player) => player.pause());
        slide.querySelectorAll('.ayum-pv__media[data-controls][data-started]').forEach((media) => this._reset(media));
      });
    }

    // Back to the not-yet-played look: native controls hidden, play circle and duration badge shown.
    _reset(media) {
      const video = media.querySelector('video');
      if (video) video.controls = false;
      media.removeAttribute('data-started');
      media.removeAttribute('data-playing');
      media.querySelector('.ayum-pv__play')?.setAttribute('aria-pressed', 'false');
    }

    _goTo(slide) {
      try {
        this._slider.goToTarget(slide);
      } catch (error) {
        // Slider not initialised (e.g. a single card): nothing to centre.
      }
    }
  }

  customElements.define('ayum-shoppable-video', AyumShoppableVideo);
})();
