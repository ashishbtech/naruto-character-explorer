const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const characterCard = document.getElementById("characterCard");


//for the search button click


searchBtn.addEventListener("click", () => {
    const name = searchInput.value.trim();
    if(name){
        fetchCharacter(name);
    }
});



// for the click by enter key

searchInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        searchBtn.click();
    }
});


async function fetchCharacter(name) {
    try{
        characterCard.innerHTML = "<p>Loading...</p>";
        const response = await fetch(`https://dattebayo-api.onrender.com/characters?name=${name}`);

        if(!response.ok){
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if(!data.characters || data.characters.length === 0){
            characterCard.innerHTML = "<p>Character not found </p>";
            return;
        }


        // first matching result
        const character = data.characters[0];

        displayCharacter(character);
        
    } catch (error){
        characterCard.innerHTML ="<p>Something went wrong</p>";
        console.error("Error:", error);
    }
    
}

function displayCharacter(character){

    const image = character.images?.[0] || "https://via.placeholder.com/300x400?text=No+Image";

    const clan = character.personal?.clan || "Not Available";

    const village = character.personal?.affiliation || "Not Available";

    const jutsu = character.jutsu
    ? character.jutsu.slice(0,5).join(",")
    : "Not Available";


    const rank = character.rank?.ninjaRank?.["Part I"] ||
                 character.rank?.ninjaRank?.["Part II"] ||
                 "Not Available";

    const status = character.personal?.status || "Unknown";  
    
    characterCard.innerHTML =`
        <div class="card">
            <img src="${image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p><strong>Clan:</strong> ${clan}</p>
            <p><strong>Village:</strong> ${village}</p>
            <p><strong>Jutsu:</strong> ${jutsu}</p>
            <p><strong>Rank:</strong> ${rank}</p>
            <p><strong>Status:</strong> ${status}</p>
        </div>
    `;
}