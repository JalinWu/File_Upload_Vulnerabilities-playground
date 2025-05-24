const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded received from web forms
app.use(bodyParser.urlencoded({extended: true}));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/upload', require('./routes/upload.js'));
 
var PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});