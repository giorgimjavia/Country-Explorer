const input = document.getElementById("input");
const search = document.getElementById("search");
const countryElement = document.getElementById("countryName");
const capitalElement = document.getElementById("capital");
const languagesElement = document.getElementById("languages");
const continentsElement = document.getElementById("continents");
const areaElement = document.getElementById("area");
const populationElement = document.getElementById("population");
const flagElement = document.getElementById("flag").getElementsByTagName("img")[0];
const content = document.querySelector(".content");

search.addEventListener("click", () => {
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    }
})

async function getData() {
    search.addEventListener("click", async () => {

        const countryName = input.value;


        const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const json = await response.json();

            console.log(json);

            const country = json[0];
            console.log(country);


            const capital = country.capital ? country.capital[0] : 'Unknown';
            const languages = country.languages ? Object.values(country.languages) : ['Unknown'];
            const continents = country.continents ? country.continents[0] : 'Unknown';
            const area = country.area ? country.area : 'Unknown';
            const population = country.population ? country.population : 'Unknown';
            const flagUrl = country.flags && country.flags.png ? country.flags.png : 'default-flag.png';


            capitalElement.innerHTML = `${capital}`;
            languagesElement.innerHTML = `${languages}`;
            continentsElement.innerHTML = `${continents}`;
            populationElement.innerHTML = `${population}`;
            areaElement.innerHTML = `${area} km<sup>2</sup>`;

            flagElement.src = flagUrl;

        } catch (error) {
            console.error(error.message);
        }
    })
}


getData();



