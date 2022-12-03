import { gql } from 'apollo-server';

const typeDefs = gql`

    type User {
        id: ID! 
        verified: Boolean
        email: String
        password: String
        username: String
        fullname: String
        bio: String
        avatar: String
    }

    type Comment {
        id: ID!
        author: Int
        message: String
        postedAt: String
    }

    type Message {
        id: ID!,
        sender: String,
        message: String,
        postedAt: String
        comments: [Comment]
    }

    type UserResponse {
        status: String
        data: User
    }

    type MessageResponse {
        status: String
        messages: [Message]
    }

    type LoginResponse {
        status: String,
        message: String
        token: String
    }

    type CheckTokenResponse {
        status: String
    }

    type Query {
        hello: String
        users: [User]
        user(id: ID!): UserResponse
        userMessages(id: ID!): MessageResponse
        login(username: String, password: String): LoginResponse
        ct(token: String!): CheckTokenResponse
    }

    type RegisterResponse {
        status: String
        message: String
    }

    type FullnameResponse {
        status: String
        message: String
    }

    type UsernameResponse {
        status: String
        message: String
    }

    type BioResponse {
        status: String
        message: String
    }

    type SendMessageResponse {
        status: String
        message: String
    }

    type SendCommentResponse {
        status: String
        message: String
    }

    type DeleteMessageResponse {
        status: String
        message: String
    }

    type UpdateAvatar {
        status: String
        message: String
    }

    type Mutation {
        register(username: String!, password: String!): RegisterResponse
        updateAvatar(token: String!, url: String!): UpdateAvatar
        updateFullname(token: String!, newFullname: String!): FullnameResponse
        updateUsername(token: String!, newUsername: String!): UsernameResponse
        updateBio(token: String!, newBio: String!): BioResponse
        sendMessage(id: ID!, sender: String!, message: String!): SendMessageResponse
        sendComment(message_id: ID!, author: Boolean!, message: String!): SendCommentResponse
        deleteMessage(token: String!, message_id: ID!): DeleteMessageResponse
    }


`;

export default typeDefs;