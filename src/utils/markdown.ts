import MarkdownIt from 'markdown-it';
import mdHighlight from 'markdown-it-highlightjs';
import mdKbd from 'markdown-it-kbd';

const preCopyPlugin = (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.fence;
  // eslint-disable-next-line no-param-reassign
  md.renderer.rules.fence = (...args) => {
    const codeBlockHtml = defaultRender(...args);
    const copyButtonHtml = `<button class="copy-code w-9 h-9 absolute top-0 right-0"><i class="ri-file-copy-line"></i></button>`;
    return codeBlockHtml.replace(
      '<pre>',
      `<pre class="relative">${copyButtonHtml}`
    );
  };
};

const downgradeHeadersPlugin = (md: MarkdownIt) => {
  md.core.ruler.push('downgrade_headers', (state) => {
    state.tokens.forEach((token) => {
      if (token.type === 'heading_open' || token.type === 'heading_close') {
        const originalTag = token.tag;

        /* eslint-disable no-param-reassign */

        // 1. HEADER MAPPING (The "H2 to H4" logic)
        // We shift everything down so H1 isn't huge, and H2 becomes H4
        if (originalTag === 'h1') token.tag = 'h3';
        else if (originalTag === 'h2') token.tag = 'h4';
        else if (originalTag === 'h3') token.tag = 'h5';
        else if (originalTag === 'h4') token.tag = 'h6';

        // 2. COMPACTING HEADERS
        // We only inject spacing/line-height. We let the browser/theme handle boldness.
        if (token.type === 'heading_open') {
          const styleIndex = token.attrIndex('style');

          // Tight margins and line height (No font-weight or font-size overrides)
          const compactStyle =
            'margin-top: 0.6em; margin-bottom: 0.2em; line-height: 1.2;';

          if (styleIndex < 0) {
            token.attrPush(['style', compactStyle]);
          } else {
            const attr = token.attrs[styleIndex];
            attr[1] = `${attr[1]}; ${compactStyle}`;
          }
        }
        /* eslint-enable no-param-reassign */
      }
    });
  });
};

const markdown = MarkdownIt({
  linkify: true,
  breaks: true,
})
  .use(mdHighlight, {
    inline: true,
  })
  .use(mdKbd)
  .use(preCopyPlugin)
  .use(downgradeHeadersPlugin);

export default markdown;

export const hasMathJax = () => !!window.MathJax;

export const initMathJax: () => Promise<void> = (callback?: () => void) => {
  if (hasMathJax()) return Promise.resolve(null);
  return new Promise((res) => {
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
        processEnvironments: true,
        processRefs: true,
      },
      options: {
        skipHtmlTags: ['noscript', 'style', 'textarea', 'pre', 'code'],
        ignoreHtmlClass: 'tex2jax_ignore',
      },
      startup: {
        pageReady: () => {
          callback?.();
          res(null);
        },
      },
      svg: {
        fontCache: 'global',
      },
    };

    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.min.js';
    script.async = true;
    document.head.appendChild(script);
  });
};

export const renderMaxJax: () => Promise<void> = () =>
  window.MathJax.typesetPromise(document.getElementsByClassName('prose'));
