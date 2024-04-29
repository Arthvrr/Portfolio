//TRANSITION FLUIDE POUR ALLER À ENDROITS DE LA PAGE
document.querySelectorAll('.link-page a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});





//GÉRER L'ACCORDÉON
var accordions = document.getElementsByClassName("accordion");

for (var i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

//CHANGER COULEUR BACKGROUND SI POSITIF/NÉGATIF
function changeBackgroundColor(diffEuro,diffPercent){
    const returnEuroCell = document.getElementById('return-euro');
    const returnPercentCell = document.getElementById('return-percent');

    diffEuro = parseFloat(diffEuro);
    diffPercent = parseFloat(diffPercent);

    if (diffEuro > 0){
        returnEuroCell.style.backgroundColor = 'lightgreen';
    } 
    else if (value < 0) {
        returnEuroCell.style.backgroundColor = 'lightcoral';
    }
    else {
        returnEuroCell.style.backgroundColor = '';
    }

    if (diffPercent > 0){
        returnPercentCell.style.backgroundColor = 'lightgreen';
    } 
    else if (value < 0) {
        returnPercentCell.style.backgroundColor = 'lightcoral';
    }
    else {
        returnPercentCell.style.backgroundColor = '';
    }
}

//TOUTES LES VARIABLES UTILISÉES
var totalInvested = 5600; // montant total investi
var totalInvestedCell = document.getElementById("invested");
totalInvestedCell.textContent = totalInvested;

var CashOnHand = 222.09; // cash disponible
var cashCell = document.getElementById("cash");
cashCell.textContent = CashOnHand.toFixed(2);

var tickerOfShares = ["AAPL", "MA", "MSFT", "V"]; // tickers
var numberOfShares = [9, 4, 5, 5]; // nombres d'actions
var pruOfShares = [176.6352, 411.6737, 321.36, 229.595]; // PRU des 4 actions


var stocksPrice = []; // prix actuels des 4 actions, en $
let totalPRU = 0;
const valueOfStocks = []; // liste pour stocker les valeurs des actions, en $
let totalValue = 0; // valeur actuelle du portefeuille, en $

var finalValueOfStocks = []; // liste pour stocker les valeurs des actions, en €
var finalValue = 0; // valeur actuelle du portefeuille, en €

var diffList = [];
var diffPercentList = [];

var dividendPerShares = [0.96,2.64,3.00,2.08]; // liste pour stocker les dividendes versés par actions

var totalDividendPerShares = [];

var yieldOfShares = [];

var years = [2022,2023,2024]; // liste des années, pour les graphes de retours annuels et invested vs wallet value

var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

var dividendPerMonth = [];


//FONCTIONS 

//Obtenir le taux de change Dollar-Euro
const apiKeyCurrency = 'e5075f23dc192ea91c92c824';

async function getExchangeRate() {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await response.json();
        
        if (data && data.rates && data.rates.EUR) {
            const exchangeRate = data.rates.EUR;
            return exchangeRate
        } else {
            console.log("Impossible de récupérer le taux de change pour le moment.");
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du taux de change :', error);
    }
}


/// Remplacez 'YOUR_API_KEY' par votre clé API Finnhub
const apiKey = 'cfeip41r01qoicaf4hk0cfeip41r01qoicaf4hkg';

// Fonction pour récupérer le prix de l'action
async function getStockPrice(symbol, index) {
    try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
        const data = await response.json();

        // Vérifier si les données ont été récupérées avec succès
        if (data.c) {
            const price = data.c;
            stocksPrice[index] = price; // Stocker le prix dans l'indice correspondant de stocksPrice
        } else {
            console.log(`Erreur: Impossible de récupérer les données pour ${symbol}.`);
        }
    } catch (error) {
        console.log('Erreur:', error);
    }
}

// Obtenir le prix de toutes les actions
async function getAllStockPrices() {
    for (let i = 0; i < tickerOfShares.length; i++) {
        await getStockPrice(tickerOfShares[i], i);
    }

    // Appel de la fonction pour calculer le coût total de chaque action
    calculateTotalCostOfShares();
}

// Fonction pour calculer le coût total de chaque action
function calculateTotalCostOfShares() {
    totalValue = 0; // Réinitialiser la valeur totale du portefeuille
    totalPRU = 0; // Réinitialiser le PRU total
    valueOfStocks.length = 0; // Réinitialiser la liste de valeurs

    for (let i = 0; i < numberOfShares.length; i++) {
        const totalCost = numberOfShares[i] * stocksPrice[i]; // Multiplication
        totalValue += totalCost; // Accumuler la valeur totale du portefeuille
        totalPRU += Number((pruOfShares[i] * numberOfShares[i]).toFixed(2)); // Accumuler le PRU total
        
        // Ajouter la valeur totale de chaque action au tableau valueOfStocks
        valueOfStocks.push(totalCost);
    }
}

// Fonction pour calculer la performance en euro et % de chaque action
function calculatePerformanceForAllStocks(currentPrices, pruList, numberOfSharesList) {
    for (let i = 0; i < pruList.length; i++) {
        const currentPrice = currentPrices[i];
        const pru = pruList[i];
        const numberOfShares = numberOfSharesList[i];
        const diffEuro = ((currentPrice - pru) * numberOfShares).toFixed(2);
        const diffPercent = (((currentPrice - pru) / pru) * 100).toFixed(2);
        diffList.push(Number(diffEuro));
        diffPercentList.push(Number(diffPercent));
    }
    return {
        diffList: diffList,
        diffPercentList: diffPercentList
    };
}


function calculateTotalDividendPerShare(exchangeRate) {
    totalDividendPerShares.length = 0; // Réinitialiser le tableau des totaux de dividendes par action
    
    for (let i = 0; i < numberOfShares.length; i++) {
        const totalDividend = Number(((numberOfShares[i] * dividendPerShares[i]) * exchangeRate).toFixed(2)); // Calculer le total des dividendes pour cette action
        totalDividendPerShares.push(totalDividend); // Ajouter le total des dividendes au tableau
    }
}

// Fonction pour calculer le rendement de chaque action
function calculateYieldOfShares() {
    yieldOfShares.length = 0; // Réinitialiser le tableau des rendements par action
    
    for (let i = 0; i < numberOfShares.length; i++) {
        const yield = Number((100 * (dividendPerShares[i] / stocksPrice[i])).toFixed(2)); // Calculer le rendement pour cette action
        yieldOfShares.push(yield); // Ajouter le rendement au tableau
    }
}

function calculateDividendPerMonth() {
    var monthAAPL = ["Février","Mai","Août","Novembre"];
    var monthMA = ["Février","Mai","Août","Novembre"];
    var monthMSFT = ["Mars","Juin","Septembre","Décembre"];
    var monthV = ["Mars","Juin","Septembre","Décembre"];

    for (let i = 0; i < months.length; i++) {
        var currentMonth = months[i];

        // Initialiser le dividende pour ce mois
        var monthlyDividend = 0;

        // Vérifie pour chaque entreprise si le mois actuel correspond à un mois de paiement de dividende
        if (monthAAPL.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[0] / 4;
        }
        if (monthMA.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[1] / 4;
        }
        if (monthMSFT.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[2] / 4;
        }
        if (monthV.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[3] / 4;
        }
        console.log(monthlyDividend);
        toAdd = Number(monthlyDividend.toFixed(2));
        // Stocker le dividende total pour ce mois
        dividendPerMonth.push(toAdd);
    }
}






// Fonction pour remplir le tableau des prix actuels des actions
function fillStockPrices() {
    // Sélectionner tous les éléments <td> avec l'ID "price"
    var priceCells = document.querySelectorAll('#price');

    // Parcourir chaque élément <td> et mettre à jour son contenu avec le prix correspondant
    priceCells.forEach(function(cell, index) {
        // Vérifier si l'index est valide dans le tableau stockPrices
        if (index < stocksPrice.length) {
            // Mettre à jour le contenu de la cellule avec le prix correspondant
            cell.textContent = stocksPrice[index];
        } else {
            // Afficher un message d'erreur si l'index est en dehors des limites du tableau
            console.error('Index out of range for stock prices array.');
        }
    });
}

// Fonction pour remplir le tableau des PRU
function fillAveragePrices() {
    // Sélectionner tous les éléments <td> avec l'ID "price"
    var priceCells = document.querySelectorAll('#average-price');

    // Parcourir chaque élément <td> et mettre à jour son contenu avec le prix correspondant
    priceCells.forEach(function(cell, index) {
        // Vérifier si l'index est valide dans le tableau stockPrices
        if (index < stocksPrice.length) {
            // Mettre à jour le contenu de la cellule avec le prix correspondant
            cell.textContent = (pruOfShares[index]).toFixed(2);
        } else {
            // Afficher un message d'erreur si l'index est en dehors des limites du tableau
            console.error('Index out of range for stock prices array.');
        }
    });
}

// Fonction pour remplir le tableau des nombres de positions par action
function fillNumberOfShares() {
    // Sélectionner tous les éléments <td> avec l'ID "price"
    var priceCells = document.querySelectorAll('#shares');

    // Parcourir chaque élément <td> et mettre à jour son contenu avec le prix correspondant
    priceCells.forEach(function(cell, index) {
        // Vérifier si l'index est valide dans le tableau stockPrices
        if (index < stocksPrice.length) {
            // Mettre à jour le contenu de la cellule avec le prix correspondant
            cell.textContent = (numberOfShares[index]);
        } else {
            // Afficher un message d'erreur si l'index est en dehors des limites du tableau
            console.error('Index out of range for stock prices array.');
        }
    });
}

// Fonction pour remplir le tableau de la valeur totale par action
function fillValueOfStocks(stockPrices,exchangeRate) {
    // Sélectionner tous les éléments <td> avec l'ID "price"
    var priceCells = document.querySelectorAll('#value');

    // Parcourir chaque élément <td> et mettre à jour son contenu avec le prix correspondant
    priceCells.forEach(function(cell, index) {
        // Vérifier si l'index est valide dans le tableau stockPrices
        if (index < stocksPrice.length) {
            // Mettre à jour le contenu de la cellule avec le prix correspondant
            toAdd = Number((valueOfStocks[index] * exchangeRate).toFixed(2));
            cell.textContent = toAdd;
            finalValueOfStocks.push(toAdd);
        } else {
            // Afficher un message d'erreur si l'index est en dehors des limites du tableau
            console.error('Index out of range for stock prices array.');
        }
    });
}

// Fonction pour remplir le tableau du retour sur investissement en euro par action
function fillReturnInEuros(diffListEuro) {
    // Sélectionner tous les éléments <td> avec l'ID "price"
    var priceCells = document.querySelectorAll('#perf-euro');

    // Parcourir chaque élément <td> et mettre à jour son contenu avec le prix correspondant
    priceCells.forEach(function(cell, index) {
        // Vérifier si l'index est valide dans le tableau stockPrices
        if (index < stocksPrice.length) {
            // Mettre à jour le contenu de la cellule avec le prix correspondant
            cell.textContent = diffListEuro[index];
        } else {
            // Afficher un message d'erreur si l'index est en dehors des limites du tableau
            console.error('Index out of range for stock prices array.');
        }
    });
}

// Fonction pour remplir le tableau du retour sur investissement en % par action
function fillReturnInPercent(diffListEuro) {
    // Sélectionner tous les éléments <td> avec l'ID "price"
    var priceCells = document.querySelectorAll('#perf-percent');

    // Parcourir chaque élément <td> et mettre à jour son contenu avec le prix correspondant
    priceCells.forEach(function(cell, index) {
        // Vérifier si l'index est valide dans le tableau stockPrices
        if (index < stocksPrice.length) {
            // Mettre à jour le contenu de la cellule avec le prix correspondant
            cell.textContent = diffPercentList[index];
        } else {
            // Afficher un message d'erreur si l'index est en dehors des limites du tableau
            console.error('Index out of range for stock prices array.');
        }
    });
}

// GRAPHIQUES
// Données pour le premier graphique
function drawFirst(CashOnHand,finalValue) {
    var ctx = document.getElementById('firstChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cash Dispo', 'Placements'],
            datasets: [{
                data: [CashOnHand, finalValue],
                backgroundColor: [
                    'rgba(128, 0, 128, 0.5)', // Couleur pour Cash On Hand
                    'rgba(54, 162, 235, 0.5)'  // Couleur pour Final Value
                ],
                borderColor: [
                    'rgba(128, 0, 128, 1)', // Couleur de bordure pour Cash On Hand
                    'rgba(54, 162, 235, 1)'  // Couleur de bordure pour Final Value
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend : {
                    display:true,
                    position:'bottom'
                },
                title : {
                    display:true,
                    text:'Cash Disponible VS Placements en Actions',
                    position : 'top'
                }
            }
        }
    });
}

