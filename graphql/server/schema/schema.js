const graphql = require('graphql');

const Book = require('../models/Book');
const Author = require('../models/Author');

const { GraphQLObjectType, GraphQLSchema } = graphql;

// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        genre: { type: graphql.GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findOne({ _id: parent.authorId })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        books: {
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: graphql.GraphQLID }
            },
            resolve(parent, args) {
                return Book.findOne({ _id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: graphql.GraphQLID }
            },
            resolve(parent, args) {
                return Author.findOne({ _id: args.id })
            }
        },
        books: { 
            type: new graphql.GraphQLList(BookType),
            args: {
                genre: { type: graphql.GraphQLString, defaultValue: null },
                authorId: { type: graphql.GraphQLID, defaultValue: null }
            },
            resolve(parent, args) {
                Book.find({}).then(res => console.log(res))
                return Book.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {  
                    type: graphql.GraphQLString
                },
                age: {
                    type: graphql.GraphQLInt
                }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {  
                    type: graphql.GraphQLString
                },
                genre: {  
                    type: graphql.GraphQLString
                },
                authorId: {
                    type: graphql.GraphQLID
                }
            },
            resolve(parent, args) {
                let newBook = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return newBook.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})