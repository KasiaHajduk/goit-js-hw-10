'use strict';

//import fetchCountries from './fetchCountries';

import Notiflix from 'notiflix';

let debounce = require('lodash.debounce');

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputBox = document.getElementById("search-box");

const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


function fetchCountries(name) {
    return fetch("https://restcountries.com/v2/name/" + name + "?fields=name,population,languages,capital,flags",
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name.');
            console.log('tutaj' + error);
            countryInfo.innerHTML = "";
            countryList.innerHTML = "";
        });
        ;
    }

function renderCountryListInfo(countries) {
    if (countries.length > 10)
    {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
    }
    else if (countries.length >= 2 && countries.length <= 10){
        const countriesList = countries.map((country) => {
        return `
            <li>
                <img src = "${country.flags.svg}" alt="flag" width="30px" height="20"/>
                <span >${country.name}</span>
            </li>
             `;
        })
        .join("");
        countryList.innerHTML = countriesList;
        countryInfo.innerHTML = "";
    }
    else {
        const landInfo = countries.map((country) => {
            console.log(country);
            return `
            <div style="font-size: 30px; align-items: center; margin: auto;">
                <img src = "${country.flags.svg}" alt="flag" width="40" height="25"/>
                <span><b>${country.name}</b></span>
            </div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${country.languages.map(language => language.name)}</p>
        `;
        })
        countryInfo.innerHTML = landInfo;
        countryList.innerHTML = "";
    }
}


function eventHandler(event) {
    const name = event.target.value.trim();
    console.log("w kliku");
    console.log("-"+inputBox.value+"-");
    console.log("-"+name+"-");
    if (name.length < 1){
        Notiflix.Notify.info('Enter the country name.');
        return;
    }
    
    fetchCountries(name)
        .then((countries) => {
            renderCountryListInfo(countries);
        })
        .catch((error) => {
            Notiflix.Notify.failure('Oops, there is no country with that name.');
            console.log('tutaj' + error);
            countryInfo.innerHTML = "";
            countryList.innerHTML = "";
        });
    }


inputBox.addEventListener("input", debounce(eventHandler, DEBOUNCE_DELAY));
    



//INTERFEJS
document.body.style.backgroundImage = 'radial-gradient(#cfd0d2 1%, transparent 10%)';
document.body.style.backgroundSize = '25px 25px';


inputBox.style.fontSize = '20px';
inputBox.style.marginLeft = '40px';
inputBox.style.border = '1px solid #12428a';
inputBox.style.borderRadius = '2px';

//countryList.style.marginLeft = '20px';
countryList.style.listStyle = 'none';
countryList.style.display = 'flex';
countryList.style.flexDirection = 'column';
countryList.style.fontSize = '20px';

countryInfo.style.marginLeft = '40px';
countryInfo.style.fontSize = '20px';
