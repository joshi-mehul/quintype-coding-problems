const express = require('express');
const app = express();

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

/*app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render("home/index")
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});*/

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});