let newsList = [];
const categoryMenus = document.querySelectorAll(".btn-wrap button");
const textValue = document.querySelector("#text-value");

// 1. 인풋창에 입력시 콘솔찍히게하기
// 2. Enter 이벤트추가하기
// 3. 해당 키워드 입력한 값 그리기

let url;

const getLatesNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  //   console.log("url: ", url);
  const response = await fetch(url);
  console.log("response: ", response);
  const data = await response.json();
  //   console.log("data: ", data);
  newsList = data.articles;
  render();
};
getLatesNews();
// api 호출시 해당 뉴스 UI
const render = () => {
  let newsHTML = ``;
  newsHTML = newsList
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
              <p>
               ${item.description}
              </p>
              <div class="date">${item.rights || "no source"}  ${moment(
        item.published_date
      ).fromNow()}</div>
            </div>
          </section>`;
    })
    .join("");

  document.querySelector("#main-wrap").innerHTML = newsHTML;
};
