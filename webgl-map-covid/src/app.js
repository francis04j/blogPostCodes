import Globe from 'globe.gl';
import { request, getCoordinates, numberWithCommas, formatDate } from './utils';
import {
  GLOBE_IMAGE_URL,
  BACKGROUND_IMAGE_URL,
  GEOJSON_URL,
  CASES_API,
  COUNTRIES_API,
} from './constants';
import * as d3 from 'd3';

// Globe container
const globeContainer = document.getElementById('globeViz');

const colorScale = d3.scaleSequentialPow(d3.interpolateYlOrRd).exponent(1 / 4);
const getVal = (feat) => {
  return feat.mapData.confirmed / feat.properties.POP_EST;
};

let world;
let flagName;
const flagEndpoint = 'https://corona.lmao.ninja/assets/img/flags';
let countries = require('../resources/countriesV1');

init();

function init() {
  world = Globe()(globeContainer)
    .globeImageUrl(GLOBE_IMAGE_URL)
    .backgroundImageUrl(BACKGROUND_IMAGE_URL)
    .showGraticules(false)
    .polygonAltitude(0.06)
    .polygonCapColor((feat) => colorScale(getVal(feat)))
    .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')
    .polygonStrokeColor(() => '#111')
    .polygonLabel(({ properties: d, mapData: c }) => {
      if (d.ADMIN === 'France') {
        flagName = 'fr';
      } else if (d.ADMIN === 'Norway') {
        flagName = 'no';
      } else {
        flagName = d.ISO_A2.toLowerCase();
      }
      if (c.feature === 'Fact') {
        return `
          <div class="card">
            <img class="card-img" src="${flagEndpoint}/${flagName}.png" alt="flag" />
            <div class="container">
              <span class="card-title"><b>${d.NAME}</b></span> <br />
              <div class="card-spacer"></div>
              <hr />
              <div class="card-spacer"></div>
              <span>Capital: ${(c.capital)}</span>  <br />
              <span>Cities: ${(c.cities)}</span> <br />
              <span>Languges: ${(c.languages)}</span> <br />
              <span>Population: ${d3.format('.3s')(d.POP_EST)}</span>
            </div>
          </div>
        `;
      }else{
        return `
          <div class="card">
            <img class="card-img" src="${flagEndpoint}/${flagName}.png" alt="flag" />
            <div class="container">
              <span class="card-title"><b>${d.NAME}</b></span> <br />
              <div class="card-spacer"></div>
              <hr />
              <div class="card-spacer"></div>
              <span>Cases: ${numberWithCommas(c.confirmed)}</span>  <br />
              <span>Deaths: ${numberWithCommas(c.deaths)}</span> <br />
              <span>Recovered: ${numberWithCommas(c.recoveries)}</span> <br />
              <span>Population: ${d3.format('.3s')(d.POP_EST)}</span>
            </div>
          </div>
        `;
      }
    })
    .onPolygonHover((hoverD) =>
      world
        .polygonAltitude((d) => (d === hoverD ? 0.12 : 0.06))
        .polygonCapColor((d) =>
          d === hoverD ? 'steelblue' : colorScale(getVal(d))
        )
    )
    .polygonsTransitionDuration(200);

  getCases();
}

// let dates = [];
// let countries = [];
let featureCollection = [];

// Play button
// const playButton = document.querySelector('.play-button');
// Slider
// const slider = document.querySelector('.slider');
// Slider date
// const sliderDate = document.querySelector('.slider-date');

async function getCases() {
  
  featureCollection = (await request(GEOJSON_URL)).features;

  // world.polygonsData(countriesWithCovid);
  document.querySelector('.title-desc').innerHTML =
  'Hover on a country or territory see my comments about the place ';

 // dates = Object.keys(countries.China);

  // Set slider values
  //slider.max = dates.length - 1;
 // slider.value = dates.length - 1;

 // slider.disabled = false;
  // playButton.disabled = false;

 //  updateCounters();
  updatePolygonsData();
  // initPolygonData();
  updatePointOfView();
}

async function initPolygonData() {
  featureCollection = (await request(GEOJSON_URL)).features;
  for (let x = 0; x < featureCollection.length; x++) {
   
    featureCollection[x].mapData = {
      feature: 'Fact',
      confirmed: x,
      deaths: 0,
      recoveries: 0,
    };
  }

  const maxVal = Math.max(...featureCollection.map(getVal));
  colorScale.domain([0, maxVal]);
  world.polygonsData(featureCollection);
}

async function updatePolygonsData() {
  for (let x = 0; x < featureCollection.length; x++) {
   // console.log(featureCollection[x].properties)
    const country = featureCollection[x].properties.NAME;
    const postal = featureCollection[x].properties.POSTAL;
    let capitalCity;
      let API_URL = `${COUNTRIES_API}/${country}`
      countries = await request(API_URL);
     // TODO: add special cases for Taiwan and others, countries with no capital
     if(countries && countries[0]) {
      console.log('Capital',country, postal, countries[0].capital)
      capitalCity = countries[0].capital
     }else {
      capitalCity = 'Unknown'
     }
     // console.log('Capital city', countries[1][0]['capitalCity'])
      if(country == 'Nigeria'){
        featureCollection[x].mapData = {
          feature: 'Fact',
          confirmed: x,
          capital: capitalCity,
          cities: 'Loading cities...',
          languages: 'Loading languages...'
        };
      }else
      if(country == 'Ireland'){
        featureCollection[x].mapData = {
          feature: 'Fact',
          confirmed: x,
          capital: capitalCity,
          cities: 'Loading cities...',
          languages: 'Loading languages...'
        };
      }
      else
      if(country == 'France'){
        featureCollection[x].mapData = {
          feature: 'Fact',
          confirmed: x,
          capital: capitalCity,
          cities: 'Loading cities...',
          languages: 'Loading languages...'
        };
      }
      else{
        featureCollection[x].mapData = {
          feature: 'Fact',
          confirmed: 0,
          capital: capitalCity,
          cities: 'Loading cities...',
          languages: 'Loading languages...'
        };
      }
  
  }

  const maxVal = Math.max(...featureCollection.map(getVal));
  colorScale.domain([0, maxVal]);
  world.polygonsData(featureCollection);
}

async function updatePointOfView() {
  // Get coordinates
  try {
    const { latitude, longitude } = await getCoordinates();

    world.pointOfView(
      {
        lat: latitude,
        lng: longitude,
      },
      1000
    );
  } catch (e) {
    console.log('Unable to set point of view.');
  }
}

// let interval;

// playButton.addEventListener('click', () => {
//   if (playButton.innerText === 'Play') {
//     playButton.innerText = 'Pause';
//   } else {
//     playButton.innerText = 'Play';
//     clearInterval(interval);
//     return;
//   }

//   // Check if slider position is max
//   if (+slider.value === dates.length - 1) {
//     slider.value = 0;
//   }

//   sliderDate.innerHTML = dates[slider.value];

//   interval = setInterval(() => {
//     slider.value++;
//     sliderDate.innerHTML = dates[slider.value];
//     updateCounters();
//     updatePolygonsData();
//     if (+slider.value === dates.length - 1) {
//       playButton.innerHTML = 'Play';
//       clearInterval(interval);
//     }
//   }, 200);
// });

// if ('oninput' in slider) {
//   slider.addEventListener(
//     'input',
//     function () {
//       updateCounters();
//       updatePolygonsData();
//     },
//     false
//   );
// }

// Responsive globe
window.addEventListener('resize', (event) => {
  world.width([event.target.innerWidth]);
  world.height([event.target.innerHeight]);
});
