function handleSearch() {
    var keyword = document.getElementById('searchInput').value.trim();
    console.log(keyword);
    fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        var matchs= searchNamesWithPluralSupport(data,keyword);
        console.log(matchs);
        var locationsDiv = document.getElementById('locationsList');
        locationsDiv.innerHTML='';
        
  matchs.forEach(function(location) {
      var locationDiv = document.createElement('div');
      locationDiv.classList.add('location');

      var name = document.createElement('h2');
      name.textContent = location.name;

      var imageUrl = document.createElement('img');
      imageUrl.src = location.imageUrl;
      imageUrl.width= 300;

      var description = document.createElement('p');
      description.textContent = location.description;

      locationDiv.appendChild(name);
      locationDiv.appendChild(imageUrl);
      locationDiv.appendChild(description);

      locationsDiv.appendChild(locationDiv);    
      console.log(locationsDiv);  
    });

})}
    

function normalizeKeyword(keyword) {
  return keyword.toLowerCase().replace(/s$/, ''); // remove trailing 's'
}

function searchNamesWithPluralSupport(data, keyword) {
  const normalized = normalizeKeyword(keyword);
  const results = [];

  function search(obj) {
    if (typeof obj !== 'object' || obj === null) return;

    if (typeof obj.name === 'string') {
      const name = obj.name.toLowerCase();
      if (
        name.includes(normalized) || 
        name.includes(normalized + 's') // handle both forms
      ) {
        results.push(obj);
      }
    }

    for (const key in obj) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach(item => search(item));
      } else if (typeof value === 'object') {
        search(value);
      }
    }
  }

  search(data);
  return results;
}

    function handleReset() {
      document.getElementById('searchInput').value = '';
      document.getElementById('locationsList').innerHTML = '';
    }