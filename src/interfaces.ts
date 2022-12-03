interface Comment {
    id: string,
    message_id: string,
    author: number,
    message: string,
    postedAt: string
}

interface Message {
    id: string,
    user_id: string,
    sender: string,
    message: string,
    postedAt: string
}

interface ArgsID {
    id: string
}

interface User {
    id: string,
    verified: number,
    email: string,
    password: string,
    username: string,
    fullname: string,
    bio: string,
    avatar: string
}

interface Login {
    username: string,
    password: string
}

interface Register {
    username: string,
    password: string
}

interface Token {
    token: string
}

interface JWTUser {
    id: string,
    username: string,
}

interface LoginResponse {   
    status: string,
    message: string,
    token: string | null
}

interface CheckTokenResponse {
    status: string
}

interface UserMessagesResponse {
    status: string,
    messages: Array<Message> | null
}

interface UserResponse {
    status: string,
    data: User | null
}

export { User, Comment, Message, ArgsID, Login, Register, Token, JWTUser, LoginResponse, CheckTokenResponse, UserMessagesResponse, UserResponse };