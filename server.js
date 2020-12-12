const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(()=> console.log('base de datos conectada') )
  .catch( err => console.log(err) )


const server = new ApolloServer({
    typeDefs,
    resolvers

})

server.listen().then(({url}) => {
    console.log(`server listen ${url}`)
})