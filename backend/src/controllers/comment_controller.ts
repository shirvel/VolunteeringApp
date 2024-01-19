import { Request, Response } from 'express';
import Comment from '../models/comment_model';
import User from '../models/user_model';
import Post from '../models/post_model';

export interface IComment {
    user_name: string;
    post_id: string;
    content: string;
    _id?: string;
};

const validateComment = async(comment: IComment, res: Response) => {
    let isValid = true;
    // Check the post id.
    const post = await Post.findOne( { _id:  comment.post_id} );
    if (!post)  isValid = false;
    // Check if the user exists
    const user = await User.findOne( { name:  comment.user_name} );
    if (!user)  isValid = false;
    return isValid;
};

const addComment = async (req: Request, res: Response) => {
    try {
        if (!validateComment(req.body as IComment, res)) return res.status(400).json({message: "The comment is not valid"});
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({"message": + err.message});
    }
};

const getAllComments = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Comment.find());
    } catch (err) {
        res.status(500).json({message: err.message});
    }
  
};

const deleteComment = async(req: Request, res: Response) => {
    try {
        await Comment.findOneAndDelete({_id: req.params.id});
        res.status(204).json({"message": "success"});
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

const editComment = async(req: Request, res: Response) => {
    try {
        // We only allow content change
        if (req.body.content)
            await Comment.findOneAndUpdate({_id: req.params.id}, {"content" :req.body.content});
        res.status(204).json({"message": "success"});
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

export default {addComment, getAllComments, deleteComment, editComment}