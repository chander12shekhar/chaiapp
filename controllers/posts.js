import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPost = async (req, res) => { 
    const { userId } = req.body;
    try {
        const post = await PostMessage.find();
        var totalChai = 0;
        var totalAmount = 0;
        const now = new Date();
        for (var i = post.length - 1; i >= 0; i--) {
            if(post[i].claimedToken === true){
                continue;
            }
            var diffDays = parseInt((now - post[i].Stakeddate) / (1000 * 60 * 60))
            if(post[i].tokenName === "BTC"){
                totalAmount = totalAmount + parseInt(post[i].tokenAmount) * 60000 * diffDays;
            } else if(post[i].tokenName === "ETH"){
                totalAmount = totalAmount + parseInt(post[i].tokenAmount) * 1500 * diffDays;
            } else if(post[i].tokenName === "WBNB"){
                totalAmount = totalAmount + parseInt(post[i].tokenAmount) * 400 * diffDays;
            } else if(post[i].tokenName === "BUSDT"){
                totalAmount = totalAmount + parseInt(post[i].tokenAmount) * 75 * diffDays;
            } else if(post[i].tokenName === "DAI"){
                totalAmount = totalAmount + parseInt(post[i].tokenAmount) * 75 * diffDays;
            } else if(post[i].tokenName === "ADA"){
                totalAmount = totalAmount + parseInt(post[i].tokenAmount) * 1 * diffDays;
            } else if(post[i].tokenName === "AUTO"){
                totalAmount = totalAmount + parseInt(post[i].tokenAmount) * 100 * diffDays;
            } else if(post[i].tokenName === "CHAI"){
                totalChai = totalChai + parseInt(post[i].claimed);
            }
        }
        const total = (totalAmount * 0.000001) - totalChai;
        res.status(200).json({"post": post, "totcalChai": total});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { userId, txnId, tokenName, tokenAmount, claimed} = req.body;
    const { Stakeddate } = new Date();
    var claimedToken = false;
    if(req.body.st === "1"){
        claimedToken = true;
    }
    const newPostMessage = new PostMessage({ userId, txnId, tokenName, tokenAmount, claimed, claimedToken })
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;