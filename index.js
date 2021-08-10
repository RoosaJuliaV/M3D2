let albums = [];
let error = false;

function searchDeezer(query) {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + query, {
    method: "GET",
    headers: {
        "x-rapidapi-key": "ee2d36b39fmsh97cf1f56660e250p12cdf8jsn85080d3b2768",
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // resolved
      console.log("resolved");

      if (data.data) {
        const obj = { title: query, albums: data.data };
        albums.push(obj);
        console.log(albums);
      } else {
        error = true;
      }
    })
    .catch((err) => {
      // rejected
      console.log("rejected");
      console.error(err);
      error = true;
    });
}

window.onload = function () {
  searchDeezer("Eminem");
  searchDeezer("Metallica");
  searchDeezer("Behemoth");
  const renderLink = document.querySelector("#");

  renderLink.addEventListener("click", function () {
    let pageContent = document.querySelector(".page-content");
    let pageContentHTML = "";
    pageContent.childNodes.forEach((node, index) => {
      if (index !== 1) {
        node.remove();
      }
    });
    albums.forEach((albumResult) => {
      let rowContent = "";
      const title = albumResult.title;
      const data = albumResult.albums;

      data.forEach((result) => {
        const title = result.title_short;
        const cover = result.album.cover_medium;
        const id = result.album.id;
        const album = { cover, title, id };
        rowContent += SingleAlbum(album);
      });
      pageContentHTML += AlbumsRow(title, rowContent);
      rowContent = "";
    });
    pageContent.innerHTML += pageContentHTML;
  });
};

function countUniqueAlbums() {
  const albums = document.querySelectorAll(".single-album");
  const ids = [];
  albums.forEach((album) => {
    ids.push(album.id);
  });
  const uniqueSet = new Set(ids);
  console.log(`There is ${uniqueSet.size} unique albums on the page!`);
}