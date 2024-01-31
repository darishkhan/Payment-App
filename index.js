const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/v1', require('./routes/index.js'));  


app.listen(3000, ()=>{
    try {
        console.log("app listening on 3000.");
    } catch (error) {
        console.log("error listening on 3000.");                
    }
});