let {covidGus} = require('./index');


const PORT = process.env.PORT || 3001;
covidGus.listen(PORT);

// eslint-disable-next-line no-console
console.log('server started on port:', PORT);
