
    var result = fetch("https://restcountries.com/v2/all")
    result.then((data) => data.json()).then((data1) => {
      console.log(data1);
      var stringBuilder = `
          <div class="box">
          <div class="container">
          <div class="row">`
      for (var i = 0; i < data1.length; i++) {
        if(data1[i].capital != undefined){
          stringBuilder += `
              <div class="col-md-4 mt-3">
          <div class="card bg-grad" style="width: 18rem;">
            <div class="lablCntHeader">${data1[i].name}</div>
          <div class="p-8"><img src="${data1[i].flag}" class="card-img-top" alt=""></div>
          <div class="card-body">
            <h5 class="card-title lblDetails">Capital: ${data1[i].capital}</h5>
            <h5 class="card-title lblDetails">Region: ${data1[i].region}</h5>
            <h5 class="card-title lblDetails">Country Code: ${data1[i].alpha2Code}</h5>
          <div class="dvbtn"><h5 class="card-title lblDetails lblbtn" onclick="knowweather(this)" data-index="${i}" data-capital="${data1[i].capital}">Click to Weather</h5></div>  
          <div class="resulediv resulediv_${i}" style="display:none;">
           
            </div>
   
   
   
          </div>
          </div> </div>`
        }
       
   
      }
      stringBuilder += `  </div>
        </div>
        </div>
        </div>`
      document.getElementById('dvBody').innerHTML = stringBuilder;
   
    });
   
    function knowweather(e) {
      const apiKey = '225cc43f9cb70519c1232feaef314aaf';
      const cityName = $(e).data("capital");
      const index = $(e).data("index");
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
   
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
         
         var stringBuilder ='<div>Temperature: '+data.main.temp+'  c</div>';
         stringBuilder +='<div>Wind: '+data.wind.speed+'</div>';
         stringBuilder +='<div>Humidity: '+data.main.humidity+'</div>';
         stringBuilder +='<div>Description: '+data.weather[0].description+' </div>';
         $(".resulediv_"+index).html(stringBuilder).show();
   
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
   
    }
 
