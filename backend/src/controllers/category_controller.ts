import Category from '../models/category_model';;
import { Request, Response } from 'express';

export interface ICategory {
    name: string;
    _id?: string;
};


const addCategory = async (req: Request, res: Response) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({"message": + err.message});
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Category.find());
    } catch (err) {
        res.status(500).json({message: err.message});
    }
  
};

const deleteCategory = async(req: Request, res: Response) => {
    try {
        await Category.findOneAndDelete({_id: req.params.id});
        res.status(204).json({"message": "success"});
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};



export default {addCategory, getAllCategories, deleteCategory}