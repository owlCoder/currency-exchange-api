const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const url = 'https://www.nbs.rs/kursnaListaModul/srednjiKurs.faces?lang=cir&style=layout.css';

// Fetch all available currencies from NBS
app.get('/api/v1/currencies', async (req, res) => {
  try {
    // Fetch HTML content from the web page
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML content using Cheerio
    const $ = cheerio.load(html);

    // Extract the values from the first column of the table
    const currencies = [];

    // Add RSD currency
    currencies.push({"code": "RSD"});

    
    $('#index\\:srednjiKursLista tr').each((index, element) => {
      const row = $(element).find('td:first-child'); // Select the first column

      // Extract text from the first column and push it to the currencies array
      const currency = row.text().trim();
      if (currency) {
        currencies.push({"code": currency});
      }
    });

    // Create a JSON object containing the extracted currencies
    const currenciesJSON = { currencies };

    res.json(currenciesJSON);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Get currencies [CURRENCY, number, course]
app.get('/api/v1/currencies/today', async (req, res) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const currencies = [];

    // Add RSD currency with initial empty values for 'number' and 'course'
    currencies.push({ code: 'RSD', number: '1', course: '1,000' });

    $('#index\\:srednjiKursLista tr').each((index, element) => {
      const columns = $(element).find('td'); // Select all columns in each row

      // Extract text from columns
      const currency = columns.eq(0).text().trim();
      const number = columns.eq(columns.length - 2).text().trim(); // Extract text from second last column
      const course = columns.eq(columns.length - 1).text().trim(); // Extract text from last column

      if (currency) {
        currencies.push({ code: currency, number, course });
      }
    });

    const currenciesJSON = { currencies };
    res.json(currenciesJSON);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// get crypto currency course
app.get('/api/v2/currencies/today', async (req, res) => {
  try {
    const data = JSON.parse(`{"success": true, "timestamp": 1705513503, "base": "EUR", "date": "2024-01-17", "rates": {"AED": 3.989366, "AFN": 78.747348, "ALL": 103.687892, "AMD": 439.313169, "ANG": 1.95754, "AOA": 902.094505, "ARS": 889.23143, "AUD": 1.662244, "AWG": 1.955172, "AZN": 1.793638, "BAM": 1.952729, "BBD": 2.193011, "BDT": 119.199252, "BGN": 1.956503, "BHD": 0.409421, "BIF": 3106.551456, "BMD": 1.086207, "BND": 1.459757, "BOB": 7.505266, "BRL": 5.359995, "BSD": 1.086172, "BTC": 2.5649064e-05, "BTN": 90.425627, "BWP": 14.848649, "BYN": 3.554496, "BYR": 21289.653337, "BZD": 2.189337, "CAD": 1.469692, "CDF": 2900.172574, "CHF": 0.940959, "CLF": 0.036305, "CLP": 1001.211084, "CNY": 7.745524, "COP": 4301.715664, "CRC": 561.028043, "CUC": 1.086207, "CUP": 28.78448, "CVE": 110.657298, "CZK": 24.72565, "DJF": 193.040711, "DKK": 7.457464, "DOP": 63.71098, "DZD": 146.508649, "EGP": 33.561289, "ERN": 16.293102, "ETB": 60.934434, "EUR": 1, "FJD": 2.437117, "FKP": 0.858375, "GBP": 0.857001, "GEL": 2.904245, "GGP": 0.858375, "GHS": 13.034621, "GIP": 0.858375, "GMD": 73.074518, "GNF": 9334.063211, "GTQ": 8.488729, "GYD": 227.42444, "HKD": 8.495919, "HNL": 26.782881, "HRK": 7.473451, "HTG": 142.830778, "HUF": 380.411034, "IDR": 16981.051122, "ILS": 4.123529, "IMP": 0.858375, "INR": 90.337594, "IQD": 1422.816595, "IRR": 45661.422348, "ISK": 149.494403, "JEP": 0.858375, "JMD": 168.398273, "JOD": 0.770555, "JPY": 161.034472, "KES": 174.87954, "KGS": 96.991208, "KHR": 4435.962631, "KMF": 488.356689, "KPW": 977.585381, "KRW": 1463.391854, "KWD": 0.334445, "KYD": 0.905176, "KZT": 492.42653, "LAK": 22449.901382, "LBP": 16325.276741, "LKR": 348.662055, "LRD": 205.347724, "LSL": 20.279691, "LTL": 3.207286, "LVL": 0.657036, "LYD": 5.241757, "MAD": 10.849038, "MDL": 19.208968, "MGA": 4958.248177, "MKD": 61.546258, "MMK": 2280.912977, "MNT": 3711.332002, "MOP": 8.753914, "MRU": 43.028194, "MUR": 48.173178, "MVR": 16.715336, "MWK": 1828.441379, "MXN": 18.788456, "MYR": 5.124176, "MZN": 68.702526, "NAD": 20.279752, "NGN": 989.263123, "NIO": 39.776348, "NOK": 11.440001, "NPR": 144.680803, "NZD": 1.781031, "OMR": 0.418145, "PAB": 1.086182, "PEN": 4.045213, "PGK": 4.06165, "PHP": 60.881679, "PKR": 304.129518, "PLN": 4.395911, "PYG": 7906.711284, "QAR": 3.954608, "RON": 4.976237, "RSD": 117.234273, "RUB": 95.543302, "RWF": 1376.135853, "SAR": 4.073557, "SBD": 9.151793, "SCR": 14.480757, "SDG": 652.809932, "SEK": 11.372949, "SGD": 1.461964, "SHP": 1.384751, "SLE": 24.708382, "SLL": 21452.584172, "SOS": 620.224659, "SRD": 39.922992, "STD": 22482.287777, "SYP": 14122.61254, "SZL": 20.672918, "THB": 38.691164, "TJS": 11.844618, "TMT": 3.801724, "TND": 3.360182, "TOP": 2.566218, "TRY": 32.724804, "TTD": 7.366483, "TWD": 34.336412, "TZS": 2742.672006, "UAH": 41.132293, "UGX": 4144.501327, "USD": 1.086207, "UYU": 42.532329, "UZS": 13408.666293, "VEF": 3902678.461379, "VES": 39.017644, "VND": 26655.514943, "VUV": 129.364775, "WST": 2.955156, "XAF": 654.905975, "XAG": 0.048183, "XAU": 0.000541, "XCD": 2.935528, "XDR": 0.812895, "XOF": 654.927045, "XPF": 119.331742, "YER": 271.959019, "ZAR": 20.747744, "ZMK": 9777.167182, "ZMW": 28.539381, "ZWL": 349.758147}}`);

    const currentDate = new Date();
    const timestamp = Math.floor(currentDate.getTime() / 1000); // Convert milliseconds to seconds

    // Return the response in the specified JSON format
    res.json({
      success: true,
      timestamp: timestamp,
      base: data.base,
      date: currentDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      rates: data.rates,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Function to adjust rates by a percentage
function adjustRates(rates, percentage) {
  const adjustedRates = {};
  Object.keys(rates).forEach((currency) => {
    adjustedRates[currency] = rates[currency] * (1 - (percentage / 100));
  });
  return adjustedRates;
}

app.get('/api/v2/currencies/yesterday', async (req, res) => {
  try {
    // Simulating fetching data from an external API
    const data = JSON.parse(`{"success": true, "timestamp": 1705513503, "base": "EUR", "date": "2024-01-17", "rates": {"AED": 3.989366, "AFN": 78.747348, "ALL": 103.687892, "AMD": 439.313169, "ANG": 1.95754, "AOA": 902.094505, "ARS": 889.23143, "AUD": 1.662244, "AWG": 1.955172, "AZN": 1.793638, "BAM": 1.952729, "BBD": 2.193011, "BDT": 119.199252, "BGN": 1.956503, "BHD": 0.409421, "BIF": 3106.551456, "BMD": 1.086207, "BND": 1.459757, "BOB": 7.505266, "BRL": 5.359995, "BSD": 1.086172, "BTC": 2.5649064e-05, "BTN": 90.425627, "BWP": 14.848649, "BYN": 3.554496, "BYR": 21289.653337, "BZD": 2.189337, "CAD": 1.469692, "CDF": 2900.172574, "CHF": 0.940959, "CLF": 0.036305, "CLP": 1001.211084, "CNY": 7.745524, "COP": 4301.715664, "CRC": 561.028043, "CUC": 1.086207, "CUP": 28.78448, "CVE": 110.657298, "CZK": 24.72565, "DJF": 193.040711, "DKK": 7.457464, "DOP": 63.71098, "DZD": 146.508649, "EGP": 33.561289, "ERN": 16.293102, "ETB": 60.934434, "EUR": 1, "FJD": 2.437117, "FKP": 0.858375, "GBP": 0.857001, "GEL": 2.904245, "GGP": 0.858375, "GHS": 13.034621, "GIP": 0.858375, "GMD": 73.074518, "GNF": 9334.063211, "GTQ": 8.488729, "GYD": 227.42444, "HKD": 8.495919, "HNL": 26.782881, "HRK": 7.473451, "HTG": 142.830778, "HUF": 380.411034, "IDR": 16981.051122, "ILS": 4.123529, "IMP": 0.858375, "INR": 90.337594, "IQD": 1422.816595, "IRR": 45661.422348, "ISK": 149.494403, "JEP": 0.858375, "JMD": 168.398273, "JOD": 0.770555, "JPY": 161.034472, "KES": 174.87954, "KGS": 96.991208, "KHR": 4435.962631, "KMF": 488.356689, "KPW": 977.585381, "KRW": 1463.391854, "KWD": 0.334445, "KYD": 0.905176, "KZT": 492.42653, "LAK": 22449.901382, "LBP": 16325.276741, "LKR": 348.662055, "LRD": 205.347724, "LSL": 20.279691, "LTL": 3.207286, "LVL": 0.657036, "LYD": 5.241757, "MAD": 10.849038, "MDL": 19.208968, "MGA": 4958.248177, "MKD": 61.546258, "MMK": 2280.912977, "MNT": 3711.332002, "MOP": 8.753914, "MRU": 43.028194, "MUR": 48.173178, "MVR": 16.715336, "MWK": 1828.441379, "MXN": 18.788456, "MYR": 5.124176, "MZN": 68.702526, "NAD": 20.279752, "NGN": 989.263123, "NIO": 39.776348, "NOK": 11.440001, "NPR": 144.680803, "NZD": 1.781031, "OMR": 0.418145, "PAB": 1.086182, "PEN": 4.045213, "PGK": 4.06165, "PHP": 60.881679, "PKR": 304.129518, "PLN": 4.395911, "PYG": 7906.711284, "QAR": 3.954608, "RON": 4.976237, "RSD": 117.234273, "RUB": 95.543302, "RWF": 1376.135853, "SAR": 4.073557, "SBD": 9.151793, "SCR": 14.480757, "SDG": 652.809932, "SEK": 11.372949, "SGD": 1.461964, "SHP": 1.384751, "SLE": 24.708382, "SLL": 21452.584172, "SOS": 620.224659, "SRD": 39.922992, "STD": 22482.287777, "SYP": 14122.61254, "SZL": 20.672918, "THB": 38.691164, "TJS": 11.844618, "TMT": 3.801724, "TND": 3.360182, "TOP": 2.566218, "TRY": 32.724804, "TTD": 7.366483, "TWD": 34.336412, "TZS": 2742.672006, "UAH": 41.132293, "UGX": 4144.501327, "USD": 1.086207, "UYU": 42.532329, "UZS": 13408.666293, "VEF": 3902678.461379, "VES": 39.017644, "VND": 26655.514943, "VUV": 129.364775, "WST": 2.955156, "XAF": 654.905975, "XAG": 0.048183, "XAU": 0.000541, "XCD": 2.935528, "XDR": 0.812895, "XOF": 654.927045, "XPF": 119.331742, "YER": 271.959019, "ZAR": 20.747744, "ZMK": 9777.167182, "ZMW": 28.539381, "ZWL": 349.758147}}`);

    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1); // Get yesterday's date

    const timestamp = Math.floor(yesterdayDate.getTime() / 1000); // Convert milliseconds to seconds

    // Adjust rates by decreasing by 0.5% for demonstration purposes
    const adjustedRates = adjustRates(data.rates, 0.5);

    // Return the response in the specified JSON format
    res.json({
      success: true,
      timestamp: timestamp,
      base: data.base,
      date: yesterdayDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      rates: adjustedRates,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
