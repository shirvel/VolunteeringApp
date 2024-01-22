import ChatRoom from "../models/chat_room_model";
import { Request, Response } from 'express';

const get_old_messages = async (req: Request, res: Response) => {
    try {
        const chat_room = await ChatRoom.findOne({category_name: req.params.category});
        res.status(200).json({messages: chat_room.messages});
    } catch (err) {
        res.status(500).json({"message": + err.message});
    }
};

export default {get_old_messages}