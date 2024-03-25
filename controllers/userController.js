const user = require('../model/user')
const route = require('../routes/route')
const bcypt = require('bcrypt')

const userRegister = async (req,res) => {
    try {
        
        let salt = 10
        const hashPassword = await bcypt.hash(req.body.password, salt)
        const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.profilePicture,
            isAdmin: req.body.isAdmin,
            desc: req.body.desc,
            from: req.body.from,
            relationship: req.body.relationship,
            followers: req.body.followers,
            followings: req.body.followings
        });

        newUser.save();
        return res.status(200).json({
            status: true,
            message: 'User is registred succefully'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        });
    }
}

const userLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const findUser = await user.findOne({email});
        if (!findUser)
        {
            return res.status(401).json({
                status: false,
                error: 'User does not exsist'
            });
        }
        
        const check = await user.find({email})
        const passDB = check[0].password

        const passCheck = await bcypt.compare(password, passDB);
        if (!passCheck)
        {
            return res.status(401).json({
                status: false,
                error: 'Password does not match'
            });
        }
 
       res.status(200).json({
            status: true,
            message: 'User logged succesfully'
       });

    } catch (error) { 
        return res.status(500).json({
            status: false,
            error: error.message
        });
    }
}

const userUpdate = async (req,res,id) => {
    try {
        const salt = 10;
        const hashPassword = await bcypt.hash(req.body.password, salt);
        const up = {username:req.body.username, password: hashPassword}

        const update = await user.updateOne({_id:id},up);
        if (update) 
        {
            res.status(200).json({
                status: true,
                message: `${id} is updated succesfully`
            });
        }
        
    } catch (error)
    {
        return res.status(500).json({
            status: false,
            error: error.message
        });
    }
}

const deleteUser = async (req,res,id) => {
    try {
        const findUser = await user.findOne({_id:id});
        if(!findUser)
        {
            return res.status(401).json({
                status: false,
                error: 'User does not exsist'
            });
        }
        const userDel = await user.deleteOne({_id:id});
        if(userDel)
        {
            res.status(200).json({
                status: true,
                message: `${id} is deleted succesfully`
            });
        }
       
    } catch (error)
    { 
        return res.status(500).json({
        status: false,
        error: error.message
        });
    }
}

module.exports = {
    userRegister,
    userLogin,
    userUpdate,
    deleteUser
}