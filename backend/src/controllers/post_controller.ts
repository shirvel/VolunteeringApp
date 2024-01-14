import Comment from '../models/comment_model';
import User from '../models/user_model';
import Post from '../models/post_model';
import { Request, Response } from 'express';

export interface IPost {
  title: string;
  content: string;
  phoneNumber: string;
  image: string;
  category: string;
  likes: number;
  dislikes: number;
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
        res.send.status(500).json("fail: " + err.message);
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
//const getPostByID = async (req, res) => {
//    const post = await Post.findById(req.params.postId, req.body, { new: true })
//    try {
//        if(!post){
//        console.log(`Post with ID ${req.params.postId} not found`);
//        res.status(404).json({ error: 'Post not found.' });
//    } else {
//        res.status(200).json(post); // The post was found 
//    } 
//    }catch (err) {
//        res.status(500).json({ error: 'An error occurred while searching the post.' });
//  }
//};

const addLike = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.postId },
    { $inc: { likes: 1 } },
    { new: true }
  );
  try {
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add like' });
  }
};

// Add dislike to a post by its ID
const addDislike = async (req, res) => {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $inc: { dislikes: 1 } },
      { new: true }
    );
  try {
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add dislike' });
  }
};

const updatePostByID = async (req, res) => {
    const post = await Post.findOneAndUpdate({_id: req.params.id}, {"content" :req.body.content});
    try{
        if (!post) {
            console.log(`Post with ID ${req.params.postId} not found for updating`);
            res.status(404).json({ error: 'Post not found' });
          } else {
            res.status(200).json(post);
          }
        } catch (err) {
          res.status(500).json({ error: 'An error occurred while updating the post' });
        }
};
        

const deletePostById = async (req, res) => {
    try {
      const post = await Post.findOneAndDelete({_id: req.params.id});
      if (!post) {
        console.log(`Post with ID ${req.params.postId} wasn't found for deletion`);
        res.status(404).json({ error: 'Post wasnt found' });
      } else {
        console.log(`Deleted post with ID: ${post._id}`);
        res.status(204).send(); 
      }
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
  };

  const findPostsByCategory = async (req: Request, res: Response) => {
    const category = req.params.category; 
    const posts = await Post.find({ category: category }).exec();
    try {
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: 'No posts found in the specified category' });
      }
  
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export default {createPost, getAllPosts,  updatePostByID, deletePostById, addLike, addDislike, findPostsByCategory}