function drawSecond(totalInvested,diffEuro) {
    var ctx = document.getElementById('secondChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Argent Investi', 'Gain Total'],
            datasets: [{
                data: [totalInvested, diffEuro],
                backgroundColor: [
                    'rgba(200, 200, 200, 0.5)', // Couleur pour totalInvested
                    'rgba(75, 192, 192, 0.5)'  // Couleur pour Gain
                ],
                borderColor: [
                    'rgba(200, 200, 200, 1)', // Couleur de bordure pour totalInvested
                    'rgba(75, 192, 192, 1)'  // Couleur de bordure pour Gain
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend : {
                    display:true,
                    position:'bottom'
                },
                title : {
                    display:true,
                    text:'Source de la valeur actuelle du Portefeuille',
                    position : 'top'
                }
            }
        }
    });
}

function drawThird(finalValueOfStocks) {
    var ctx = document.getElementById('thirdChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tickerOfShares,
            datasets: [{
                label:'Valeur par action en €',
                data: finalValueOfStocks,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)', // Bleu pour la première valeur de stocks
                    'rgba(128, 0, 128, 0.5)', // Violet pour le premier gain
                    'rgba(255, 143, 0, 0.5)', // Orange pour la deuxième valeur de stocks
                    'rgba(255, 205, 86, 0.5)'  // Jaune pour le deuxième gain
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Bordure bleue pour la première valeur de stocks
                    'rgba(128, 0, 128, 1)', // Bordure violete pour le premier gain
                    'rgba(255, 143, 0, 1)', // Bordure orange pour la deuxième valeur de stocks
                    'rgba(255, 205, 86, 1)'  // Bordure jaune pour le deuxième gain
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display : true,
                    position : 'bottom'
                },
                title : {
                    display:true,
                    text:'Valeur Totale par Actions',
                    position : 'top'
                }
            }
        }
    });
}

