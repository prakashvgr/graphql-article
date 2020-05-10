const express = require('express')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const graphqlSchema = require('./gql/schema')
const graphqlResolvers = require('./gql/resolvers')

const app = express()

app.use('/graphql', graphqlHttp({
    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql: true
}))

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-gqu2f.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(uri, options)
        .then(() => app.listen(3000, console.log('Server is running')))
        .catch(error => { throw error })