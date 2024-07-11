import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  function handleAmountChange(e) {
    // const value = parseFloat(e.target.value);
    const value = e.target.value;
    setAmount(isNaN(value) ? 0 : value);
  }

  function handleFromCurrencyChange(e) {
    setFromCurrency(e.target.value);
  }

  function handleToCurrencyChange(e) {
    setToCurrency(e.target.value);
  }

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://v6.exchangerate-api.com/v6/dcc174f997bb7b34617b80be/latest/${fromCurrency}`;
        const res = await axios.get(url)
        console.log(res);
        setExchangeRate(res.data.conversion_rates[toCurrency]);
      } catch(error) {
        console.error("Error fetching exchange rate: ", error);
      }
    }
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if(exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data"></div>
          <h1>Currency Converter</h1>

          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input type="number" name="" id="amt" value={amount} onChange={handleAmountChange}></input>
          </div>

          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency:</label>
            <select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="toCurrency">To Currency:</label>
            <select id="toCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          <div className="result">
            <p>{amount} {fromCurrency} &nbsp; = &nbsp; {convertedAmount} {toCurrency}</p>
          </div>
      </div>
    </>
  )
}