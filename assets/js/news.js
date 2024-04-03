const ApiKey = "8dd91f5733ee448290e883ec4af90b28";

let currentPage = 1;
let currentCategory = null;
let currentKeyword = null;
let isLoading = false;
let lastArticleCount = 0;

async function fetchNews(isSearching) {
  if (isLoading) return;

  isLoading = true;
  let url;
  if (isSearching) {
    const keyword = document.getElementById("searchKeyword").value;
    url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${ApiKey}&page=${currentPage}`;
  } else {
    const category =
      currentCategory || document.getElementById("category").value;
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${ApiKey}&page=${currentPage}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    const newsContainer = document.getElementById("newsContainer");
    if (currentPage === 1) {
      newsContainer.innerHTML = "";
    }
    const articlesWithImage = data.articles ? data.articles.filter(
      (article) => article.urlToImage
    ) : [];
    if (
      articlesWithImage.length === 0 ||
      articlesWithImage.length === lastArticleCount
    ) {
      displayNoMoreNews();
      return;
    }
    lastArticleCount = articlesWithImage.length;

    articlesWithImage.forEach((article) => {
      const newsItem = `
        <div class="newsItem">
          <div class="newsImage">
            <img src="${article.urlToImage}" alt="${article.title}">
          </div>
          <div class="newsContent">
            <div class="info">
              <h5>${article.source.name}</h5>
              <span>|</span>
              <h5>${new Date(article.publishedAt).toLocaleDateString()} 
              ${new Date(article.publishedAt).toLocaleTimeString()}
              </h5>
            </div>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${
              article.url
            }" class="uniBtn" target="_blank">Read More</a>
          </div>
        </div>
      `;
      newsContainer.innerHTML += newsItem;
    });
    currentPage++;
  } catch (error) {
    console.error("There was an error fetching the news:", error);
  } finally {
    isLoading = false;
  }
}

function displayNoMoreNews() {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML += "<p>No more news to load.(This news loads on local hosting clone this project)</p>";
}

window.onscroll = function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    if (currentKeyword) {
      fetchNews(true);
    } else {
      fetchNews(false);
    }
  }
};

document.getElementById("searchKeyword").addEventListener("input", function () {
  currentPage = 1;
  currentCategory = null;
  currentKeyword = this.value;
});

document.getElementById("fetchCategory").addEventListener("click", function () {
  currentPage = 1;
  currentKeyword = null;
  fetchNews(false);
});

