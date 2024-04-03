async function search() {
  const query = document.getElementById("searchInput").value;

  if (query.trim() !== "") {
    await searchGoogle(query);
    await searchWikipedia(query);
  } else {
    alert("Please enter a search query.");
  }
}

async function searchGoogle(query) {
  try {
    const apiKey = "AIzaSyCDHeeL9vrctoNnD_3SVV_bqXHvo60ysy0";
    const cx = "c10187e22a55b452b";
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

    const response = await fetch(url);
    const data = await response.json();
    displayGoogleResults(data.items);
  } catch (error) {
    console.error("Error fetching Google search results:", error);
  }
}

async function searchWikipedia(query) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodeURIComponent(
      query
    )}`;

    const response = await fetch(url);
    const data = await response.json();
    displayWikipediaResults(data.query.search);
  } catch (error) {
    console.error("Error fetching Wikipedia search results:", error);
  }
}

function displayGoogleResults(items) {
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = "";

  if (items.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  const colors = ["#4285F4", "#34A853", "#FBBC05", "#EA4335"];

  // Shuffle the array
  shuffleArray(colors);

  items.forEach(function (item, index) {
    const title = item.title;
    const link = item.link;
    const snippet = item.snippet;

    const resultDiv = document.createElement("div");
    resultDiv.classList.add("gresult");

    const titleElement = document.createElement("a");
    titleElement.href = link;
    titleElement.textContent = title;
    titleElement.setAttribute("target", "_blank");

    const snippetElement = document.createElement("p");
    snippetElement.textContent = snippet;

    resultDiv.appendChild(titleElement);
    resultDiv.appendChild(snippetElement);

    resultDiv.style.backgroundColor = colors[index % colors.length];

    resultsDiv.appendChild(resultDiv);
  });
}

function displayWikipediaResults(results) {
  const resultsContainer = document.getElementById("wikipediaResults");
  resultsContainer.innerHTML = "";

  results.forEach((result) => {
    const resultElement = document.createElement("div");
    resultElement.className = "wikipediaResult";
    resultElement.innerHTML = `
      <h3>${result.title}</h3>
      <p>${result.snippet}</p>
      <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
    `;
    resultsContainer.appendChild(resultElement);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
