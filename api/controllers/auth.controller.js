import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    console.log('REQ BODY ON SIGNUP', req.body)

    const {userName, email, password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({userName, email, password: hashedPassword});

    await newUser.save().then(() => {
        res.status(201).json('User Created successfully!')
    }).catch((err) => {

        next(err)
    
    });

    // res.status(201).json('User Created successfully!')

   
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body

    try {
        const validUser = await User.findOne({email})
        if (!validUser) return next(errorHandler(404, 'User not found!'))
        console.log('VALID USER', validUser)
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(400, 'Invalid Password!'))
        console.log('VALID PASSWORD', validPassword)
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        console.log('TOKEN', token)
        //dont want password to be sent back to client
        const {password: pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest)

        


    } catch (error) {
        next(error)
        
    }
}


export const google = async (req, res, next) => {
    try {
        //check if the user exists in the db

        const {email, name, photoUrl} = req.body
        const user = await User.findOne({email})
        if (user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest)
        } else {
            //create a new user 
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const modifiedName = name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4)


            const newUser = new User({
                userName: modifiedName,
                email,
                password: hashedPassword,
                avatar: photoUrl
            })

            await newUser.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest} = newUser._doc;
            res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest)

        }

    } catch (error) {
        next(error)
        
    }

}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token')
        res.status(200).json('User has been logged out!')
        
    } catch (error) {
        next(error)
        
    }
}