function drawFourth(diffListEuro) {
    var ctx = document.getElementById('fourthChart').getContext('2d');

    var backgroundColors = [];
    var borderColors = [];

    for (var i = 0; i < diffListEuro.length; i++) {
        if (diffListEuro[i] >= 0) {
            // Si la valeur est positive, utiliser la couleur verte
            backgroundColors.push('rgba(75, 192, 192, 0.5)'); // Vert
            borderColors.push('rgba(75, 192, 192, 1)'); // Bordure verte
        } else {
            // Si la valeur est négative, utiliser la couleur rouge
            backgroundColors.push('rgba(255, 99, 132, 0.5)'); // Rouge
            borderColors.push('rgba(255, 99, 132, 1)'); // Bordure rouge
        }
    }

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tickerOfShares, // Assurez-vous que tickerOfShares est défini quelque part
            datasets: [{
                label:'Performance par action en €',
                data: diffListEuro,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display : true,
                    position : 'bottom'
                },
                title : {
                    display:true,
                    text:'Retour sur Investissement par Actions',
                    position : 'top'
                }
            }
        }
    });
}

function drawFifth(totalDividendPerShares) {
    var ctx = document.getElementById('fifthChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tickerOfShares,
            datasets: [{
                label:'Dividende par action',
                data: totalDividendPerShares,
                backgroundColor: [
                    'rgba(51, 70, 79,0.5)'
                ],
                borderColor: [
                    'rgba(51, 70, 79, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display : true,
                    position : 'bottom'
                },
                title : {
                    display:true,
                    text:'Dividendes reçus par Actions',
                    position : 'top'
                }
            }
        }
    });
}

