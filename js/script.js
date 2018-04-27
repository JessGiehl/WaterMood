function searchResults(){
  //remove existing elements if present
  // if (document.querySelector('section .error')){
  //   document.querySelector('.error').remove();
  // }
  // if (document.querySelector('.albumlist')){
  //   document.querySelector('.albumlist').remove();
  // }



  //variables for storing api string
  var url = 'https://api.unsplash.com/search/photos';
  var search = '&query=water&orientation=squarish&per_page=9';
  var key = '?client_id=f650c7a43fd96d6cf7d6f23fb570fc123974acce8118a86ec0e9e5f3860bffba';

  //construct string and fetch response
  fetch(url + key + search)
    .then(function(response) {
      //turn response into a JSON object
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
        //create a string to store adjacentHTML
        var output = `<ul class="photogallery">`;
        //create list items for 9 albums
        for (var i = 0; i < 9; i++) {
          output +=
          `<li>
            <img src="${myJson.results[i].urls.small}"
                 srcset="${myJson.results[i].urls.small} 400w, ${myJson.results[i].urls.regular} 1080w"
                 alt= "A photo of water" />
            <div class="metadata">
              <p class="user">${myJson.results[i].user.username}</p>
              <p class="likes">${myJson.results[i].likes}</p>
            </div>
            <a href="${myJson.results[i].links.html}">Original Image</a>
          </li>`;
             // <img src="${myJson.topalbums.album[i].image[3]['#text']}">
             // <h3>${myJson.topalbums.album[i].name}</h3>
             // <p>${myJson.topalbums.album[i].artist.name}</p>
             // <p><a href="${myJson.topalbums.album[i].url}">${myJson.topalbums.album[i].name}</a></p>
        }
        output += `</ul>`;

        document.querySelector('section').insertAdjacentHTML('afterbegin', output);
    })
    .catch(error => console.error(error));
}
searchResults();
