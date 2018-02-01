const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression
const PolynomialRegression = ml.PolynomialRegression; //Polynomial regression
const degree = 3;

const csvFilePath = 'Advertising.csv'; // Data
let csvData = [], // parsed Data
    X = [], // Input
    y = []; // Output

let regressionModel;

const readline = require('readline'); // For user prompt to allow predictions

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});


csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        csvData.push(jsonObj);
    })
    .on('done', () => {
        dressData(); // To get data points from JSON Objects
        performRegression(); 
    });

function dressData() {
    /**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * Hence, while adding the data points,
     * we need to parse the String value as a Float.
     */
    csvData.forEach((row) => {
        X.push(parseFloat(row.TV));
        y.push(parseFloat(row.Sales));
    });
}

// function f(s) {
//     return parseFloat(s);
// }

function performRegression() {
    // regressionModel = new SLR(X, y); // Train the model on training data
    // console.log('simple linear regression',regressionModel.toString(3));
    regressionModel = new PolynomialRegression(X, y, degree);
    console.log(regressionModel.toString(3));
    predictOutput();
}

function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer1) => {
        console.log(`At X = ${answer1}, y =  ${regressionModel.predict(parseFloat(answer1))}`);
        predictOutput();
       
    });
}

