
// async function pegaDados() {
//     try {
//         const response = await fetch("/api/data?");
//         if (!response.ok) {
//             throw new Error("Erro na requisição");
//         }
//         const data = await response.json();

//         const cardContainer = document.getElementById("card-container");

//         // Extrair marcas e modelos únicos
//         const marcas = [...new Set(data.Trims.map(car => car.model_make_id))];
//         const modelos = [...new Set(data.Trims.map(car => car.model_name))];

//         // Preencher os selects com as opções únicas
//         const selectMarca = document.getElementById("selectMarca");
//         const selectModelo = document.getElementById("selectModelo");

//         marcas.forEach(marca => {
//             const option = document.createElement("option");
//             option.value = marca;
//             option.textContent = marca;
//             selectMarca.appendChild(option);
//         });

//         modelos.forEach(modelo => {
//             const option = document.createElement("option");
//             option.value = modelo;
//             option.textContent = modelo;
//             selectModelo.appendChild(option);
//         });

//         const carrosFiltrados = data.Trims.filter(car => (
//             (!selectMarca.value || car.model_make_id === selectMarca.value) &&
//             (!selectModelo.value || car.model_name === selectModelo.value)
//         ));

//         cardContainer.innerHTML = "";

//         const maxCardsPerModel = 1;
//         const cardsPerModel = {};

//         for (let i = 0; i < carrosFiltrados.length; i++) {
//             const car = carrosFiltrados[i];

//             if (!cardsPerModel[car.model_make_id]) {
//                 cardsPerModel[car.model_make_id] = 1;
//             } else if (cardsPerModel[car.model_make_id] < maxCardsPerModel) {
//                 cardsPerModel[car.model_make_id]++;
//             } else {
//                 continue;
//             }

//             const novoCard = document.createElement("div");
//             novoCard.className = "card card-custom";

//             novoCard.innerHTML = `
//                 <img src="../assets/img-cards-home.svg" alt="">
//                 <div class="card-body">
//                     <h3>${car.model_make_id} ${car.model_name}<span>${car.model_year}</span></h3>
//                     <div class="about-car">
//                         Portas: ${car.model_doors}<br />
//                         Câmbio: ${car.model_transmission_type}<br />

//                         </div>
//                     <a href="#" class="btn-custom-menu">VER ORÇAMENTO</a>
//                     <hr>
//                     <div class="location">
//                         <i><img src="../assets/location_on_24px.svg" alt=""></i>
//                         <p class="location-card">${car.make_country}</p>
//                     </div>
//                 </div>
//             `;

//             cardContainer.appendChild(novoCard);
//         }
//     } catch (error) {
//         console.error("Erro na requisição", error);
//         throw error;
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     pegaDados();

//     // Adicionando event listeners para chamar pegaDados quando os selects forem alterados
//     document.getElementById("selectMarca").addEventListener("change", pegaDados);
//     document.getElementById("selectModelo").addEventListener("change", pegaDados);
// });


let data; 

async function pegaDados() {
    try {
        const response = await fetch("/api/data?");
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        data = await response.json(); 

        const cardContainer = document.getElementById("card-container");
        const selectMarca = document.getElementById("selectMarca");
        const selectModelo = document.getElementById("selectModelo");

        const marcas = [...new Set(data.Trims.map(car => car.model_make_id))];
        const modelos = [...new Set(data.Trims.map(car => car.model_name))];

        marcas.forEach(marca => {
            const option = document.createElement("option");
            option.value = marca;
            option.textContent = marca;
            selectMarca.appendChild(option);
        });

        selectMarca.addEventListener("change", () => {
            atualizaModelos();
        });

        selectModelo.addEventListener("change", () => {
            pegaDados();
        });

        const carrosFiltrados = data.Trims.filter(car => (
            (!selectMarca.value || car.model_make_id === selectMarca.value) &&
            (!selectModelo.value || car.model_name === selectModelo.value)
        ));

        cardContainer.innerHTML = "";

        const maxCardsPerModel = 4;
        const cardsPerModel = {};

        for (let i = 0; i < carrosFiltrados.length; i++) {
            const car = carrosFiltrados[i];

            if (!cardsPerModel[car.model_make_id]) {
                cardsPerModel[car.model_make_id] = 1;
            } else if (cardsPerModel[car.model_make_id] < maxCardsPerModel) {
                cardsPerModel[car.model_make_id]++;
            } else {
                continue;
            }

            const novoCard = document.createElement("div");
            novoCard.className = "card card-custom";

            novoCard.innerHTML = `
                <img src="../assets/img-cards-home.svg" alt="">
                <div class="card-body">
                    <h3>${car.model_make_id} ${car.model_name}<span>${car.model_year}</span></h3>
                    <div class="about-car">
                         Portas: ${car.model_doors}<br />
                         Câmbio: ${car.model_transmission_type}<br />
                         </div>
                    <a href="#" class="btn-custom-menu">VER ORÇAMENTO</a>
                    <hr>
                    <div class="location">
                        <i><img src="../assets/location_on_24px.svg" alt=""></i>
                        <p class="location-card">${car.make_country}</p>
                    </div>
                </div>
            `;

            cardContainer.appendChild(novoCard);
        }
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
}

function atualizaModelos() {
    const selectMarca = document.getElementById("selectMarca");
    const selectModelo = document.getElementById("selectModelo");

    selectModelo.innerHTML = '<option value="">Selecione o Modelo</option>';

    const modelosFiltrados = [...new Set(
        data.Trims
            .filter(car => !selectMarca.value || car.model_make_id === selectMarca.value)
            .map(car => car.model_name)
    )];

    modelosFiltrados.forEach(modelo => {
        const option = document.createElement("option");
        option.value = modelo;
        option.textContent = modelo;
        selectModelo.appendChild(option);
    });

    if (!selectModelo.value) {
        pegaDados();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    pegaDados();
});
