const express = require('express')
const router = express.Router()

const {getPosts, addPost, likePost, deletePost} = require('./consultas')



router.get('/', (req, res) => {
    res.send('server')
})

router.get("/posts", async(req,res)=>{
    try {
        const result = await getPosts()
        res.json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/posts", async(req,res) => {
   try {
    const consulta = req.body
    const result = await addPost(consulta)
    res.send(result)
   } catch (error) {
    console.log(error)
   }
})


router.put("/posts/like/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const result = await likePost(id);
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

router.delete ("/posts/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const result = await deletePost (id)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;