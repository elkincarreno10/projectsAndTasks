import { startApolloServer } from "./app"
import { typeDefs } from "./graphql/typeDefs"
import { resolvers } from "./graphql/resolvers"
import { connectDB } from "./config/db"
import dotenv from 'dotenv'

dotenv.config()
connectDB()


startApolloServer(typeDefs, resolvers)

