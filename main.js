let newsList = [];
let url;

// ✅ DOM 요소 가져오기
const textValue = document.querySelector("#text-value");
const menuBtns = document.querySelectorAll(".btn-wrap button");

// ✅ 이벤트 리스너 등록
menuBtns.forEach((btn) => {
  btn.addEventListener("click", getNewsByCategory);
});
textValue.addEventListener("keyup", getNewsByKeyword);

// ✅ 최신 뉴스 가져오기 (기본 실행)
const getLatestNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

// ✅ 카테고리별 뉴스 가져오기
async function getNewsByCategory(event) {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
}

// ✅ 키워드로 뉴스 검색
function getNewsByKeyword(event) {
  if (event.key === "Enter") {
    const keyword = event.target.value.trim();
    if (keyword) {
      getNews(keyword);
      event.target.value = ""; // 입력창 초기화
    }
  }
}

const getNews = async (keyword) => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

// ✅ 뉴스 UI 렌더링
const render = () => {
  const newsHTML = newsList
    .map((item) => {
      return `<section>
            <div class="img-wrap">
              <img
                src="${
                  item.urlToImage && item.urlToImage.trim()
                    ? item.urlToImage
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }"
              />
            </div>
            <div class="description-wrap">
              <h2>${item.title}</h2>
              <p>${item.description}</p>
              <div class="date">${item.rights || "no source"} ${moment(
        item.published_date
      ).fromNow()}</div>
            </div>
          </section>`;
    })
    .join("");

  document.querySelector("#main-wrap").innerHTML = newsHTML;
};

// ✅ 페이지 로드 시 최신 뉴스 가져오기
getLatestNews();
