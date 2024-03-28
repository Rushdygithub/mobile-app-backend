const express = require('express');
const app = express();
const router = express.Router();
const {connection} = require('../server');
const {createPost,updatePost} = require('../controllers/postController');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/post', router);

//Test
router.get('/test', (req,res)=> {
    // res.send('Done');
    var array1 = req.body.likes;
    var array2 = req.body.dislikes;
   
    var array1= [10, 6, 19, 16, 14, 15, 2, 9, 5, 3, 4, 13, 8, 7, 1, 12, 18, 11, 20, 17];
    var array2= [12, 18, 20, 11, 19, 14, 6, 7, 8, 16, 9, 3, 1, 13, 5, 4, 15, 10, 2, 17];

    if(array1.sort().join(',') === array2.sort().join(',')){
        res.send('same members');
    }
    else res.send('not a match');
});

//Create new post
router.post('/create', async (req,res)=> {
    await createPost(req,res);
});

//Update post
router.post('/update/:id', async (req,res)=> {
    const id = req.params.id;
    await updatePost(req,res,id);
});

const server = () => {
    app.listen(5000, (error)=> {
        if (error) { console.log(error.message) }
        console.log(`Server is runing on 5000`);
    });
}

server();
connection();

