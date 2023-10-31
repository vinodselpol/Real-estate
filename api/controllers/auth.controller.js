import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';


export const signup = async (req, res) => {
    console.log('REQ BODY ON SIGNUP', req.body)

    const {userName, email, password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({userName, email, password: hashedPassword});

    await newUser.save().then(() => {
        res.status(201).json('User Created successfully!')
    }).catch((err) => {
        res.status(404).json(err.message)
        console.log(err.message)
    });

    // res.status(201).json('User Created successfully!')

   
}
