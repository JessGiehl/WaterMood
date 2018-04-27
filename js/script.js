function searchResults(){
  //get a random value from themed searchTerms array
  var rnd = Math.floor(Math.random() * Math.floor(searchTerms.length));

  //variables for storing api string
  var url = 'https://api.unsplash.com/search/photos';
  var search = `&page=${page}&query=${searchTerms[rnd]}&orientation=squarish&per_page=9`;
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
                 sizes="(min-width: 950px) 30vw, 90vw"
                 alt= "A photo of water" />
            <div class="metadata">
              <div class="user">
                ${user}<p>${myJson.results[i].user.username}</p>
              </div>
              <div class="likes">
                ${heart}<p>${myJson.results[i].likes}</p>
              </div>
            </div>
            <a href="${myJson.results[i].links.html}">Original Image</a>
          </li>`;
        }
        output += `</ul>`;

        document.querySelector('section').insertAdjacentHTML('afterbegin', output);
    })
    .catch(error => console.error(error));
}

var boat = document.querySelector('.boat');

boat.addEventListener('mouseup', function(){
  console.log('ping');
  boat.className = "rockboat";
});

var page = 1;
var searchTerms = ['Ocean', 'Sea', 'Water', 'Sailing', 'Diving', 'Coral', 'Surfing'];
var user = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 20 19"><title>  user-icon</title><desc>  Created with Sketch.</desc><g fill="none"><g fill="#4A4A4A"><path d="M10 9.5C12.6 9.5 14.7 7.4 14.7 4.9 14.7 2.3 12.6 0.2 10 0.2 7.4 0.2 5.3 2.3 5.3 4.9 5.3 7.4 7.4 9.5 10 9.5Z"/><path d="M10 10.7C4.5 10.7 0.7 13.6 0.7 17.7L0.7 18.9 19.3 18.9 19.3 17.7C19.3 13.6 15.5 10.7 10 10.7Z"/></g></g></svg>'
var heart = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 19 17"><title>  heart</title><desc>  Created with Sketch.</desc><g fill="none"><g fill="#4A4A4A"><path d="M17 1.6C14.9-0.5 11.6-0.5 9.5 1.6L9.3 1.8 9.1 1.6C7-0.5 3.7-0.5 1.6 1.6 -0.5 3.6-0.5 7 1.6 9.1L1.7 9.3 9.3 16.8 16.8 9.3 17 9.1C18 8.1 18.6 6.8 18.6 5.3 18.6 3.9 18 2.6 17 1.6L17 1.6Z"/></g></g></svg>'

searchResults();
