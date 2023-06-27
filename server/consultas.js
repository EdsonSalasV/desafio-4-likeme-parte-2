const {pool} = require('./conexion')

const getPosts = async() =>{
    const results = await pool.query('SELECT * FROM posts')
    console.log(results.rows)
    return results.rows
}

/* const addPost = async (titulo, img, descripcion, likes) => {
        const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, 0)"
        const values = [titulo, img, descripcion, likes]
        const result = await pool.query(consulta,values);
        console.log('post agregado')
        return result    
} */

const addPost = async (post) => {
    const values = Object.values(post);
    const consulta = {
      text: "INSERT INTO posts (id, titulo, img, descripcion, likes ) values (DEFAULT, $1, $2, $3, 0)",
      values,
    };
    const result = await pool.query(consulta);
    console.log(result);
    return result.rows[0];
  };

//likePost
const likePost = async (id) => {
    try {
        const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
        const values = [id];
        const {rows} = await pool.query(consulta, values);
        return rows;
    } catch (error) {
        console.log(error);
    }   
}

const deletePost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id] 
    const result = await pool.query(consulta, values)
    return result.rows
}

module.exports = {
    getPosts,
    addPost,
    likePost,
    deletePost
}