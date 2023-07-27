const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//Show loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote

function newQuote() {
    loading();
    let quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length) ];
    
    //To check if author feild is blank and replace it with unknown

    if (!quote.a) {
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = quote.a;
    }
    
    //Check quote length to determine styling
    if (quote.q.length > 50) {
        quoteText.classList.add('long-quote')
        
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.innerText = quote.q;
    complete();
}
// Get Quotes from API  https://jacintodesign.github.io/quotes-api/data/quotes.json
  
async function getQuotes() {
    loading();
    const proxyURL ='https://radiant-tor-36135-a0f3cf33ab53.herokuapp.com/'
    const apiURL = 'https://zenquotes.io/api/quotes';
    
    try {
    const response = await fetch(proxyURL + apiURL); // this const will not be populated until we have some data from the apiURL
     apiQuotes = await response.json(); 
     console.log(apiQuotes);
     
     newQuote();

// So what that means is we are getting the JSON from our API as a response and then we're turning that
// response into a JSON object because from a Web server, it's actually just a series of strings, as
// we saw in the other one. And then we're going to pass that into a global variable called API quotes.
    } catch(error) {
        // Catch Error Here
        console.log(error);
    }

}

//Tweet Quote

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listeners 

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load

getQuotes();