function drawSixth(yieldOfShares) {
    var ctx = document.getElementById('sixthChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tickerOfShares,
            datasets: [{
                label:'Rendement du dividende en %',
                data: yieldOfShares,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)', // Bleu pour la première valeur de stocks
                    'rgba(128, 0, 128, 0.5)', // Violet pour le premier gain
                    'rgba(255, 143, 0, 0.5)', // Orange pour la deuxième valeur de stocks
                    'rgba(255, 205, 86, 0.5)'  // Jaune pour le deuxième gain
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Bordure bleue pour la première valeur de stocks
                    'rgba(128, 0, 128, 1)', // Bordure violete pour le premier gain
                    'rgba(255, 143, 0, 1)', // Bordure orange pour la deuxième valeur de stocks
                    'rgba(255, 205, 86, 1)'  // Bordure jaune pour le deuxième gain
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display : true,
                    position : 'bottom'
                },
                title : {
                    display:true,
                    text:'Rendement par Actions',
                    position : 'top'
                }
            }
        }
    });
}

function drawSeventh(dividendPerMonth) {
    var ctx = document.getElementById('seventhChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label:'Dividende par mois',
                data: dividendPerMonth,
                backgroundColor: [
                    'rgba(0, 17, 255, 0.5)', // Bleu pour la première valeur de stocks
                ],
                borderColor: [
                    'rgba(0, 17, 255, 1)', // Bordure bleue pour la première valeur de stocks
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display : true,
                    position : 'bottom'
                },
                title : {
                    display:true,
                    text:'Dividendes Mensuels',
                    position : 'top'
                }
            }
        }
    });
}

