const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const updateExchangeRate = async () => {
  const amtVal = Math.max(1, parseFloat(amountInput.value) || 1);
  amountInput.value = amtVal;

  const url = `${BASE_URL}${fromCurr.value.toUpperCase()}`;
  console.log("Fetching data from:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const rate = data.rates[toCurr.value.toUpperCase()];
    if (rate === undefined) {
      throw new Error("Invalid currency code or data not available.");
    }
    const finalAmount = amtVal * rate;
    msg.textContent = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error("Fetch error:", error);
    msg.textContent = "Error fetching exchange rate.";
  }
};
