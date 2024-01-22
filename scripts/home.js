// async function pegaDados() {
//     try {
//         const response = await fetch("https://www.carqueryapi.com/api/0.3/?cmd=getTrims&");
//         if (!response.ok) {
//             throw new Error("Erro na requisição");
//         }
//         const data = await response.json();
//         if ('Trims' in data) {
//             const cars = data.Trims.map(car => ({
//                 model_make_id: car.model_make_id,
//                 model_make_id: car.model_make_id,
//                 model_name: car.model_name,
//                 model_trim: car.model_trim,
//                 model_year: car.model_year,
//             }));

//             const cardContainer = document.getElementById('card-container');
//             const novoCard = document.createElement('div');
//             novoCard.className = 'card card-custom';
//             novoCard.innerHTML = `
//                 <img src="../assets/img-cards-home.svg" alt="">
//                 <div class="card-body">
//                     <h3>${cars[0].model_make_id} ${cars[0].model_name}<span>${cars[0].model_year}</span></h3>
//                     <div class="about-car">${cars[0].model_trim}</div>
//                     <a href="#" class="btn-custom-menu">VER ORÇAMENTO</a>
//                     <hr>
//                     <div class="location">
//                         <i><img src="../assets/location_on_24px.svg" alt=""></i>
//                         <p class="location-card">${cars[0].model_make_id} - ${cars[0].model_name}</p>
//                     </div>
//                 </div>
//                 `
//             cardContainer.appendChild(novoCard)
//         } else {
//             throw new Error("Formato de dados inesperado");
//         }
//     } catch (error) {
//         console.error("Erro na requisição", error);
//         throw error;
//     }
// }

// cardContainer.appendChild(novoCard);

// async function pegaDados() {
//     try {
//         const response = await fetch("https://www.carqueryapi.com/api/0.3/?cmd=getTrims&", { mode: 'no-cors' });

//         if (!response.ok) {
//             throw new Error("Erro na requisição");
//         }
//         const data = await response.json();
//         if ('Trims' in data) {
//             const cars = data.Trims.map(car => ({
//                 model_id: car.model_id,
//                 model_make_id: car.model_make_id,
//                 model_name: car.model_name,
//                 model_trim: car.model_trim,
//                 model_year: car.model_year,
//             }));

//             const cardContainer = document.getElementById('card-container');

//             cars.forEach(car => {
//                 const novoCard = document.createElement('div');
//                 novoCard.className = 'card card-custom';
//                 novoCard.innerHTML = `
//                     <img src="../assets/img-cards-home.svg" alt="">
//                     <div class="card-body">
//                         <h3>${car.model_make_id} ${car.model_name}<span>${car.model_year}</span></h3>
//                         <div class="about-car">${car.model_trim}</div>
//                         <a href="#" class="btn-custom-menu">VER ORÇAMENTO</a>
//                         <hr>
//                         <div class="location">
//                             <i><img src="../assets/location_on_24px.svg" alt=""></i>
//                             <p class="location-card">${car.model_make_id} - ${car.model_name}</p>
//                         </div>
//                     </div>
//                 `;
//                 cardContainer.appendChild(novoCard);
//             });
//         } else {
//             throw new Error("Formato de dados inesperado");
//         }
//     } catch (error) {
//         console.error("Erro na requisição", error);
//         throw error;
//     }
// }

// pegaDados();

async function pegaDados() {
    try {
        const response = await fetch("/api/data?");

        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        const data = await response.json();

        console.log(data);
        const cardContainer = document.getElementById("card-container");

        if (data.Trims && data.Trims.length > 0) {
            const maxCardsPerModel = 3;
            const cardsPerModel = {};

            // Loop through the first 10 items
            for (let i = 0; i < data.Trims.length; i++) {
                const car = data.Trims[i];

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
                        <div class="about-car">${car.model_trim}</div>
                        <a href="#" class="btn-custom-menu">VER ORÇAMENTO</a>
                        <hr>
                        <div class="location">
                            <i><img src="../assets/location_on_24px.svg" alt=""></i>
                            <p class="location-card">${car.model_make_id} - ${car.model_name}</p>
                        </div>
                    </div>
                `;

                cardContainer.appendChild(novoCard);
            }
        } else {
            throw new Error("Formato de dados inesperado");
        }
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    pegaDados();
});


