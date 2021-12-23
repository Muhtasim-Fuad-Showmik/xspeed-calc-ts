const express = require('express');
const fileUpload = require('express-fileupload');
const mexp = require('math-expression-evaluator');
const mongoose = require('mongoose');
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
// app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

// Solution endpoint
app.post('/solve-problem', (req, res) => {
    // if(req.body.mathProblem === null)
    // {
    //     return res.status(400).json({ msg: 'No math problem uploaded'});
    // }
    // const { mathProblem } = req.body;
    console.log("Request Body:");
    // console.log(req.body);
    const mathProblem = "8+12";
    const solution = mexp.eval(mathProblem);
    res.json({ solution });
});

// Upload endpoint
app.post('/upload', (req, res) => {
    if(req.files === null)
    {
        return res.status(400).json({ msg: 'No file uploaded'});
    }
    
    const file = req.files.file;
    const { calculationTitle } = req.body;
    
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
    })
});

app.listen(5000, () => console.log('Server started at port 5000...'));