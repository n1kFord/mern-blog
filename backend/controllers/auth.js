import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const {username, password} = req.body

        const isUsed = await User.findOne({username})

        if (isUsed) {
            return res.json({
                message: 'Error: User with the same name already exists.',
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'},
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'Registration completed successfully!',
        })
    } catch (error) {
        res.json({message: 'An error occurred while creating the user'})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if (!user) {
            return res.json({
                message: "Error: The username or password you entered is incorrect"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: "Error: The username or password you entered is incorrect"
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )
        return res.json({
            token, user,
            message: "Authorization was successful!"
        })
    } catch (e) {
        return res.json({
            message: "An error occurred during authorization"
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: "Error: The username or password you entered is incorrect"
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )
        return res.json({
            token, user
        })
    } catch (e) {
        return res.json({
            message: "Error: No access"
        })
    }
}