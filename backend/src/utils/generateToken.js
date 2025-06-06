import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function generateToken(user) {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}