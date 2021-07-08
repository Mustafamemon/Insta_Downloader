const express = require("express");
const cors = require("cors");
const download = require('./routes/download')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/download',download)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



