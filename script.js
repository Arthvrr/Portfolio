var API_KEY = "23IM7CT0D0LKLV1B";

var totalInvested = 5600; //montant total investi

var totalInvestedCell = document.getElementById("invested");
totalInvestedCell.textContent = totalInvested;

var CashOnHand = 222.09; //cash disponible
var cashCell = document.getElementById("cash");
cashCell.textContent = CashOnHand.toFixed(2);

var tickerOfShares = ["AAPL","MA","MSFT","V"] //tickers
var numberOfShares = [9,4,5,5] //nombres d'actions

var pruOfShares = [176.6352, 411.6737,321.36,229.595]


// Fonction pour récupérer le prix d'une action à partir de l'API d'Alpha Vantage
async function getStockPrice(ticker) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data["Global Quote"]) {
            return data["Global Quote"]["05. price"];
        } else {
            throw new Error("Données de prix manquantes dans la réponse de l'API");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du prix de l'action", error);
        return null;
    }
}

// Fonction pour mettre à jour les prix des actions
async function updateStockPrices() {
    for (let i = 0; i < tickerOfShares.length; i++) {
        const price = await getStockPrice(tickerOfShares[i]);
        if (price !== null) {
            console.log(`Le prix de l'action ${tickerOfShares[i]} est de ${price}`);
            // Mettre à jour les prix des actions dans votre interface utilisateur ici
        } else {
            console.log(`Impossible de récupérer le prix de l'action ${tickerOfShares[i]}`);
        }
    }
}

// Appel à la fonction pour mettre à jour les prix des actions
updateStockPrices();
