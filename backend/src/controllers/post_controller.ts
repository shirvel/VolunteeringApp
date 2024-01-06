import User from '../models/post_model';

const createPost = async (req, res) => {
    const post = new post(req.body);
    try {
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.log(err);
        res.send.status(500).json("fail: An error occurred while creating the post");
    }
};

const getAllPosts = async (req, res) => {
    try {
        res.status(200).json(await post.find());
    } catch (err) {
        res.status(500).json( 'An error occurred while getting the posts.' );
    }
  
};

const getPostById = async (req, res) => {
    const post = await postMessage.findById(req.params.postId); 
    try {
    if(!post){
        res.status(404).json({ error: 'Post not found.' });
    } else {
      res.json(post);
    } 
    }catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
  }
};
