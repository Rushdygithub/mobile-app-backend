const user = require('../model/user')
const route = require('../routes/route')

const userRegister =  (req,res) => {
    try {

        const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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

module.exports = {
    userRegister
}