// 폰트 스타일을 추가하는 함수
function addFontStyles() {
  const head = document.head;
  const style = document.createElement("style");
  style.innerHTML = `
        @import url("https://fonts.googleapis.com/css2?family=Kaisei+Decol&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");
      `;
  head.appendChild(style);
}

// 폰트 스타일 추가
addFontStyles();
