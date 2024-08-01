import jwt from 'jsonwebtoken'

export const TokenGenerator=(userId)=>{
    const token=jwt.sign({
        userId
    },process.env.SECRET_KEY)
    return token;
}