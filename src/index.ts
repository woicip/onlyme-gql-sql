import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_ENV = 'production';

import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import cors from 'cors';
import http from 'http';
import typeDefs from './typedefs';
import resolvers from './resolvers';

async function startApolloServer(typeDefs: any, resolvers: any) {
    const port = 4000;
    const app = express();

    const httpServer = http.createServer(app);

    const server: ApolloServer<ExpressContext> = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true })
        ]
    });

    await server.start();

    const corsOpts = {
        origin: process.env.NODE_ENV == "development" ? process.env.ORIGIN_DEVELOPMENT : process.env.ORIGIN_PRODUCTION,
        optionsSuccessStatus: 200,
    }

    server.applyMiddleware({ app, cors: corsOpts });
    app.use(cors(corsOpts));

    await new Promise<void>(resolve => httpServer.listen({ port }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);