import { sequelize } from './sequelize';
import { QueryTypes } from 'sequelize';
import createID from 'create-simple-id';
const base64 = require('base-64');
import jwt from 'jsonwebtoken';
import { KEY } from './configs/jwt.config.json';
import { ArgsID, User, Comment, Message, Login, Register, Token, JWTUser, LoginResponse, CheckTokenResponse, UserMessagesResponse, UserResponse } from './interfaces';
import { SUCCESS_SEND_MESSAGE, SUCCESS_SEND_COMMENT, SUCCESS_UPDATED_USERNAME, SUCCESS_UPDATED_BIO, UNAUTHORIZED, SUCCESS_REGISTER, SUCCESS_LOGIN, SUCCESS_UPDATED_FULLNAME, MESSAGE_DELETED, USER_NOT_FOUND, AUTHORIZED } from './types';

const resolvers = {
    Query: {
        async users(parents: any, args: any): Promise<Array<User>> {
            return await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
        },
        async user(parents: any, args: ArgsID): Promise<UserResponse> {
            const { id } = args;
            const GetUser: any = await sequelize.query(`SELECT * FROM users WHERE id = '${id}'`, { type: QueryTypes.SELECT });
            if(GetUser.length > 0){
                const [ user ] = GetUser;
                return { status: "OK", data: user };
            } else {
                return { status: "NOT_FOUND", data: null };
            }
        },
        async userMessages(parents: any, args: ArgsID): Promise<UserMessagesResponse> {
            const { id } = args;

            try {
                const messages: any = await sequelize.query(`SELECT id, sender, message, postedAt FROM messages WHERE user_id = '${id}' ORDER BY postedAt DESC;`, { type: QueryTypes.SELECT });
                const comments: any = await sequelize.query(`SELECT * FROM comments order by postedAt asc;`, { type: QueryTypes.SELECT });
    
                for(let i = 0; i < messages.length; i++){
                    messages[i].comments = [];
                }
    
                comments.forEach((comment: Comment) => {
                    const { message_id } = comment;
                    messages.forEach((message: Message, index: number) => {
                        if(message.id === message_id){
                            messages[index].comments.push(comment);
                        }
                    });
                });
    
                return { status: "OK", messages };

            } catch(err){
                return { status: "SERVER_ERROR", messages: null };
            }
        },
        async login(parents: any, args: Login): Promise<LoginResponse> {
            const { username, password } = args;

            try {
                const user: any = await sequelize.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${base64.encode(password)}'`, { type: QueryTypes.SELECT });
                const userJWT: JWTUser = { id: user[0].id, username: user[0].username };
                const token: string = jwt.sign(userJWT, KEY, { expiresIn: '2d' });
                return { status: "OK", message: SUCCESS_LOGIN, token };

            } catch(err){
                return { status: "NOT_FOUND", message: USER_NOT_FOUND, token: null };
            }

        },
        async ct(parents: any, args: Token): Promise<CheckTokenResponse>{
            const { token } = args;
            try {
                jwt.verify(token, KEY);
                return { status: AUTHORIZED };

            } catch(err){
                return { status: UNAUTHORIZED };

            }
        }
    },
    Mutation: {
        async register(parents: any, args: Register): Promise<{ status: string, message: string }>{
            const { username, password } = args;
            const FindUser = await sequelize.query(`SELECT * FROM users WHERE username = '${username}'`, { type: QueryTypes.SELECT });
            if(FindUser.length > 0){
                return { status: "CONFLICT", message: "The username is already exist" };
            }
            try {
                await sequelize.query(`INSERT INTO users (id, username, password, verified) VALUES ('sc-${createID(10)}', '${username}', '${base64.encode(password)}', 0)`, { type: QueryTypes.INSERT });
                return { status: "OK", message: SUCCESS_REGISTER };

            } catch(err){
                return { status: "ERROR", message: "SERVER_ERROR" };
            }
        },
        async updateAvatar(parents: any, args: any): Promise<{ status: string, message: string }>{
            const { token, url } = args;
            if(!url.length) return { status: "BAD_REQUEST", message: "URL_LENGTH" };

            try {
                const verify: any = jwt.verify(token, KEY);
                await sequelize.query(`UPDATE users SET avatar = '${url}' WHERE id = '${verify.id}'`, { type: QueryTypes.UPDATE });
                return { status: "OK", message: "SUCCESS_UPDATED_AVATAR" };

            } catch(err){
                return { status: UNAUTHORIZED, message: "FAILED_UPDATE_AVATAR" };
            }
        },
        async updateFullname(parents: any, args: any): Promise<{ status: string, message: string }> {
            const { token, newFullname } = args;
            if(newFullname.length < 4) return { status: "BAD_REQUEST", message: "FULLNAME_LENGTH" };

            try {
                const verify: any = jwt.verify(token, KEY);
                await sequelize.query(`UPDATE users SET fullname = '${newFullname}' WHERE id = '${verify.id}'`, { type: QueryTypes.UPDATE });
                return { status: "OK", message: SUCCESS_UPDATED_FULLNAME };

            } catch(err){
                return { status: UNAUTHORIZED, message: "FAILED_UPDATE_FULLNAME" };
            }
        },
        async updateUsername(parents: any, args: { token: string, newUsername: string }): Promise<{ status: string, message: string }>{
            const { token, newUsername } = args;
            if(newUsername.length < 4) return { status: "BAD_REQUEST", message: "USERNAME_LENGTH" };

            try {
                const verify: any = jwt.verify(token, KEY);

                try {
                    const rightUsername = newUsername.split(" ").join("");
                    await sequelize.query(`UPDATE users SET username = '${rightUsername}' WHERE id = '${verify.id}'`, { type: QueryTypes.UPDATE }); 
                    return { status: "OK", message: SUCCESS_UPDATED_USERNAME };

                } catch(err){
                    return { status: "SERVER_ERROR", message: "WE_ARE_HAVING_TECHNICAL_ISSUE" };
                }

            } catch(err){
                return { status: UNAUTHORIZED, message: "FAILED_UPDATE_USERNAME" };
            }
        },
        async updateBio(parents: any, args: { token: string, newBio: string }): Promise<{ status: string, message: string }>{
            const { token, newBio } = args;

            try {
                const verify: any = jwt.verify(token, KEY);
                await sequelize.query(`UPDATE users SET bio = '${newBio}' WHERE id = '${verify.id}'`, { type: QueryTypes.UPDATE });
                return { status: "OK", message: SUCCESS_UPDATED_BIO };

            } catch(err){
                return { status: UNAUTHORIZED, message: "FAILED_UPDATE_BIO" };
            }
        },
        async sendMessage(parents: any, args: { id: string, sender: string, message: string }): Promise<{ status: string, message: string }>{
            const { id, sender, message } = args;

            try {
                const message_id = `msg-${createID(16)}`;
                await sequelize.query(`INSERT INTO messages (id, user_id, sender, message) VALUES ('${message_id}', '${id}', '${sender}', '${message}')`, { type: QueryTypes.INSERT });
                return { status: "OK", message: SUCCESS_SEND_MESSAGE };

            } catch(err){
                return { status: "SERVER_ERROR", message: "WE_ARE_HAVING_TECHNICAL_ISSUE" };
            }
        },
        async sendComment(parents: any, args: { message_id: string, author: string, message: string }): Promise<{ status: string, message: string }>{
            const { message_id, author, message } = args;
            const commentID = `cmt-${createID(16)}`;
            try {
                await sequelize.query(`INSERT INTO comments (id, message_id, author, message) VALUES ('${commentID}', '${message_id}', ${author}, '${message}')`, { type: QueryTypes.INSERT });
                return { status: "OK", message: SUCCESS_SEND_COMMENT };

            } catch(err){
                return { status: "SERVER_ERROR", message: "WE_ARE_HAVING_TECHNICAL_ISSUE" };
            }
        },
        async deleteMessage(parents: any, args: { token: string, message_id: string }): Promise<{ status: string, message: string }>{
            const { token, message_id } = args;
            try {
                jwt.verify(token, KEY);

                try {
                    await sequelize.query(`DELETE FROM messages WHERE id = '${message_id}';`, { type: QueryTypes.DELETE });
                    return  { status: "OK", message: MESSAGE_DELETED };

                } catch(err){
                    return { status: "SERVER_ERROR", message: "WE_ARE_HAVING_TECHNICAL_ISSUE" };
                }

            } catch(err){
                return { status: "UNAUTHORIZED", message: "FAILED_DELETE_MESSAGE" };
            }
        }
    }
};

export default resolvers;