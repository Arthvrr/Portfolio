//TRANSITION FLUIDE POUR ALLER À ENDROITS DE LA PAGE
document.querySelectorAll('.link-page a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('.link-page-asml a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('.link-page-googl a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('.link-page-ma a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('.link-page-msft a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('.link-page-v a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//GÉRER L'ACCORDÉON + DEPLIEMENT SMOOTH
document.addEventListener("DOMContentLoaded", function() {
  var accordions = document.getElementsByClassName("accordion");
  
  for (var i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      
      if (panel.style.display === "block") {
        panel.style.maxHeight = "0";
        setTimeout(function() {
          panel.style.display = "none";
        }, 300); // Temps de la transition en millisecondes
      } else {
        panel.style.display = "block";
        setTimeout(function() {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }, 10); // Petit délai pour permettre l'animation
      }
    });
  }
});


//CHANGER COULEUR BACKGROUND SI POSITIF/NÉGATIF
function changeBackgroundColor(diffEuro,diffPercent){
    const returnEuroCell = document.getElementById('return-euro');
    const returnPercentCell = document.getElementById('return-percent');

    diffEuro = parseFloat(diffEuro);
    diffPercent = parseFloat(diffPercent);

    if (diffEuro > 0){
        returnEuroCell.style.backgroundColor = 'rgba(0, 99, 27,0.5)';
    } 
    else if (value < 0) {
        returnEuroCell.style.backgroundColor = 'rgba(255, 99, 132, 0.5)';
    }
    else {
        returnEuroCell.style.backgroundColor = '';
    }

    if (diffPercent > 0){
        returnPercentCell.style.backgroundColor = 'rgba(0, 99, 27,0.5)';
    } 
    else if (value < 0) {
        returnPercentCell.style.backgroundColor = 'rgba(255, 99, 132, 0.5)';
    }
    else {
        returnPercentCell.style.backgroundColor = '';
    }
}





//TOUTES LES VARIABLES UTILISÉES

var totalInvested = 16500; // montant total investi
var totalInvestedCell = document.getElementById("invested");
totalInvestedCell.textContent = totalInvested;

var CashOnHand = 384.36; // cash disponible
var cashCell = document.getElementById("cash");
cashCell.textContent = CashOnHand.toFixed(2);

var tickerOfShares = ["ASML", "GOOGL","MA", "MSFT","NVDA", "V"]; // tickers
var numberOfShares = [6, 20, 4, 8, 20, 10]; // nombres d'actions
var pruOfShares = [689.615, 166.19625, 411.6737, 364.5375, 184.04, 274.796]; // PRU des actions

var stocksPrice = []; // prix actuels des actions, en $
let totalPRU = 0;
const valueOfStocks = []; // liste pour stocker les valeurs des actions, en $
let totalValue = 0; // valeur actuelle du portefeuille, en $

var finalValueOfStocks = []; // liste pour stocker les valeurs des actions, en €
var finalValue = 0; // valeur actuelle du portefeuille, en €

var averageValuePerStocks //valeur moyenne par action

var diffList = [];
var diffPercentList = [];

var stocksPERatio = []; // PE Ratio de toutes les actions
var tenyearsPERatio = [35.18,28.09,37.82,33.67,53.05,33.46] // PE Ratio médian des 10 dernières années
var gurufocusPrice = [1071.75,188.92,583.98,488.81,235.3,316.89]
var tipsrankPrice = [1052.12,267.53,655.69,630.29,242,399.05]
var stocksFairPrice = []; // Liste des scores de prix juste
var valuationScore = []; // Score de valorisation de chaque actions

var dividendPerShares = [7.42, 0.84, 3.04, 3.32, 0.04, 2.68]; // liste pour stocker les dividendes versés par actions en $

var totalDividendPerShares = []; //liste pour stocker les dividendes versés par action en €

var totalDividend = 0; //motant total des dividendes touchés par an

var yieldOfShares = [];

var yieldOfWallet = 0; //Rendement total du portefeuille

var years = [2022,2023,2024,2025,2026]; // liste des années, pour les graphes de retours annuels et invested vs wallet value

var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

var dividendPerMonth = [];

var dividendPerMonthNet = [];

var annualReturnEuro = [0,442.03,2104.53,3533.41]; // liste des retours annuels, en euro

var annualReturnPercent = [0,8.26,30.76,18.55]; //liste des retours annuels, en pourcent

var annualDividendReceived = [12.35, 41.31,42.4,73.62]; //liste des dividendes annuels nets reçus

var totalGainWithoutDividend = 0; //gain total en bourse des plus-value (sans dividendes reçus)

var annualInvested = [0,5350,6400,16500]; //liste qui stocke le nombres d'euros investi par an

var walletEndYear = [0,5792.03,8946.56,22579.97]; //liste qui stocke la valeur du portefeuille à la fin de chaque année

var ASMLCotation = [100,67,50,100,100];
var GOOGLCotation = [100,67,33,100,67];
var MACotation = [67,100,100,50,100];
var MSFTCotation = [100,100,67,100,67];
var NVDACotation = [100,100,100,100,100];
var VCotation = [67,67,83,100,100];
var stocksCotation = [ASMLCotation,GOOGLCotation,MACotation,MSFTCotation,NVDACotation,VCotation];

var ASMLScore = 25;
var GOOGLScore = 22;
var MAScore = 25;
var MSFTScore = 26;
var NVDAScore = 30;
var VScore = 25;
var stocksScore = [ASMLScore, GOOGLScore, MAScore,MSFTScore,NVDAScore,VScore];

var annualMarketReturnPercent = [-19.44,24.23,23.31,15.96]; //retour annuels du S&P500 en pourcent (source : https://www.macrotrends.net/2526/sp-500-historical-annual-returns)

var weightOfStocks = []; //liste qui représente le poids de chaque action du Portefeuille en % (valeurs : [0.24,0.26,0.3,0.2])
var weightedAverages = [];


var dividendData = Array(months.length).fill(0).map(() => Array(4).fill(0)); //Matrice qui représente qui pour chaque action le montant versé en dividende pour tout les mois


var stocksDividendGrowth = [14, 0, 15, 9, 16, 15]; //Tableau représentant les pourcentages d'augmentation du dividende sur 5 ans des actions du portefeuille
var futureYears = []; //Tableau qui va contenir le nombre des 11 prochaines années (2025,2026,2027,...,2035)
var futureDividendsReceived = []; //Tableau qui va contenir le montant brut estimé des dividendes reçu lors des 11 prochaines années


//FONCTIONS 

//Obtenir le taux de change Dollar-Euro avec ExchangeRate
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


// Clé API Twelve Data (à stocker de manière sécurisée en production)
const TWELVE_DATA_API_KEY = '402fb2cdc8714fa4a45593cfe8108cae';

// Fonction pour récupérer le prix actuel du SPY avec Twelve Data
async function getCurrentSPYPrice() {
    try {
        const response = await fetch(`https://api.twelvedata.com/price?symbol=SPY&apikey=${TWELVE_DATA_API_KEY}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.code === 429) {
            console.error('Limite de requêtes API atteinte pour Twelve Data');
            return null;
        }
        
        if (data.price) {
            return parseFloat(data.price);
        }
        
        console.error('Format de réponse inattendu de Twelve Data (prix actuel):', data);
        return null;
    } catch (error) {
        console.error('Erreur avec Twelve Data (prix actuel):', error);
        return null;
    }
}

// Fonction pour récupérer le prix du SPY au début de l'année avec Twelve Data
async function getStartSPYPrice() {
    try {
        const currentYear = new Date().getFullYear();
        const startDate = `${currentYear}-01-01`;
        const endDate = new Date().toISOString().split('T')[0]; // Date d'aujourd'hui
        
        const response = await fetch(
            `https://api.twelvedata.com/time_series?symbol=SPY&interval=1day&start_date=${startDate}&end_date=${endDate}&apikey=${TWELVE_DATA_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.code === 429) {
            console.error('Limite de requêtes API atteinte pour Twelve Data');
            return null;
        }
        
        if (data.values && data.values.length > 0) {
            // Le premier jour de bourse de l'année est le dernier élément du tableau
            const firstTradingDay = data.values[data.values.length - 1];
            return parseFloat(firstTradingDay.close);
        }
        
        console.error('Aucune donnée historique trouvée pour le début d\'année');
        return null;
    } catch (error) {
        console.error('Erreur avec Twelve Data (prix début année):', error);
        return null;
    }
}

// Ancien code supprimé et remplacé par la version avec proxy CORS

// Fonction pour récupérer le PE ratio de l'action
async function getPERatio(symbol, index) {
    try {
        const response = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=valuation&token=${apiKey}`);
        const data = await response.json();

        // Vérifier si les données ont été récupérées avec succès
        if (data.metric && data.metric.peNormalizedAnnual) {
            const peRatio = data.metric.peNormalizedAnnual;
            stocksPERatio[index] = parseFloat(peRatio.toFixed(2)); // Stocker le PE ratio dans l'indice correspondant
        } else {
            console.log(`Erreur: Impossible de récupérer les données du PE ratio pour ${symbol}.`);
        }
    } catch (error) {
        console.log('Erreur:', error);
    }
}

// Obtenir le P/E ratio de toutes les actions
async function getAllPERatios() {
    for (let i = 0; i < tickerOfShares.length; i++) {
        await getPERatio(tickerOfShares[i], i);
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
        const toPush = Number(((numberOfShares[i] * dividendPerShares[i]) * exchangeRate).toFixed(2)); // Calculer le total des dividendes pour cette action
        totalDividendPerShares.push(toPush); // Ajouter le total des dividendes au tableau
        totalDividend += toPush;
        
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

// fonction pour calculer le montant en dividende brut par mois reçus
function calculateDividendPerMonth() {
    var monthASML = ["Février","Mai","Août","Novembre"];
    var monthGOOGL = ["Mars","Juin","Septembre","Décembre"];
    var monthMA = ["Février","Mai","Août","Novembre"];
    var monthMSFT = ["Mars","Juin","Septembre","Décembre"];
    var monthNVDA = ["Mars","Juin","Septembre","Décembre"];
    var monthV = ["Mars","Juin","Septembre","Décembre"];

    for (let i = 0; i < months.length; i++) {
        var currentMonth = months[i];

        // Initialiser le dividende pour ce mois
        var monthlyDividend = 0;

        // Vérifie pour chaque entreprise si le mois actuel correspond à un mois de paiement de dividende
        if (monthASML.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[0] / 4;
        }
        if (monthGOOGL.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[1] / 4;
        }
        if (monthMA.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[2] / 4;
        }
        if (monthMSFT.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[3] / 4;
        }
        if (monthNVDA.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[4] / 4;
        }
        if (monthV.includes(currentMonth)) {
            monthlyDividend += totalDividendPerShares[5] / 4;
        }
        toAdd = Number(monthlyDividend.toFixed(2));
        // Stocker le dividende total pour ce mois
        dividendPerMonth.push(toAdd);
    }
}

//fonction pour calculer le montant en dividende net par mois reçu
function calculateNetDividendPerMonth() {

    //var dividendPerMonthNet = [];

    var ratio = 0.85;

    for (let i = 0; i < dividendPerMonth.length; i++) {
        var netDividend = dividendPerMonth[i] * ratio;
        dividendPerMonthNet.push(Number(netDividend.toFixed(2)));
    }
    return dividendPerMonthNet;
}

function calculateStackedDividendPerMonth() {
    var monthASML = ["Février","Mai","Août","Novembre"];
    var monthGOOGL = ["Mars","Juin","Septembre","Décembre"];
    var monthMA = ["Février", "Mai", "Août", "Novembre"];
    var monthMSFT = ["Mars", "Juin", "Septembre", "Décembre"];
    var monthNVDA = ["Mars", "Juin", "Septembre", "Décembre"];
    var monthV = ["Mars", "Juin", "Septembre", "Décembre"];

    for (let i = 0; i < months.length; i++) {
        var currentMonth = months[i];

        // Stocker les dividendes dans la matrice pour chaque action
        dividendData[i][0] = monthASML.includes(currentMonth) ? Number((totalDividendPerShares[0]/4).toFixed(2)) : 0;
        dividendData[i][1] = monthGOOGL.includes(currentMonth) ? Number((totalDividendPerShares[1]/4).toFixed(2)) : 0;
        dividendData[i][2] = monthMA.includes(currentMonth) ? Number((totalDividendPerShares[2]/4).toFixed(2)) : 0;
        dividendData[i][3] = monthMSFT.includes(currentMonth) ? Number((totalDividendPerShares[3]/4).toFixed(2)) : 0;
        dividendData[i][4] = monthNVDA.includes(currentMonth) ? Number((totalDividendPerShares[4]/4).toFixed(2)) : 0;
        dividendData[i][5] = monthV.includes(currentMonth) ? Number((totalDividendPerShares[5]/4).toFixed(2)) : 0;
    }
    return dividendData;
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
            cell.textContent = (stocksPrice[index]).toFixed(2);
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

            const diffEuro = parseFloat(diffListEuro[index]);
            if (diffEuro > 0) {
                cell.style.color = 'green'; // Vert
            } else if (diffEuro < 0) {
                cell.style.color = 'red'; // Rouge
            } else {
                cell.style.color = ''; // Couleur par défaut (généralement noire)
            }


        } else {
            // Afficher un message d'erreur si l'index est en dehors des limites du tableau
            console.error('Index out of range for stock prices array.');
        }
    });
}

// Fonction pour remplir le tableau du retour sur investissement en % par action
function fillReturnInPercent(diffPercentList) {
    // Sélectionner tous les éléments <td> avec l'ID "price"
    var priceCells = document.querySelectorAll('#perf-percent');

    // Parcourir chaque élément <td> et mettre à jour son contenu avec le prix correspondant
    priceCells.forEach(function(cell, index) {
        // Vérifier si l'index est valide dans le tableau stockPrices
        if (index < stocksPrice.length) {
            // Mettre à jour le contenu de la cellule avec le prix correspondant
            cell.textContent = diffPercentList[index];

            // Changer la couleur du texte en fonction de la valeur
            const diffPercent = parseFloat(diffPercentList[index]);
            if (diffPercent > 0) {
                cell.style.color = 'green'; // Vert
            } else if (diffPercent < 0) {
                cell.style.color = 'red'; // Rouge
            } else {
                cell.style.color = ''; // Couleur par défaut (généralement noire)
            }

        } else {
            // Afficher un message d'erreur si l'index est en dehors des limites du tableau
            console.error('Index out of range for stock prices array.');
        }
    });
}

// fonction pour calculer le poids en pourcentage de chaque action du portefeuille
function calculateWeightOfStocks(finalValueOfStocks,finalValue) {

    for (let i = 0; i < tickerOfShares.length; i++){
        var toAdd = Number((finalValueOfStocks[i] / finalValue).toFixed(3));
        weightOfStocks.push(toAdd);
    }
}

// fonction pour calculer le score pondéré de chaque critère de mon portefeuille
function calculateWeightedAverage(stocksCotation) {
        const numberOfStocks = stocksCotation.length;
        const numberOfSectors = stocksCotation[0].length;

        for (let i = 0; i < numberOfSectors; i++) {
            let totalWeightedSum = 0;
            let totalWeight = 0;

            for (let j = 0; j < numberOfStocks; j++) {
                totalWeightedSum += stocksCotation[j][i] * weightOfStocks[j];
                totalWeight += weightOfStocks[j];
            }
            weightedAverages.push(Number((totalWeightedSum / totalWeight).toFixed(2)));
        }
    }

// fonction permettant de remplir le tableau futureYears (du nombre des 10 prochaines années)
function calculateFutureYears() {

    var currentYear = years[(years.length)-1];

    for (let i = 0; i < 10; i++){
        futureYears.push(currentYear);
        currentYear++;
    }
}

// Fonction pour calculer le pourcentage pondéré d'augmentation des dividendes
function calculateWeightedDividendGrowth(stocksDividendGrowth, weightOfStocks) {
    let weightedDividendGrowth = 0; // Initialisation locale

    for (let i = 0; i < stocksDividendGrowth.length; i++) {
        weightedDividendGrowth += stocksDividendGrowth[i] * weightOfStocks[i];
    }

    weightedDividendGrowth = parseFloat(weightedDividendGrowth.toFixed(2));

    return weightedDividendGrowth; // Retourne la valeur calculée
}

// fonction permettant de calculer le montant en dividende reçu estimé lors des 10 prochaines années
function calculateFutureDividends() {

    var growth = calculateWeightedDividendGrowth(stocksDividendGrowth,weightOfStocks);

    var tempDividendReceived  = totalDividend;
    futureDividendsReceived.push(tempDividendReceived); //dividendes bruts actuels la première année

    for (let i = 0; i < 10; i++){
        var toFill = tempDividendReceived + (tempDividendReceived * (growth/100));
        toFill = parseFloat(toFill.toFixed(2));
        tempDividendReceived = toFill;
        futureDividendsReceived.push(toFill);
    }
}


// GRAPHIQUES
// Données pour le premier graphique
function draw1(CashOnHand,finalValue) {
    var ctx = document.getElementById('1Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cash dispo en €', 'Placements en €'],
            datasets: [{
                data: [CashOnHand, finalValue],
                backgroundColor: [
                    'rgba(255, 215, 0, 0.5)', // Couleur pour Cash On Hand
                    'rgba(54, 162, 235, 0.5)'  // Couleur pour Final Value
                ],
                borderColor: [
                    'rgba(255, 215, 0, 1)', // Couleur de bordure pour Cash On Hand
                    'rgba(54, 162, 235, 1)'  // Couleur de bordure pour Final Value
                ],
                borderWidth: 1
            }]
        },
        options: {
            cutout: '60%',
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display:true,
                    position:'bottom'
                },
                title : {
                    display:true,
                    text:'Cash disponible VS placement en actions',
                    position : 'top',
                    font: {
                        size: 12
                    }
                }
            }
        }
    });
}

function draw2(totalInvested,diffEuro) {
    var ctx = document.getElementById('2Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Argent Investi en €', 'Gain Total en €'],
            datasets: [{
                data: [totalInvested, diffEuro],
                backgroundColor: [
                    'rgba(200, 200, 200, 0.5)', // Couleur pour totalInvested
                    'rgba(0,99,27, 0.5)'  // Couleur pour Gain
                ],
                borderColor: [
                    'rgba(200, 200, 200, 1)', // Couleur de bordure pour totalInvested
                    'rgba(0,99,27, 1)'  // Couleur de bordure pour Gain
                ],
                borderWidth: 1
            }]
        },
        options: {
            cutout: '60%',
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display:true,
                    position:'bottom'
                },
                title : {
                    display:true,
                    text:'Source de la valeur actuelle du Portefeuille',
                    position : 'top',
                    font: {
                        size: 12
                    }
                }
            }
        }
    });
}

function draw3(finalValueOfStocks) {
    var ctx = document.getElementById('3Chart').getContext('2d');

    var averageData = Array(tickerOfShares.length).fill(averageValuePerStocks);

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tickerOfShares,
            datasets: [{
                label:'Valeur par action',
                data: finalValueOfStocks,
                backgroundColor: [
                    // 'rgba(54, 162, 235, 0.5)',
                    'rgba(0, 128, 128, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(128, 0, 128, 0.5)',
                    'rgba(255, 143, 0, 0.5)',
                    'rgba(210, 180, 140, 0.5)',
                    'rgba(255, 205, 86, 0.5)'
                ],
                borderColor: [
                    // 'rgba(54, 162, 235, 1)',
                    'rgba(0, 128, 128, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(128, 0, 128, 1)',
                    'rgba(255, 143, 0, 1)',
                    'rgba(210, 180, 140, 1)',
                    'rgba(255, 205, 86, 1)'
                ],
                borderWidth: 2
            },
            {
                type: 'line',
                label: 'Valeur Moyenne',
                data: averageData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Couleur de fond pour la ligne
                borderColor: 'rgba(255, 99, 132, 1)', // Couleur de la bordure pour la ligne
                borderWidth: 3,
                borderDash: [5, 5], // Utilisez un trait pointillé
                fill: false, // Ne pas remplir l'espace sous la ligne
                spanGaps:true,
                pointRadius: 0, // Aucun point pour la ligne constante
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
                    text:'Valeur Totale par action en €',
                    position : 'top',
                    font: {
                        size: 14
                    }
                }
            },
            scales: {
                x: {
                    type: 'category',
                    labels: tickerOfShares,
                    offset: true // Pour que la ligne commence et se termine aux bords du graphique
                }
            }
        }
    });
}

function draw4(diffListEuro) {
    var ctx = document.getElementById('4Chart').getContext('2d');

    var backgroundColors = [];
    var borderColors = [];

    for (var i = 0; i < diffListEuro.length; i++) {
        if (diffListEuro[i] >= 0) {
            // Si la valeur est positive, utiliser la couleur verte
            backgroundColors.push('rgba(0, 99, 27,0.5)'); // Vert
            borderColors.push('rgba(0, 99, 27, 1)'); // Bordure verte
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
                label:'Retour en €',
                data: diffListEuro,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                yAxisID:'euro-y-axis'
            },
            {
                label: 'Retour en %',
                data: diffPercentList,
                backgroundColor: 'rgba(0, 128, 128,0.25)', // Bleu
                borderColor: 'rgba(0, 128, 128, 1)', // Bordure bleue
                borderWidth: 2,
                type: 'line', // Utiliser un graphique de type ligne
                fill:true,
                yAxisID:'percent-y-axis',
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
                    text:'Retour sur investissement par action',
                    position : 'top',
                    font: {
                        size: 14
                    }
                }
            }
            ,scales: {
                'euro-y-axis': {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        beginAtZero: true
                    }
                },
                'percent-y-axis': {
                    type: 'linear',
                    display: true, // Cacher l'axe Y des pourcentages
                    position: 'right',
                    ticks: {
                        beginAtZero: true
                    },
                    grid: {
                        drawOnChartArea: false // Empêcher les lignes de la grille sur le graphique
                    }
                }
            },
        }
    });
}


function draw5(totalDividendPerShares) {
    var ctx = document.getElementById('5Chart').getContext('2d');

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
                borderWidth: 2
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
                    text:'Dividendes reçu par action en €',
                    position : 'top',
                    font: {
                        size: 14
                    }
                }
            }
        }
    });
}


function draw6(yieldOfShares) {

    var averageYieldOfWallet = Array(yieldOfShares.length).fill(yieldOfWallet);

    var ctx = document.getElementById('6Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tickerOfShares,
            datasets: [{
                label:'Rendement',
                data: yieldOfShares,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(0, 128, 128, 0.5)', // Nouvelle couleur
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(128, 0, 128, 0.5)',
                    'rgba(255, 143, 0, 0.5)',
                    'rgba(210, 180, 140, 0.5)',
                    'rgba(255, 205, 86, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(0, 128, 128, 1)', // Nouvelle couleur
                    'rgba(255, 99, 132, 1)',
                    'rgba(128, 0, 128, 1)',
                    'rgba(255, 143, 0, 1)',
                    'rgba(210, 180, 140, 1)',
                    'rgba(255, 205, 86, 1)'
                ],
                borderWidth: 3,
                fill:true
            }, {
                type: 'line',
                label: 'Rendement Portefeuille',
                data: averageYieldOfWallet,
                
                borderColor: 'rgba(255, 99, 132, 1)', // Rouge pour la ligne moyenne
                borderWidth: 3,
                borderDash: [5, 5], // Style de la ligne en pointillé
                fill:false,
                pointRadius: 0, // Aucun point pour la ligne constante
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
                    text:'Rendement par action en %',
                    position : 'top',
                    font: {
                        size: 14
                    }
                }
            }
        }
    });
}


function draw7(dividendData) {
    var ctx = document.getElementById('7Chart').getContext('2d');

    var dividendASML = dividendData.map(data => data[0]);
    var dividendGOOGL = dividendData.map(data => data[1]);
    var dividendMA = dividendData.map(data => data[2]);
    var dividendMSFT = dividendData.map(data => data[3]);
    var dividendNVDA = dividendData.map(data => data[4]);
    var dividendV = dividendData.map(data => data[5]);

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'ASML',
                    data: dividendASML,
                    backgroundColor: 'rgba(0, 128, 128, 0.5)', // Couleur pour ASML
                    borderColor: 'rgba(0, 128, 128, 1)',
                    borderWidth: 2
                },
                {
                    label: 'GOOGL',
                    data: dividendGOOGL,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)', // Couleur pour GOOGL
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                },
                {
                    label: 'MA',
                    data: dividendMA,
                    backgroundColor: 'rgba(128, 0, 128, 0.5)', // Couleur pour MA
                    borderColor: 'rgba(128, 0, 128, 1)',
                    borderWidth: 2
                },
                {
                    label: 'MSFT',
                    data: dividendMSFT,
                    backgroundColor: 'rgba(255, 143, 0, 0.5)', // Couleur pour MSFT
                    borderColor: 'rgba(255, 143, 0, 1)',
                    borderWidth: 2
                },
                {
                    label: 'NVDA',
                    data: dividendNVDA,
                    backgroundColor: 'rgba(210, 180, 140, 0.5)', // Couleur pour NVDA
                    borderColor: 'rgba(210, 180, 140, 1)',
                    borderWidth: 2
                },
                {
                    label: 'V',
                    data: dividendV,
                    backgroundColor: 'rgba(255, 205, 86, 0.5)', // Couleur pour V
                    borderColor: 'rgba(255, 205, 86, 1)',
                    borderWidth: 2
                },

            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Dividendes mensuels bruts par action en €',
                    position: 'top',
                    font: {
                        size: 16
                    }
                },
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            },
        }
    });
}


function draw8(stocksPrice) {
    var ctx = document.getElementById('8Chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tickerOfShares,
            datasets: [{
                label : 'PRU',
                data: pruOfShares,
                fill:true,
                backgroundColor: [
                    'rgba(214, 0, 0, 0.5)',
                ],
                borderColor: [
                    'rgba(214, 0, 0, 1)',
                ],
                borderWidth: 2,
            },{
                label : "Prix de l'action",
                data: stocksPrice,
                fill: true,
                backgroundColor: [
                    'rgba(0, 99, 27, 0.5)',
                ],
                borderColor: [
                    'rgba(0, 99, 27, 1)',
                ],
                borderWidth: 2,
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
                    text:'Prix des actions VS PRU en $',
                    position : 'top',
                    font: {
                        size: 16
                    }
                }
            },
        }
    });
}


function draw9() {
    var ctx = document.getElementById('9Chart').getContext('2d');

    // Définition des couleurs en fonction de la valeur
    var backgroundColors = annualReturnEuro.map(value => value >= 0 ? 'rgba(0, 99, 27, 0.5)' : 'rgba(255, 99, 132, 0.5)');
    var borderColors = annualReturnEuro.map(value => value >= 0 ? 'rgba(0, 99, 27, 1)' : 'rgba(255, 99, 132, 1)');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years, // Utilisation de la liste "years" pour l'axe x
            datasets: [{
                label: 'Retour Annuel en €',
                data: annualReturnEuro,
                backgroundColor: backgroundColors, // Utilisation des couleurs définies
                borderColor: borderColors, // Utilisation des couleurs de bordure définies
                borderWidth: 2,
                yAxisID: 'euro-y-axis', // Utilisation de l'axe Y des euros
            },
            {
                label: 'Retour Annuel en %',
                data: annualReturnPercent,
                type: 'line', // Type de graphique en ligne pour les pourcentages
                fill: true, // Pas de remplissage sous la ligne
                borderColor: 'rgba(0, 10, 156, 1)', // Couleur de la ligne pour les pourcentages
                borderWidth: 2,
                yAxisID: 'percent-y-axis', // Utilisation de l'axe Y des pourcentages
                hidden:  false, // Cacher la ligne des pourcentages par défaut
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Retours Annuel en Euros et Pourcentage par an', // Modification du titre du graphique
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                'euro-y-axis': {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        beginAtZero: true
                    }
                },
                'percent-y-axis': {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        beginAtZero: true
                    },
                    grid: {
                        drawOnChartArea: false // Empêcher les lignes de la grille sur le graphique
                    }
                }
            },
        }
    });
}


function draw10(annualInvested,walletEndYear) {
    var ctx = document.getElementById('10Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label : 'Montant Investi en €',
                data: annualInvested,
                backgroundColor: [
                    'rgba(200, 200, 200, 0.5)',
                ],
                fill:true,
                borderColor: [
                    'rgba(200, 200, 200, 1)',
                ],
                borderWidth: 1,
            },{
                label : 'Valeur du Portefeuille en €',
                data: walletEndYear,
                backgroundColor: [
                    'rgba(0, 99, 27, 0.5)',
                ],
                fill:true,
                borderColor: [
                    'rgba(0, 99, 27, 1)',
                ],
                borderWidth: 2,
                fill:'-1'
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
                    text:'Montant Investi VS Valeur du Portefeuille par an',
                    position : 'top',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}


function draw11(annualDividendReceived) {
    var ctx = document.getElementById('11Chart').getContext('2d');

    // Calculer les pourcentages de variation d'une année à l'autre
    var percentageChanges = [0];
    for (var i = 1; i < annualDividendReceived.length; i++) {
        var change = ((annualDividendReceived[i] - annualDividendReceived[i - 1]) / annualDividendReceived[i - 1]) * 100;
        percentageChanges.push(parseFloat(change.toFixed(2))); // Convertir la chaîne en nombre flottant
    }

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Dividende Nets reçus en €',
                data: annualDividendReceived,
                backgroundColor: 'rgba(0, 17, 255, 0.5)',
                borderColor: 'rgba(0, 17, 255, 1)',
                borderWidth: 2,
                yAxisID:'dividend-amount'
            }, {
                label: 'Variation en %',
                data: percentageChanges,
                type: 'line',
                fill: true,
                borderColor: 'rgba(102, 2, 60, 1)', // Rouge pour la ligne de variation
                borderWidth: 2,
                yAxisID:'percent-variation',
                hidden:true
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Dividendes Nets reçus par an',
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                'dividend-amount': {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        beginAtZero: true
                    }
                },
                'percent-variation': {
                    type: 'linear',
                    display: true, // Cacher l'axe Y des pourcentages
                    position: 'right',
                    ticks: {
                        beginAtZero: true
                    },
                    grid: {
                        drawOnChartArea: false // Empêcher les lignes de la grille sur le graphique
                    }
                }
            }
        }
    });
}


function draw13(stocksCotation) {
    var ctx = document.getElementById('13Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Bases', 'Croissance', 'Rentabilité', 'Solvabilité', 'Dividende'],
            datasets: [{
                label: 'ScoreCard Mastercard',
                data: stocksCotation,
                backgroundColor: 'rgba(128, 0, 128, 0.5)',
                borderColor: 'rgba(128, 0, 128, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom'
                },
                title: {
                    display: false,
                    text: "ScoreCard de l'Action",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                },
                min: 0,
                max: 100,
                stepSize: 20
            }
        }
    });
}


function draw14(stocksCotation) {
    var ctx = document.getElementById('14Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Bases', 'Croissance', 'Rentabilité', 'Solvabilité', 'Dividende'],
            datasets: [{
                label: 'ScoreCard Microsoft',
                data: stocksCotation,
                backgroundColor: 'rgba(255, 143, 0, 0.5)',
                borderColor: 'rgba(255, 143, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom'
                },
                title: {
                    display: false,
                    text: "ScoreCard de l'Action",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                },
                min: 0,
                max: 100,
                stepSize: 20
            }
        }
    });
}


function draw15(stocksCotation) {
    var ctx = document.getElementById('15Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Bases', 'Croissance', 'Rentabilité', 'Solvabilité', 'Dividende'],
            datasets: [{
                label: 'ScoreCard Visa',
                data: stocksCotation,
                backgroundColor: 'rgba(255, 205, 86, 0.5)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom'
                },
                title: {
                    display: false,
                    text: "ScoreCard de l'Action",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                },
                min: 0,
                max: 100,
                stepSize: 20
            }
        }
    });
}


function draw16(stocksCotation) {
    var ctx = document.getElementById('16Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tickerOfShares,
            datasets: [
                {
                    label: 'Bases',
                    data: [stocksCotation[0][0], stocksCotation[1][0], stocksCotation[2][0], stocksCotation[3][0],stocksCotation[4][0], stocksCotation[5][0]],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Croissance',
                    data: [stocksCotation[0][1], stocksCotation[1][1], stocksCotation[2][1], stocksCotation[3][1],stocksCotation[4][1], stocksCotation[5][1]],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Rentabilité',
                    data: [stocksCotation[0][2], stocksCotation[1][2], stocksCotation[2][2], stocksCotation[3][2],stocksCotation[4][2], stocksCotation[5][2]],
                    backgroundColor: 'rgba(255, 205, 86, 0.5)',
                    borderColor: 'rgba(255, 205, 86, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Solvabilité',
                    data: [stocksCotation[0][3], stocksCotation[1][3], stocksCotation[2][3], stocksCotation[3][3],stocksCotation[4][3], stocksCotation[5][3]],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Dividende',
                    data: [stocksCotation[0][4], stocksCotation[1][4], stocksCotation[2][4], stocksCotation[3][4],stocksCotation[4][4], stocksCotation[5][4]],
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Qualité par segment de chaque action en %",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    // max:500
                }
            }
        }
    });
}


function draw17(stocksCotations) {
    var ctx = document.getElementById('17Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Bases', 'Croissance', 'Rentabilité', 'Solvabilité', 'Dividende'],
            datasets: [
                {
                    label: 'ASML',
                    data: stocksCotations[0],
                    backgroundColor: 'rgba(0, 128, 128, 0.5)',
                    borderColor: 'rgba(0, 128, 128, 1)',
                    tension: 0.5,
                },
                {
                    label: 'GOOGL',
                    data: stocksCotations[1],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    tension: 0.5,
                },
                {
                    label: 'MA',
                    data: stocksCotations[2],
                    backgroundColor: 'rgba(128, 0, 128, 0.5)',
                    borderColor: 'rgba(128, 0, 128, 1)',
                    tension: 0.5
                },
                {
                    label: 'MSFT',
                    data: stocksCotations[3],
                    backgroundColor: 'rgba(255, 143, 0, 0.5)',
                    borderColor: 'rgba(255, 143, 0, 1)',
                    tension: 0.5
                },
                {
                    label: 'NVDA',
                    data: stocksCotations[4],
                    backgroundColor: 'rgba(210, 180, 140, 0.5)',
                    borderColor: 'rgba(210, 180, 140, 1)',
                    tension: 0.5
                },
                {
                    label: 'V',
                    data: stocksCotations[5],
                    backgroundColor: 'rgba(255, 205, 86, 0.5)',
                    borderColor: 'rgba(255, 205, 86, 1)',
                    tension: 0.5
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Qualité des actions par segment en %",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                },
                min: 0,
                max: 120,
                stepSize: 20
            }
        }
    });
}


function draw18(totalDividendReceived,totalGainWithoutDividend){
    var ctx = document.getElementById('18Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Dividendes en €','Plus-Value en €'],
            datasets: [{
                data: [totalDividendReceived, totalGainWithoutDividend],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.5)',
                    'rgba(0, 128, 0, 0.5)'
                ],
                borderColor: [
                    'rgba(46, 204, 113, 1)',
                    'rgba(39, 174, 96, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            cutout: '60%',
            maintainAspectRatio: false,
            plugins: {
                legend : {
                    display:true,
                    position:'bottom'
                },
                title : {
                    display:true,
                    text:'Provenance des gains du Portefeuille',
                    position : 'top',
                    font: {
                        size: 12
                    }
                }
            }
        }
    });
}


function draw19(annualReturnPercent, annualMarketReturnPercent) {
    var ctx = document.getElementById('19Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years, // Utiliser la liste des années comme étiquettes de l'axe X
            datasets: [{
                label: 'Performance du Portefeuille en %',
                data: annualReturnPercent,
                backgroundColor: 'rgba(255, 160, 122, 0.5)',
                borderColor: 'rgba(255, 160, 122, 1)',
                borderWidth: 2,
            }, {
                label: 'Performance du S&P500 en %',
                data: annualMarketReturnPercent,
                backgroundColor: 'rgba(176, 196, 222, 0.5)',
                borderColor: 'rgba(176, 196, 222, 1)',
                borderWidth: 2
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Retours Annuel du Portefeuille et du S&P 500',
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    stacked: false
                }
            }
        }
    });
}


function draw20(weightedAverages) {
    var ctx = document.getElementById('20Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Bases', 'Croissance', 'Rentabilité', 'Solvabilité', 'Dividende'],
            datasets: [{
                label: 'Score Pondéré',
                data: weightedAverages,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "ScoreCard pondéré du Portefeuille",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                },
                min: 0,
                max: 100,
                stepSize: 20
            }
        }
    });
}


function draw21(stocksCotation) {
    var ctx = document.getElementById('21Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Bases', 'Croissance', 'Rentabilité', 'Solvabilité', 'Dividende'],
            datasets: [{
                label: 'ScoreCard S&P Global',
                data: stocksCotation,
                backgroundColor: 'rgba(210, 180, 140, 0.5)',
                borderColor: 'rgba(210, 180, 140, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom'
                },
                title: {
                    display: false,
                    text: "ScoreCard de l'Action",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                },
                min: 0,
                max: 100,
                stepSize: 20
            }
        }
    });
}


function draw22(StocksScore) {
    // Calcul de la moyenne des scores
    const averageScore = StocksScore.reduce((a, b) => a + b, 0) / StocksScore.length;

    // Générer un tableau constant pour afficher la ligne moyenne
    const averageData = new Array(StocksScore.length).fill(averageScore);

    var ctx = document.getElementById('22Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tickerOfShares,
            datasets: [
                {
                    label: "Score global de l'action",
                    data: StocksScore,
                    backgroundColor: 'rgba(50, 205, 50, 0.35)',
                    borderColor: 'rgba(50, 205, 50, 1)',        
                    borderWidth: 1
                },
                {
                    type: 'line', // Ajout de la ligne pour la moyenne
                    label: 'Score Moyen',
                    data: averageData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Couleur de fond pour la ligne
                    borderColor: 'rgba(255, 99, 132, 1)', // Couleur de la bordure pour la ligne
                    borderWidth: 3,
                    borderDash: [5, 5], // Trait pointillé
                    fill: false, // Pas de remplissage sous la ligne
                    spanGaps: true,
                    pointRadius: 0 // Aucun point sur la ligne
                }
            ]
        },
        options: {
            indexAxis: 'y', // Définit un graphique à barres horizontal
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Score Global de Qualité de chaque action",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 30, //valeur maximale de l'axe X
                    title: {
                        display: false,
                        text: "Score Global"
                    }
                },
                y: {
                    title: {
                        display: false,
                        text: "Ticker"
                    }
                }
            }
        }
    });
}


function draw23(dividendPerMonth, dividendPerMonthNet) {

    var ctx = document.getElementById('23Chart').getContext('2d');
    
    // Créer un graphique à barres
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months, // Axe X: les mois
            datasets: [
                {
                    label: 'Montant Brut', // Légende pour les dividendes bruts
                    data: dividendPerMonth, // Les valeurs des dividendes bruts
                    backgroundColor: 'rgba(0, 51, 204, 0.5)', // Bleu plus foncé pour le montant brut
                    borderColor: 'rgba(0, 51, 204, 1)', // Bordure du bleu plus foncé
                    borderWidth: 1
                },
                {
                    label: 'Montant Net', // Légende pour les dividendes nets
                    data: dividendPerMonthNet, // Les valeurs des dividendes nets
                    backgroundColor: 'rgba(0, 123, 255, 0.5)', // Utiliser la couleur actuelle du brut pour le net
                    borderColor: 'rgba(0, 123, 255, 1)', // Utiliser la couleur actuelle du brut pour le net
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Dividendes bruts & nets reçus par mois en €",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: false,
                        text: "Mois"
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: "Montant des Dividendes"
                    }
                }
            },
            // Espacement des barres
            // barPercentage: 0.4, // Réduit la largeur des barres
            // categoryPercentage: 0.5 // Espacement entre les barres
        }
    });
}


function draw24(stocksCotation) {
    var ctx = document.getElementById('24Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Bases', 'Croissance', 'Rentabilité', 'Solvabilité', 'Dividende'],
            datasets: [{
                label: 'ScoreCard Google',
                data: stocksCotation,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(128, 0, 128, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom'
                },
                title: {
                    display: false,
                    text: "ScoreCard de l'Action",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                },
                min: 0,
                max: 100,
                stepSize: 20
            }
        }
    });
}


function draw25(stocksCotation) {
    var ctx = document.getElementById('25Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Bases', 'Croissance', 'Rentabilité', 'Solvabilité', 'Dividende'],
            datasets: [{
                label: 'ScoreCard ASML',
                data: stocksCotation,
                backgroundColor: 'rgba(0, 128, 128, 0.5)',
                borderColor: 'rgba(0, 128, 128, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom'
                },
                title: {
                    display: false,
                    text: "ScoreCard de l'Action",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                },
                min: 0,
                max: 100,
                stepSize: 20
            }
        }
    });
}

// Fonction pour calculer le prix juste de l'action
function calculateFairPrice(safetyMargin){
    for (var i = 0; i < stocksPERatio.length; i++) {
        var medianPrice = (gurufocusPrice[i] + tipsrankPrice[i]) / 2;
        var fairPrice = medianPrice * (1 - safetyMargin);
        fairPrice = parseFloat(fairPrice.toFixed(2));
        stocksFairPrice.push(fairPrice);
    }
}

// Fonction pour calculer le score de valorisation final
function calculateValuationScore(){

    for (var i = 0; i < stocksPERatio.length; i++) {
        var currentDiffPrice = - ((stocksFairPrice[i] - stocksPrice[i])/stocksPrice[i]);
        var currentDiffPERatio = (stocksPERatio[i] - tenyearsPERatio[i]) / tenyearsPERatio[i]; 

        var finalScore = ((currentDiffPERatio * 100) + (currentDiffPrice * 100));
        finalScore = parseFloat(finalScore.toFixed(2));
        valuationScore.push(finalScore);
    }
}

function draw26(tickerOfShares, stocksPrice, stocksFairPrice,gurufocusPrice,tipsrankPrice) {
    var ctx = document.getElementById('26Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar', // Type de graphique principal
        data: {
            labels: tickerOfShares,
            datasets: [
                {
                    label: "Prix Actuel de l'action",
                    type: 'bar', // Barres pour le prix actuel
                    data: stocksPrice,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2
                },
                {
                    label: "Prix Juste de l'action",
                    type: 'bar', // Ligne pour le prix juste
                    data: stocksFairPrice,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                },
                {
                label: "Prix GuruFocus",
                    type: 'line', // Ligne pour GuruFocus
                    data: gurufocusPrice,
                    borderColor: 'rgba(75, 192, 192, 1)', // Vert-bleu
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Couleur des points
                    fill: false, // Pas de remplissage sous la ligne
                    tension: 0.2 // Douceur de la courbe
                },
                {
                    label: "Prix TipsRank",
                    type: 'line', // Ligne pour TipsRank
                    data: tipsrankPrice,
                    borderColor: 'rgba(255, 159, 64, 1)', // Orange vif
                    borderWidth:2,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)', // Couleur de remplissage sous la ligne
                    fill: false, // Pas de remplissage sous la ligne
                    tension: 0.2 // Douceur de la courbe
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true, // Affiche la légende
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Prix actuel vs prix juste des actions (avec marge de sécurité)",
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true // Commence l'axe Y à 0
                }
            }
        }
    });
}


function draw27(tickerOfShares, stocksPERatio, tenyearsPERatio) {
    var ctx = document.getElementById('27Chart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line', // Type de graphique
        data: {
            labels: tickerOfShares, // Axe X : tickers des actions
            datasets: [
                {
                    label: "PE Ratio Actuel",
                    data: stocksPERatio,
                    borderColor: 'rgba(153, 102, 255, 1)', // Violet
                    backgroundColor: 'rgba(153, 102, 255, 0.2)', // Couleur de remplissage sous la ligne
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(153, 102, 255, 1)', // Couleur des points
                    tension: 0.2,
                    fill:true
                },
                {
                    label: "PE Ratio Médian (10 ans)",
                    data: tenyearsPERatio,
                    borderColor: 'rgba(255, 205, 86, 1)', // Jaune-orangé
                    backgroundColor: 'rgba(255, 205, 86, 0.2)', // Couleur de remplissage sous la ligne
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 205, 86, 1)', // Couleur des points
                    tension: 0.2,
                    fill:true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "PE Ratio Actuel vs Médian (10 ans)",
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false // Commence l'axe Y à une valeur adaptée
                }
            }
        }
    });
}


function draw28(tickerOfShares, valuationScore) {
    var ctx = document.getElementById('28Chart').getContext('2d');

    // Fonction pour générer une couleur sombre en dégradé du vert foncé au rouge foncé
    function getColor(value, min, max) {
        const ratio = (value - min) / (max - min);
        const red = Math.round(139 + 116 * ratio); // De 139 (vert foncé) à 255 (rouge foncé)
        const green = Math.round(69 + 116 * (1 - ratio)); // De 69 (rouge foncé) à 185 (vert foncé)
        return `rgba(${red}, ${green}, 64, 0.7)`; // Couleur avec une opacité modérée (0.7)
    }

    // Trouver les valeurs minimale et maximale dans valuationScore
    const minValue = Math.min(...valuationScore);
    const maxValue = Math.max(...valuationScore);

    // Générer les couleurs pour chaque barre
    const barColors = valuationScore.map(value => getColor(value, minValue, maxValue));

    var myChart = new Chart(ctx, {
        type: 'bar', // Type de graphique
        data: {
            labels: tickerOfShares, // Axe X : tickers des actions
            datasets: [
                {
                    label: "Score de Valorisation",
                    data: valuationScore,
                    backgroundColor: barColors, // Couleurs dynamiques
                    borderColor: barColors.map(color => color.replace('0.7', '1')), // Bordures opaques
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Score de Valorisation par Action",
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function draw29(futureYears, futureDividendsReceived) {
    var ctx = document.getElementById('29Chart').getContext('2d');
    
    // Créer les couleurs pour chaque barre
    var backgroundColors = futureYears.map((year, index) => 
        index === 0 ? 'rgba(0, 51, 204, 0.5)' : 'rgba(0, 51, 204, 0.25)'
    );

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: futureYears,
            datasets: [
                {
                    label: 'Montant Brut Estimé', 
                    data: futureDividendsReceived, 
                    backgroundColor: backgroundColors, 
                    borderColor: 'rgba(0, 51, 204, 1)', 
                    borderWidth: 1
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Projection des dividendes reçus lors des 10 prochaines années",
                    position: 'top',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: false,
                        text: "Mois"
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: "Montant des Dividendes"
                    }
                }
            },
        }
    });
}

function draw30(weightOfStocks, diffPercentList) {
    var ctx = document.getElementById('30Chart').getContext('2d');

    var borderColors = [
        'rgba(0, 128, 128, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(128, 0, 128, 1)',
        'rgba(255, 143, 0, 1)',
        'rgba(210, 180, 140, 1)',
        'rgba(255, 205, 86, 1)'
    ];
    var backgroundColors = [
        'rgba(0, 128, 128, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(128, 0, 128, 0.5)',
        'rgba(255, 143, 0, 0.5)',
        'rgba(210, 180, 140, 0.5)',
        'rgba(255, 205, 86, 0.5)'
    ];

    var datasets = [];
    for (let i = 0; i < tickerOfShares.length; i++) {
        datasets.push({
            label: tickerOfShares[i],
            data: [{
                x: weightOfStocks[i] * 100, // Convertir en pourcentage
                y: diffPercentList[i]
            }],
            backgroundColor: backgroundColors[i % backgroundColors.length],
            borderColor: borderColors[i % borderColors.length],
            borderWidth: 1,
            pointRadius: 8,
            pointHoverRadius: 10
        });
    }

    var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Poids vs Retour sur Investissement',
                    position: 'top',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': Poids ' + context.parsed.x.toFixed(2) + '%, Retour ' + context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: false,
                        text: 'Poids de la position (%)'
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: false,
                        text: 'Retour sur Investissement (%)'
                    },
                    beginAtZero: false 
                }
            }
        }
    });
}

function draw31(dividendPerShares, pruOfShares, stocksPrice) {
    var ctx = document.getElementById('31Chart').getContext('2d');

    var currentYields = [];
    var yieldsOnCost = [];

    for (let i = 0; i < tickerOfShares.length; i++) {
        // Rendement actuel : Dividende / Prix Actuel
        let cYield = (dividendPerShares[i] / stocksPrice[i]) * 100;
        // Yield on Cost : Dividende / Prix de Revient (PRU)
        let yoc = (dividendPerShares[i] / pruOfShares[i]) * 100;
        
        currentYields.push(parseFloat(cYield.toFixed(2)));
        yieldsOnCost.push(parseFloat(yoc.toFixed(2)));
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tickerOfShares,
            datasets: [
                {
                    label: 'Yield Actuel (%)',
                    data: currentYields,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Yield on Cost (%)', // Ton rendement réel !
                    data: yieldsOnCost,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Rendement Actuel vs Rendement sur Coût (YoC)',
                    font: { size: 16 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: false, text: 'Rendement (%)' }
                }
            }
        }
    });
}

function draw32(diffListEuro, tickerOfShares) {
    var ctx = document.getElementById('32Chart').getContext('2d');

    // 1. On combine les tickers et les valeurs pour pouvoir les trier ensemble
    var combinedData = tickerOfShares.map((ticker, index) => {
        return {
            ticker: ticker,
            value: diffListEuro[index]
        };
    });

    // 2. On trie du plus grand gain au plus grand gain (décroissant)
    combinedData.sort((a, b) => b.value - a.value);

    // 3. On sépare à nouveau les données triées
    var sortedLabels = combinedData.map(item => item.ticker);
    var sortedValues = combinedData.map(item => item.value);

    // 4. On définit les couleurs (Vert pour positif, Rouge pour négatif)
    var backgroundColors = sortedValues.map(val => val >= 0 ? 'rgba(46, 204, 113, 0.6)' : 'rgba(231, 76, 60, 0.6)');
    var borderColors = sortedValues.map(val => val >= 0 ? 'rgba(46, 204, 113, 1)' : 'rgba(231, 76, 60, 1)');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: 'Contribution en €',
                data: sortedValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Rend le graphique horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, // Pas besoin de légende ici
                title: {
                    display: true,
                    text: 'Classement des Performances des Positions',
                    font: { size: 16 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            let sign = value > 0 ? '+' : '';
                            return context.dataset.label + ': ' + sign + value + ' €';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: { display: false, text: 'Plus ou Moins Value Latente (€)' }
                }
            }
        }
    });
}

function draw33(stocksScore, valuationScore, tickerOfShares) {
    var ctx = document.getElementById('33Chart').getContext('2d');

    // Création des données pour le scatter plot
    // x = Qualité, y = Valorisation
    const scatterData = tickerOfShares.map((ticker, i) => ({
        x: stocksScore[i],
        y: valuationScore[i],
        label: ticker
    }));

    var borderColors = [
        'rgba(0, 128, 128, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(128, 0, 128, 1)',
        'rgba(255, 143, 0, 1)',
        'rgba(210, 180, 140, 1)',
        'rgba(255, 205, 86, 1)'
    ];
    var backgroundColors = [
        'rgba(0, 128, 128, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(128, 0, 128, 0.5)',
        'rgba(255, 143, 0, 0.5)',
        'rgba(210, 180, 140, 0.5)',
        'rgba(255, 205, 86, 0.5)'
    ];

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: scatterData.map((item, i) => ({
                label: item.label,
                data: [{x: item.x, y: item.y}],
                backgroundColor: backgroundColors[i % backgroundColors.length],
                borderColor: borderColors[i % borderColors.length],
                pointRadius: 8, // Points assez gros
                pointHoverRadius: 12
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Matrice Qualité vs Valorisation',
                    font: { size: 16 }
                },
                legend: {
                    position: 'bottom'
                },
                annotation: {
                    // Note: Annotation nécessite un plugin supplémentaire, 
                    // on fait simple ici sans plugin externe
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Score de Qualité (sur 30)' },
                    min: 15, // On zoome sur la partie intéressante
                    max: 32
                },
                y: {
                    title: { display: true, text: 'Score de Valorisation' },
                    beginAtZero: false
                }
            }
        }
    });
}


function calculateSPYReturn(currentValue, startValue) {
    var returnPercent = ((currentValue - startValue) / startValue) * 100;
    return parseFloat(returnPercent.toFixed(2));
}


// Fonction d'interpolation qui ralentit sur les derniers pourcentages
function easeOutCubic(t) {
    return (--t) * t * t + 1;
}

// Fonction pour animer la barre de progression de manière fluide avec une transition ralentie
function animateProgressBar(progressBar, finalValue, goal) {
    let startTime;
    const duration = 2000; // Durée de l'animation en millisecondes

    // Récupérer la valeur actuelle de la barre de progression
    const currentValue = progressBar.value;

    // Calculer le pas de progression en fonction de la durée et de la différence entre les valeurs actuelle et finale
    const step = (finalValue - currentValue) / 100;

    function updateProgress(timestamp) {
        // Initialiser le temps de départ au premier appel de la fonction
        if (!startTime) startTime = timestamp;

        // Calculer le temps écoulé depuis le début de l'animation
        const elapsedTime = timestamp - startTime;

        // Calculer le pourcentage d'avancement en fonction du temps écoulé
        let progress = Math.min(elapsedTime / duration, 1); // Limiter le progrès à 1

        // Appliquer une fonction d'interpolation pour ralentir sur les derniers pourcentages
        progress = easeOutCubic(progress);

        // Calculer la valeur interpolée entre la valeur actuelle et la valeur finale
        const interpolatedValue = currentValue + (finalValue - currentValue) * progress;

        // Mettre à jour la valeur de la barre de progression
        progressBar.value = interpolatedValue;

        // Vérifier si l'animation doit continuer
        if (elapsedTime < duration) {
            // Continuer l'animation en appelant la fonction de mise à jour à la prochaine trame d'animation
            requestAnimationFrame(updateProgress);
        }
    }

    // Démarrer l'animation en appelant la fonction de mise à jour pour la première fois
    requestAnimationFrame(updateProgress);
}


// Fonction pour remplir la première barre de progression
function fillFirstProgressBar(totalWallet, goal) {
    const firstProgressBar = document.getElementById('firstProgressBar');
    const progressText = document.getElementById('firstProgressText');
    firstProgressBar.max = goal;
    const percentage = ((totalWallet / goal) * 100).toFixed(2);
    progressText.textContent = percentage + "%";
    animateProgressBar(firstProgressBar, totalWallet, goal);
}

// Fonction pour remplir la deuxième barre de progression
function fillSecondProgressBar(current, goal) {
    const secondProgressBar = document.getElementById('secondProgressBar');
    const progressText = document.getElementById('secondProgressText');
    secondProgressBar.max = goal;
    const percentage = ((current / goal) * 100).toFixed(2);

    progressText.textContent = percentage + "%";
    animateProgressBar(secondProgressBar, current, goal);
}


// Appel de la fonction pour récupérer les prix de toutes les actions
async function main() {

    await getAllStockPrices();
    const exchangeRate = await getExchangeRate();
    await getAllPERatios();

    const currentPrice = await getCurrentSPYPrice("SPY");
    //console.log("Current SPY price:", currentPrice);
    const startPrice = await getStartSPYPrice();
    //console.log("Start SPY price:", startPrice);
    const spyReturn = calculateSPYReturn(currentPrice, startPrice);
    //console.log("SPY return:", spyReturn);

    finalValue = totalValue * exchangeRate;
    document.getElementById("wallet-value").textContent = finalValue.toFixed(2);

    totalWallet = finalValue + CashOnHand;
    document.getElementById("total-value").textContent = totalWallet.toFixed(2);

    diffEuro = totalWallet - totalInvested;
    document.getElementById("return-euro").textContent = diffEuro.toFixed(2);

    diffPercent = (diffEuro / totalInvested) * 100;
    document.getElementById("return-percent").textContent = diffPercent.toFixed(2) + "%";

    diffPerformance = calculatePerformanceForAllStocks(stocksPrice, pruOfShares, numberOfShares);

    const diffListEuro = diffPerformance.diffList.map(diff => Number((diff * exchangeRate).toFixed(2)));

    calculateTotalDividendPerShare(exchangeRate);
    calculateYieldOfShares();

    calculateDividendPerMonth(); //calcul des dividendes bruts par mois
    calculateNetDividendPerMonth(); //calcul des dividendes nets par mois

    document.getElementById("total-div").textContent = totalDividend.toFixed(2);

    yieldOfWallet = Number((totalDividend/totalWallet)*100);

    document.getElementById("yield-wallet").textContent = yieldOfWallet.toFixed(2) + "%";

    averageValuePerStocks = finalValue / tickerOfShares.length;

    calculateStackedDividendPerMonth();

    calculateFairPrice(0.10);
    calculateValuationScore();


    // PERF ANNÉE EN COURS
    var tempStartYear = 22579.97;
    var tempInvested = 0;
    tempReturnEuro = parseFloat((totalWallet - (tempInvested + tempStartYear)).toFixed(2));
    tempReturnPercent = parseFloat(((tempReturnEuro / (tempInvested + tempStartYear)) * 100).toFixed(2));
    var tempDividendReceived = 0;

    annualReturnEuro.push(tempReturnEuro);
    annualReturnPercent.push(tempReturnPercent);
    annualDividendReceived.push(tempDividendReceived);
    annualInvested.push(totalInvested);
    walletEndYear.push(parseFloat(totalWallet.toFixed(2)));
    //console.log("before :" + annualMarketReturnPercent);
    annualMarketReturnPercent.push(spyReturn);
    //console.log("after :" + annualMarketReturnPercent);


    var totalDividendReceived = ((annualDividendReceived.reduce((acc, val) => acc + val, 0))).toFixed(2); //somme de la liste annualDividendReceived
    totalGainWithoutDividend = (diffEuro - totalDividendReceived).toFixed(2); //le gain total en plus-value = gain total - dividendes nets reçus


    //CHANGER COULEURS
    changeBackgroundColor(diffEuro, diffPercent);


    //REMPLIR TABLEAUX
    fillStockPrices();
    fillAveragePrices();
    fillNumberOfShares();
    fillValueOfStocks(stocksPrice, exchangeRate);
    fillReturnInEuros(diffListEuro);
    fillReturnInPercent(diffPercentList);


    //OBTENIR POIDS DE CHAQUE ACTIONS
    calculateWeightOfStocks(finalValueOfStocks,finalValue);
    calculateWeightedAverage(stocksCotation);

    calculateFutureYears();
    calculateFutureDividends();


    //REMPLIR BARRES DE PROGRESSION
    fillFirstProgressBar(totalWallet, 25000);
    fillSecondProgressBar(tempDividendReceived, 90);


    //DESSINER GRAPHES
    draw1(CashOnHand, finalValue);
    draw2(totalInvested, diffEuro);
    draw3(finalValueOfStocks);
    draw4(diffListEuro);
    draw5(totalDividendPerShares);
    draw6(yieldOfShares);
    draw7(dividendData);
    draw8(stocksPrice,pruOfShares);
    draw9();
    draw10(annualInvested, walletEndYear);
    draw11(annualDividendReceived);
    draw13(MACotation);
    draw14(MSFTCotation);
    draw15(VCotation);
    draw16(stocksCotation);
    draw17(stocksCotation);
    draw18(totalDividendReceived,totalGainWithoutDividend);
    draw19(annualReturnPercent,annualMarketReturnPercent);
    draw20(weightedAverages);
    draw21(NVDACotation);
    draw22(stocksScore);
    draw23(dividendPerMonth,dividendPerMonthNet);
    draw24(GOOGLCotation);
    draw25(ASMLCotation);
    draw26(tickerOfShares, stocksPrice,stocksFairPrice,gurufocusPrice,tipsrankPrice);
    draw27(tickerOfShares,stocksPERatio,tenyearsPERatio);
    draw28(tickerOfShares,valuationScore);
    draw29(futureYears,futureDividendsReceived);
    draw30(weightOfStocks, diffPercentList);
    draw31(dividendPerShares, pruOfShares, stocksPrice);
    draw32(diffListEuro, tickerOfShares);
    draw33(stocksScore, valuationScore, tickerOfShares);

}

main();