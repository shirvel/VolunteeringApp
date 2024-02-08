import Comment from '../models/comment_model';
import User from '../models/user_model';
import Post from '../models/post_model';
import mongoose from "mongoose";
import { Request, Response } from 'express';
import { Console } from 'console';

export interface IPost {
  user_id: string; 
  title: string;
  content: string;
  phoneNumber: string;
  image?: string;
  category: string;
  likes: number;
  likedBy: string[];
  dislikedBy: string[];
  location: string;
  _id?: string;
};

const createPost = async (req, res) => {
    const post = new Post(req.body);
    try {
        await post.save();
        console.log(`Created new post, ID: ${post._id}`);
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json("fail: " + err.message);
    }
};

const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    try {
        res.status(200).json(posts);
      } catch (err) {
        console.error('Error getting posts:', err);
        res.status(500).json({ error: 'An error occurred while fetching posts' });
      }

};
const like = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const postId = req.params.id;
    console.log("user"+userId);
    // Check if the user has already liked the post
    const likedPostpost = await Post.findOne({ _id: req.params.id, likedBy: { $in: [userId] } });
    if (likedPostpost) {
      await Post.findOneAndUpdate(
                { _id: postId },
                { $inc: { likes: -1 }, $pull: { likedBy: userId } }
             );
      console.log('User has already liked this post');
      return res.status(400).json({ error: 'User has already liked this post' });
      
    }
    else{
      // Check if the user has already disliked the post
      const dislikepost = await Post.findOne({ _id: req.params.id, dislikedBy: { $in: [userId] } });
      if (dislikepost){
        await Post.findOneAndUpdate(
          { _id: postId },
          { $inc: { likes: 0 }, $pull: { likedBy: userId } }
       );
       console.log('User has already disliked this post');
       return res.status(400).json({ error: 'User has already disliked this post' });
      }
      else {
        // If the user hasn't liked the post, add the like
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 },  $push: { likedBy: userId } },
        { new: true }
      );
    res.status(200).json(updatedPost);
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add like' });
  }
};



const updatePostByID = async (req, res) => {
  try {
    if (req.body.content)
        await Post.findOneAndUpdate({_id: req.params.id}, {"content" :req.body.content});
    res.status(204).json({"message": "success"});
} catch (err) {
    res.status(500).json( {message: err.message} );
}
};
        

const deletePostById = async (req, res) => {
    try {
      await Comment.deleteMany({post_id: req.params.id});
      const post = await Post.findOneAndDelete({_id: req.params.id});
      if (!post) {
        console.log(`Post with ID ${req.params.postId} wasn't found for deletion`);
        res.status(404).json({ error: 'Post wasnt found' });
      } else {
        console.log(`Deleted post with ID: ${post._id}`);
        res.status(204).json({"message": "success"});
      }
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
  };
  const getByUser = async(req: Request, res: Response) => {
    try{
        console.log("back userid"+req.params.usrId);
        console.log("back userid"+req.params.userId);
        res.status(200).json(await Post.find({user_id: req.params.userId}));
    }catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

  export default {createPost, getAllPosts,  updatePostByID, deletePostById, like, getByUser}
