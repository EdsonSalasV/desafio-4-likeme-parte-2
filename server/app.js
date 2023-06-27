const express = require ('express');
const cors = require('cors')
const routes = require("./routes")


const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())
app.use('/', routes)




app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`)
})

