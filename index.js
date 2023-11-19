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


// Start the server
const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
