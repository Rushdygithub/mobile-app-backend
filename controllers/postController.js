const post = require('../model/post');
const ObjectId = require('mongodb').ObjectId;


const createPost = async (req,res) => {
    try {

        const {userId,description,image,likes,dislikes} = req.body
       
        const commonValues = likes.filter(like => dislikes.includes(like));
        
        if (commonValues.length > 0) {
            return res.status(500).json({
                status: false,
                message: 'A user cannot both like and dislike the same post',
                commonValues: commonValues
            });
        } else {
            const newData = new post({
                userId: userId,
                description:description,
                image: image,
                likes: likes,
                dislikes: dislikes
            });
            newData.save();
            
            res.status(200).json({
                status:true,
                message: 'Post created succesfully'
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

const updatePost = async (req,res,id) => {
    try {
        const update = {description:req.body.description, image:req.body.image};
        
        if (id.length !== 24) {
            return res.status(403).json({
                status: false,
                message: 'Invalid ID format',
            });
        }

        const updateData = await post.updateOne({_id:id},update);

        if (updateData)
        {
            res.status(200).json({
                status:true,
                message: 'Post updated succesfully'
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
    createPost,
    updatePost 
}