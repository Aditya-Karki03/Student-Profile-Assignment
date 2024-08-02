import jwt from 'jsonwebtoken'

export default function decodeToken(token){
    const {userId}=jwt.decode(token)
    return userId;
}