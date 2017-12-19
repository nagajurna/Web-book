const express = require('express');
const app = express();

let oneWeek = 604800000;
app.use(express.static('public', { maxAge: oneWeek }));

let port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
  console.log('drawing listening on port ' + port);
});
