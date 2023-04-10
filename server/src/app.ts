import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import http from 'http'
import { DocumentNode } from 'graphql';

type Resolvers = {
    [key: string]: {
      [key: string]: (parent: any, args: any, context: any, info: any) => any;
    };
};

export async function startApolloServer(typeDefs: DocumentNode, resolvers: Resolvers ) {
    const app = express()
    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start()

    app.use('/graphql', cors(), express.json(), expressMiddleware(server))
    
    await new Promise(resolve => {
        httpServer.listen({port: 4000}, () => {
            console.log(`Server running on port 4000`)
        })
    })
}