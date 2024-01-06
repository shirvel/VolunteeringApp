import Comment from '../models/comment_model';

const addComment = async (req, res) => {
    const comment = new Comment(req.body);
    try {
        await comment.save();
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.send.status(500).json("fail: " + err.message);
    }
};

const getAllComments = async (req, res) => {
    try {
        res.status(200).json(await Comment.find());
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
  
};

export default {addComment, getAllComments}