const express = require('express');
const fileUpload = require('express-fileupload');
const mexp = require('math-expression-evaluator');
const mongoose = require('mongoose');
let ObjectId = require('mongoose').Types.ObjectId;
const mathResult = require('./models/mathResult');
const dbUrl = "mongodb://localhost:27017/xspeedcalc";

const app = express();

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

// Data retrieval endpoint
app.get('/results', async (req, res) => {
    await mathResult.find({}).sort( { index: 1 } )
    .then(foundMathResult => res.json(foundMathResult));
})

// Solution endpoint
app.post('/solve-problem', (req, res) => {
    const { problem } = req.body;
    if(problem === null || problem === '')
    {
        return res.status(400).json({ msg: 'No math problem uploaded'});
    }
    const solution = mexp.eval(problem);

    let minWaitTime = 15000;
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < minWaitTime);
    
    res.json({ solution });
});

// Upload endpoint
app.post('/upload', async (req, res) => {
    if(req.files === null)
    {
        return res.status(400).json({ msg: 'No file uploaded'});
    }
    
    const file = req.files.file;
    const { calculationTitle, solution, inputContent } = req.body;
    let index = 0;
    let highestIndex = await mathResult.find({})
        .sort({
            index: -1
        })
        .limit(1);
    if(highestIndex.length > 0){
        index = highestIndex[0].index + 1;
    }

    const newMathResult = new mathResult({
        title: calculationTitle,
        solution,
        inputContent: inputContent,
        filePath: `/uploads/${file.name}`,
        index: index,
    });
    const savedMathResult = await newMathResult.save();


    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }       
        
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
    })
});

app.post('/update-indices', (req, res) => {
    let queryParameters = req.body;
    console.log(queryParameters);

    queryParameters.forEach( async (element) => {
        let filter = {"_id": new ObjectId(element.filter) };
        await mathResult.findOneAndUpdate(filter, element.update);
    });
});

app.listen(5000, () => console.log('Server started at port 5000...'));