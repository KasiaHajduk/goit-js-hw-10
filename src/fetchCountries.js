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
            <img src = "${country.flags.svg}" alt="flag" width="30px" />
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

export default fetchCountries;