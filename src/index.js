import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const create = document.querySelector('[data-create]');

const inputBox = document.querySelector("#search-box");

console.log(inputBox);


const userList = document.querySelector(".country-list");



function fetchCountries(name) {
        
    fetch("https://restcountries.com/v3.1/name/" + name)
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
}

fetchCountries("Spain");


        function fetchUsers() {
            return fetch(
                "https://restcountries.com/v3.1/name/rus?fields=name,population,languages,capital,flags"
            ).then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            });
        }

        function renderUserList(users) {
            const markup = users
                .map((user) => {

                    return `<li>
          <p><b>Capital</b>: ${user.name.official}</p>
          <p><b>Population</b>: ${user.population}</p>
          <p><b>Languages</b>: ${user.languages["pol"]}</p>

          <p><b>Capital</b>: ${user.capital}</p>
          <p><b>Flaga</b>: ${user.flags.svg}</p>

        </li>`;
                })
                .join("");
            userList.innerHTML = markup;
        }



create.addEventListener("click", () => {
    console.log("w kliku");
    fetchCountries("Spain");
    fetchUsers()
        .then((users) => {
            renderUserList(users);
            console.log(users);
        }
            )
                .catch((error) => console.log(error));
    
});

// https://restcountries.com/v2/all?fields=name,capital,currencies

// Sources
        //   <p><b>Email</b>: ${user.email}</p>
        //   <p><b>Company</b>: ${user.company.name}</p>