function drawEighth(stocksPrice) {
    var ctx = document.getElementById('eighthChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tickerOfShares,
            datasets: [{
                label : 'PRU',
                data: pruOfShares,
                backgroundColor: [
                    'rgba(214, 0, 0, 0.5)', // Bleu pour la première valeur de stocks
                ],
                borderColor: [
                    'rgba(214, 0, 0, 1)', // Bordure bleue pour la première valeur de stocks
                ],
                borderWidth: 1
            },{
                label : 'Stocks Price',
                data: stocksPrice,
                backgroundColor: [
                    'rgba(0, 214, 207, 0.5)', // Violet pour la première valeur de stocks
                ],
                borderColor: [
                    'rgba(0, 214, 207, 1)', // Bordure violette pour la première valeur de stocks
                ],
                borderWidth: 1
            }
            
        ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display : true,
                    position : 'bottom'
                },
                title : {
                    display:true,
                    text:'Prix des actions VS PRU',
                    position : 'top'
                }
            }
        }
    });
}



// Appel de la fonction pour récupérer les prix de toutes les actions
async function main() {
    await getAllStockPrices();
    const exchangeRate = await getExchangeRate();

    finalValue = totalValue * exchangeRate;
    document.getElementById("wallet-value").textContent = finalValue.toFixed(2);

    totalWallet = finalValue + CashOnHand;
    document.getElementById("total-value").textContent = totalWallet.toFixed(2);

    diffEuro = totalWallet - totalInvested;
    document.getElementById("return-euro").textContent = diffEuro.toFixed(2);

    diffPercent = (diffEuro / totalInvested) * 100;
    document.getElementById("return-percent").textContent = diffPercent.toFixed(2);

    diffPerformance = calculatePerformanceForAllStocks(stocksPrice, pruOfShares, numberOfShares);

    const diffListEuro = diffPerformance.diffList.map(diff => Number((diff * exchangeRate).toFixed(2)));

    calculateTotalDividendPerShare(exchangeRate);
    calculateYieldOfShares();

    console.log(dividendPerMonth);

    calculateDividendPerMonth();




    //CHANGER COULEURS
    changeBackgroundColor(diffEuro,diffPercent);

    //REMPLIR TABLEAUX
    fillStockPrices();

    fillAveragePrices();

    fillNumberOfShares();

    fillValueOfStocks(stocksPrice,exchangeRate);

    fillReturnInEuros(diffListEuro);

    fillReturnInPercent(diffPercentList);



    //DESSINER GRAPHES
    drawFirst(CashOnHand,finalValue);
    drawSecond(totalInvested,diffEuro);
    drawThird(finalValueOfStocks);
    drawFourth(diffListEuro);
    drawFifth(totalDividendPerShares);
    drawSixth(yieldOfShares);
    drawSeventh(dividendPerMonth);
    drawEighth(stocksPrice);

}

main();