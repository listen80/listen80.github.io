function loadScript(url, callback) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function () {
      head.removeChild(script);
      callback();
    };
  }
  script.src = url;
  const head = document.head
  head.appendChild(script);
}

const link = document.createElement('link')
link.href = 'https://listen80.github.io/code-view/src/code.css'
link.rel = "stylesheet"
document.head.appendChild(link)

loadScript('https://listen80.github.io/code-view/src/code.js', () => {
  document.querySelectorAll('script').forEach(el => {el.style.margin = "16px";code(el)})
})