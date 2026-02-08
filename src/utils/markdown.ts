import MarkdownIt from 'markdown-it';
import mdHighlight from 'markdown-it-highlightjs';
import mdKbd from 'markdown-it-kbd';

const preCopyPlugin = (md: MarkdownIt) => {
  // Override the default renderer for code blocks
  const defaultRender = md.renderer.rules.fence;
  // eslint-disable-next-line no-param-reassign
  md.renderer.rules.fence = (...args) => {
    // Get the original code block HTML
    const codeBlockHtml = defaultRender(...args);

    const copyButtonHtml = `<button class="copy-code w-9 h-9 absolute top-0 right-0"><i class="ri-file-copy-line"></i></button>`;

    // Return the modified HTML
    return codeBlockHtml.replace(
      '<pre>',
      `<pre class="relative">${copyButtonHtml}`
    );
  };
};

// NEW PLUGIN: Forces headers to be smaller and thinner
const downgradeHeadersPlugin = (md: MarkdownIt) => {
  md.core.ruler.push('downgrade_headers', (state) => {
    state.tokens.forEach((token) => {
      // Check if the token is a heading
      if (token.type === 'heading_open' || token.type === 'heading_close') {
        const currentTag = token.tag;

        // Map tags down to smaller sizes
        if (currentTag === 'h1') token.tag = 'h3';
        else if (currentTag === 'h2') token.tag = 'h4';
        else if (currentTag === 'h3') token.tag = 'h5';
        else if (currentTag === 'h4') token.tag = 'h6';
        
        // If it's the opening tag, FORCE inline styles to reduce thickness/size
        if (token.type === 'heading_open') {
          const styleIndex = token.attrIndex('style');
          // font-weight: 500 (Medium) is much thinner than default Bold (700)
          // font-size: 1.1em is barely larger than normal text
          const customStyle = 'font-weight: 500; font-size: 1.15em; line-height: 1.3; margin-top: 1em; margin-bottom: 0.5em;';

          if (styleIndex < 0) {
            token.attrPush(['style', customStyle]);
          } else {
            token.attrs[styleIndex][1] = token.attrs[styleIndex][1] + '; ' + customStyle;
          }
        }
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
  .use(downgradeHeadersPlugin); // Apply the header fix

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

// async function
export const renderMaxJax: () => Promise<void> = () =>
  window.MathJax.typesetPromise(document.getElementsByClassName('prose'));
