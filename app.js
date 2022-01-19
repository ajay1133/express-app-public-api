"use strict";
const
    express = require('express'),
    app = express(),
    axios = require('axios'),
    port = 8997;
app.listen(port, () => console.info(`
  **********************
  Server Started:
		Port: ${port}
  **********************
`));
app.on('error', onError);
app.on('listening', () => console.log('Listening'));
function onError(error) {
    console.log('Error = ', error);
}
app.get('/api/v1/countries/all', async (request, response) => {
    try {
        let result = await axios.get('https://api.thecatapi.com/v1/images/search');
        if (!(result && Array.isArray(result.data))) {
            throw Error('Invalid response = ', result);
        }
        const output = result.data;
        response.set({ 'Content-Type': 'application/json' });
        response.send(output);
    } catch (e) {
        console.log(e);
    }
});