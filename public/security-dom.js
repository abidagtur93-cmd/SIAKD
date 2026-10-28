/* Sanitize legacy HTML templates before insertion. No user data is trusted as HTML. */
(() => {
  const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  let insideSanitizer = false;
  const sanitize = (value, target) => {
    if (insideSanitizer) return value;
    insideSanitizer = true;
    try {
      const html = String(value);
      const wrappers = {
        TR: ['<table><tbody><tr>', '</tr></tbody></table>', 'tr'],
        TBODY: ['<table><tbody>', '</tbody></table>', 'tbody'],
        THEAD: ['<table><thead>', '</thead></table>', 'thead'],
        TFOOT: ['<table><tfoot>', '</tfoot></table>', 'tfoot'],
        COLGROUP: ['<table><colgroup>', '</colgroup></table>', 'colgroup'],
        TABLE: ['<table>', '</table>', 'table'],
        SELECT: ['<select>', '</select>', 'select']
      };
      // HTML parsers strip isolated td/tr tags. Sanitize them inside their real context.
      const wrapper = wrappers[target?.tagName];
      const input = wrapper ? wrapper[0] + html + wrapper[1] : html;
      const clean = DOMPurify.sanitize(input, { FORBID_TAGS: ['script','iframe','object','embed','base','meta','link'], FORBID_ATTR: ['srcdoc'], ADD_ATTR: ['target'] });
      if (!wrapper) return clean;
      return new DOMParser().parseFromString(clean, 'text/html').querySelector(wrapper[2])?.innerHTML || '';
    }
    finally { insideSanitizer = false; }
  };
  Object.defineProperty(Element.prototype, 'innerHTML', { ...descriptor, set(value) { descriptor.set.call(this, sanitize(value, this)); } });
  const insert = Element.prototype.insertAdjacentHTML;
  Element.prototype.insertAdjacentHTML = function(position, html) { return insert.call(this, position, sanitize(html, /beforebegin|afterend/i.test(position) ? this.parentElement : this)); };
})();
