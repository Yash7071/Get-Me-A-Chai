"use server"

import Razorpay from "razorpay"
import connectDB from "@/db/connectDb";
import Payment from "@/models/payment";
import User from "@/models/user";

export const initiate = async(amount, to_username, paymentform) =>{
    
    await connectDB()
    //fetch the secret of the user who is getting the payment
    let user = await User.findOne({ username: to_username });
    const secret = user.razorpaysecret;

    var instance = new Razorpay({
        key_id: user.razorpayid, // Enter the Key ID generated from the Dashboard
        key_secret: secret, // Enter the Key Secret generated from the Dashboard
    })
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment in the database
    await Payment.create({
        name: paymentform.name,
        to_user: to_username,
        oid: x.id,
        amount: amount/100,
        message: paymentform.message,
    })
    return x
}

export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({username: username})
    if (!u) {
        return null; 
      }
    let user = u.toObject({flattenObjectIds: true})
    return user
}

export const fetchpayments = async (username) => {
    await connectDB()
    let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).limit(10).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({username: ndata.username})
        if (u) {
            return {error: "Username already taken"}
        }
        await User.updateOne({email: ndata.email}, ndata)
        //Now update all the usernames in the Payments table
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        

    }else{

        await User.updateOne({email: ndata.email}, ndata)
    }
}