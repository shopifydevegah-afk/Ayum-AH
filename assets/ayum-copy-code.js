/**
 * <ayum-copy-code> — copies a configured discount code (data-code) to the clipboard.
 * Used by sections/ayum-announcement-bar.liquid. Feedback labels are stacked in the button
 * (no layout shift) and announced through a polite live region.
 */
if (!customElements.get('ayum-copy-code')) {
  customElements.define(
    'ayum-copy-code',
    class AyumCopyCode extends HTMLElement {
      connectedCallback() {
        if (this.onClick) return;
        this.button = this.querySelector('button');
        if (!this.button) return;
        this.onClick = () => this.copy();
        this.button.addEventListener('click', this.onClick);
      }

      disconnectedCallback() {
        if (this.button && this.onClick) this.button.removeEventListener('click', this.onClick);
        this.onClick = null;
        clearTimeout(this.resetTimer);
      }

      async copy() {
        const code = (this.dataset.code || '').trim();
        let copied = false;
        if (code && navigator.clipboard && window.isSecureContext) {
          try {
            await navigator.clipboard.writeText(code);
            copied = true;
          } catch (error) {
            copied = false;
          }
        }
        if (code && !copied) copied = this.legacyCopy(code);
        this.setState(copied ? 'copied' : 'failed');
      }

      legacyCopy(text) {
        const field = document.createElement('textarea');
        field.value = text;
        field.setAttribute('readonly', '');
        field.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;';
        document.body.appendChild(field);
        field.focus({ preventScroll: true });
        field.select();
        let copied = false;
        try {
          copied = document.execCommand('copy');
        } catch (error) {
          copied = false;
        }
        field.remove();
        this.button.focus({ preventScroll: true });
        return copied;
      }

      setState(state) {
        const live = this.querySelector('[data-live]');
        this.dataset.state = state;
        if (live) live.textContent = state === 'copied' ? this.dataset.success || '' : this.dataset.error || '';
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
          delete this.dataset.state;
          if (live) live.textContent = '';
        }, 2000);
      }
    }
  );
}
