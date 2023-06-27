const express = require ('express');
const {getPosts, addPost, likePost, deletePost} = require('./consultas')
const cors = require('cors')


const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('server')
})


app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`)
})

app.get("/posts", async(req,res)=>{
    try {
        const result = await getPosts()
        res.json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/posts", async(req,res) => {
   try {
    const consulta = req.body
    const result = await addPost(consulta)
    res.send(result)
   } catch (error) {
    console.log(error)
   }
})


app.put("/posts/like/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const result = await likePost(id);
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

app.delete ("/posts/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const result = await deletePost (id)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})