import Notiflix from 'notiflix';

let debounce = require('lodash.debounce');


import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const create = document.querySelector('[data-create]');
const inputBox = document.getElementById("search-box");

console.log(inputBox);


const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function fetchCountries(name) {
    return fetch("https://restcountries.com/v3.1/name/" + name + "?fields=name,population,languages,capital,flags"
        ).then((response) => {
            if (!response.ok) {
                Notiflix.Notify.failure('Oops, there is no country with that name')
                return;
                }
            return response.json();
        });
    }

function renderCountryList(countries) {
    const howMany = countries.length;
    console.log(howMany);
    if (howMany > 10)
    {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
        //return ``;

    }
    else if (2<=howMany & howMany<=10){
        const countriesList = countries.map((country) => {
        return `
            <li>
                <img src = "${country.flags.svg}" alt="flag" width="30px" height="20"/>
                <span>${country.name.common}</span>
            </li>
             `;
        })
        .join("");
        countryList.innerHTML = countriesList;
        countryInfo.innerHTML = "";

    }
    else {
        const landInfo = countries.map((country) => {
        return `
            <img src = "${country.flags.svg}" alt="flag" width="30px" height="20"/>
            <span>${country.name.common}</span>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${country.languages.lenght}</p>
        `;
    })
    countryInfo.innerHTML = landInfo;
    countryList.innerHTML = "";
    }
}


create.addEventListener("input", () => {
    console.log("w kliku");
    console.log(inputBox.value);
    const land = inputBox.value;
    fetchCountries(land)
        .then((countries) => {
            renderCountryList(countries);
            //console.log(countries);
        })
        .catch((error) => console.log(error));
});

inputBox.addEventListener("input", debounce(() => {
    const name = inputBox.value;
    if (name.length < 1){
        Notiflix.Notify.info('Enter the country name.');
        return;
    }
   
    fetchCountries(name)
        .then((countries) => {
            renderCountryList(countries);
            //console.log(countries);
        })
        .catch((error) => console.log(error));
    },DEBOUNCE_DELAY)
);




//INTERFEJS
countryList.style.marginTop = '100px';
countryList.style.listStyle = 'none';
countryList.style.display = 'flex';
countryList.style.flexDirection = 'column';
