import Comment from '../models/comment_model';
import User from '../models/user_model';
import Post from '../models/post_model';
import Category from '../models/category_model';
import { Request, Response } from 'express';

const createCategory = async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        console.error(err);
        res.send.status(500).json("fail: " + err.message);
    }
};

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    try {
        res.status(200).json(categories);
      } catch (err) {
        console.error('Error getting posts:', err);
        res.status(500).json({ error: 'An error occurred while fetching posts' });
      }

};
const getCategoryByName = async (req, res) => {
    const category = await Category.findOne({ name: req.params.name });
    try {
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
          }
          res.status(200).json(category);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch category by name' });
        }
};

  export default {createCategory, getAllCategories, getCategoryByName}