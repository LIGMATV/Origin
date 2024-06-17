// https://stackoverflow.com/a/73692596

function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('code[class*="language-"]');
    codeBlocks.forEach((block) => {
      const lang = parseLanguage(block);
      const referenceEl = block.parentElement;
      const parent = block.parentElement.parentElement;
      
      const wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper';
      parent.insertBefore(wrapper, referenceEl);
      wrapper.append(block.parentElement);

      const copyBtn = document.createElement('button');
      copyBtn.setAttribute('class', 'copy-button');
      copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>`;

      wrapper.insertAdjacentElement('beforeend', copyBtn);
    });

    function parseLanguage(block) {
      const className = block.className;
      if (className.startsWith('language')) {
        const [prefix, lang] = className.split('-');
        return lang;
      }
    }

        async function fallbackCopyTextToClipboard(text) {
            return new Promise((resolve, reject) => {
                var textArea = document.createElement('textarea');
                textArea.value = copyInfo.getText();
                // Avoid scrolling to bottom
                textArea.style.top = '0';
                textArea.style.left = '0';
                textArea.style.position = 'fixed';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    var successful = document.execCommand('copy');
                    setTimeout(function () {
                        if (successful) {
                            resolve('success')
                        } else {
                            reject('error')
                        }
                    }, 1);
                } catch (err) {
                    setTimeout(function () {
                        reject(err)
                    }, 1);
                } finally {
                    document.body.removeChild(textArea);
                }
            })  
        }
    
        async function copyTextToClipboard(text) {
            return new Promise((resolve, reject) => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(
                        resolve(), function () {
                        // try the fallback in case `writeText` didn't work
                        fallbackCopyTextToClipboard(text).then(
                            () => resolve(),
                            () => reject()
                        )
                    });
                } else {
                    fallbackCopyTextToClipboard(text).then(
                        () => resolve(),
                        () => reject()
                    )
                }
            })
        }

    function copy(e) {
        const btn = e.currentTarget;
        const lang = btn.dataset.lang;
        const text = e.currentTarget.previousSibling.children[0].textContent;
        copyTextToClipboard(text)
            .then(
            () => {
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 .018-1.042a.75.75 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0"/></svg>`;
                btn.setAttribute('style', 'opacity: 1');
                
            },
            () => alert('failed to copy'),
        );

        setTimeout(() => {
            btn.removeAttribute('style');
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>`;
        }, 3000);
    }

    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach((btn) => {
        btn.addEventListener('click', copy);
    });
    }
    initCodeCopy()