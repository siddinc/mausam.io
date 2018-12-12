window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

const words = document.querySelector('#words');

var apikey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

recognition.addEventListener('result', e => {
  console.log(e.results);
  const transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
  words.value = transcript;
  if (e.results[0].isFinal) {
    if (transcript.includes('weather')) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=mumbai,in&APPID=${apikey}&units=metric`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          var raw_data = JSON.stringify(myJson);
          var data = JSON.parse(raw_data);
          console.log(data);
          var lonCoordinates = 'Longitude: ' + data.coord.lon;
          var latCoordinates = 'Latitude: ' + data.coord.lat;
          var temperature = data.main.temp + ' °C';
          var pressure = data.main.pressure/1013.25 + ' atm';
          var humidity = data.main.humidity + ' %';
          var weather = data.weather[0].main;
          var windSpeed = (data.wind.speed * 18)/5 + ' km/hr';
          var icon = data.weather[0].icon;

          var x1 = document.querySelector('#x1');
          var x2 = document.querySelector('#x2');
          var x3 = document.querySelector('#x3');
          var x4 = document.querySelector('#x4');
          var x5 = document.querySelector('#x5');
          var x6 = document.querySelector('#x6');
          var x7 = document.querySelector('#x7');
          var x8 = document.querySelector('#x8');

          x1.src = `http://openweathermap.org/img/w/${icon}.png`;
          x2.textContent = weather;
          x3.value = lonCoordinates;
          x4.value = latCoordinates;
          x5.value = temperature;
          x6.value = pressure;
          x7.value = humidity;
          x8.value = windSpeed;

        });
    }
  }

  console.log(transcript);

});
recognition.addEventListener('end', recognition.start);
recognition.start();
