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

export default fetchCountries;