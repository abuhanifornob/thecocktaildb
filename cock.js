const cockLoad = async(searchItem) => {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchItem}`;
    const res = await fetch(url);
    const data = await res.json();
    displyCock(data.drinks);
    // console.log(data);
}

const displyCock = (cocks) => {
    const cockConatinerID = document.getElementById('cockContainer');

    cockConatinerID.innerHTML = "";
    if (cocks !== null) {
        const searcNotFond = document.getElementById('searcNotFond');
        searcNotFond.classList.add('d-none');
        cocks.forEach(cock => {

            const cockId = document.createElement('div');
            cockId.classList.add('col');
            cockId.innerHTML = `
            <div class="card">
                            <img src="${cock.strDrinkThumb}" class="card-img-top h-50" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${cock.strDrink}</h5>
                                <p class="card-text">${cock.strInstructions ? cock.strInstructions :cock.strInstructionsDE }</p>
                                   <div class="d-flex justify-content-center">
                                   <button class="btn btn-primary text-center px-5" onclick="loadDetailCock(${cock.idDrink})" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</button>
                 
                                   </div>                               
                                </div>
                        </div>
            `;
            cockConatinerID.appendChild(cockId);
        })
    } else {
        const searcNotFond = document.getElementById('searcNotFond');
        searcNotFond.classList.remove('d-none');

    }

}
const searCockDisplay = () => {
    const searchField = document.getElementById('searchField');
    //const searchButton=document.getElementById('searchField');
    const searchValue = searchField.value;
    cockLoad(searchValue);

}

document.getElementById('searchField').addEventListener('keydown', function(event) {
    const searchField = document.getElementById('searchField');
    //const searchButton=document.getElementById('searchField');
    const searchValue = searchField.value;

    if (event.key === "Enter") {
        cockLoad(searchValue);
    }
})

const loadDetailCock = async(cockID) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cockID}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsCock(data.drinks[0]);
}

const displayDetailsCock = (data) => {
    const exampleModalLabel = document.getElementById('exampleModalLabel');
    exampleModalLabel.innerText = data.strDrink;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
       <p>Alcohol:  ${data.strAlcoholic}</p>
    `;
}


cockLoad('');