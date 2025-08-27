const country_list = {
  "USD": "US",
  "NPR": "NP",
  "INR": "IN",
  "EUR": "EU",
  "GBP": "GB",
  "JPY": "JP",
  "AUD": "AU",
  "CAD": "CA"
};

const dropList = document.querySelectorAll(".drop-list select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {

    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected == currency_code == "NPR" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", e => {
    loadFlag(e.target); // calling loadflag with passing targete element as argument 
  });
}
function loadFlag(element) {
  for (code in country_list) {
    if (code == element.value) { // if currency code of country list is equal to option value 
      let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
      //pasing country code od selected corrency code in a img url
      imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;

    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});



getButton.addEventListener("click", e => {
  e.preventDefault(); //preventing form from submitting
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;// temporary code of FROM droplist
  fromCurrency.value = toCurrency.value;// passing TO currency code to TO currency code
  toCurrency.value = tempCode;// passing temporary currncy code to TO currency code
  loadFlag(fromCurrency);// calling loadflag with passing select element (fromcurrency)of TO  
  loadFlag(toCurrency);//calling loadflag with passing select element (tocurrency)of FROM
  getExchangeRate();
});

function getExchangeRate(){
  const amount = document.querySelector(".amount input");
  let amountVal = amount.value;

  if (amountVal === "" || amountVal === "0") {
    amountVal = 1;
    amount.value = "1";
  }

  const fromCurrency = dropList[0].value;
  const toCurrency = dropList[1].value;

  const exchangeRateTxt = document.querySelector(".exchange-rate"); // ✅ get div

  // API URL (replace with your real API key)
  let url = ` https://v6.exchangerate-api.com/v6/77d4118b08e5d283ce4bde92/latest/${fromCurrency}`;


  fetch(url)
    .then(response => response.json())
    .then(result => {
      let exchangeRate = result.conversion_rates[toCurrency];
      let total = (amountVal * exchangeRate).toFixed(2);

      // ✅ update result box instead of null
      exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency} = ${total} ${toCurrency}`;
    })
    .catch(() => {
      exchangeRateTxt.innerHTML = "Something went wrong...";
    });
}
