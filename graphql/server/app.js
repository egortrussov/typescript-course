const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const schema = require('./schema/schema');

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_URL_DEVELOPMENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) 
        throw new Error(err);
    console.log('Successfully connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
})