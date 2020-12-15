const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const {findOrCreateUser} = require('./controllers/useController')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(()=> console.log('base de datos conectada') )
  .catch( err => console.log(err) )


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        let authToken = null
        let currectUser = null

        try{
            authToken = req.headers.authorization
            if(authToken){
            currentUser =  await  findOrCreateUser(authToken)
            }
        }catch(err){
            console.log('debes registrarte')
        }
        return {currentUser}
    }

})

server.listen().then(({url}) => {
    console.log(`server listen ${url}`)
})