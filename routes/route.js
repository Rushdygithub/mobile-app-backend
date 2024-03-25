require('dotenv').config();
const {connection} = require('../server.js');
const express =  require('express');
const app = express();
const router = express.Router();
const {userRegister,userLogin,userUpdate} = require('../controllers/userController.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Base route
app.use('/api', router);

app.use(express.json());

//Test
router.get('/test', (req,res)=> {
    res.send('Check')
});

//New user registration
router.post('/user/register', async (req,res)=> {
    await userRegister(req,res)
});

//New user registration
router.post('/user/login', async (req,res)=> {
    await userLogin(req,res)
});

//Update user
router.post('/update/user/:id', async (req,res)=> {
    const id = req.params.id;
    await userUpdate(req,res,id);
});

const server = () => {
    app.listen(5000, (error)=> {

        if (error) { console.log(error.message) }
        console.log(`Server is runing on 5000`);
    });
}
server();
connection();


