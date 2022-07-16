const { projects, clients } = require('../sampleData.js')

const { 
        GraphQLObjectType, 
        GraphQLID, 
        GraphQLString, 
        GraphQLList,
        GraphQLSchema } = require('graphql')

// Mongoose Models
const Project = require('../models/Project')
const Client = require('../models/Client')

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        // access clients by their projects
        client: {
            type: ClientType,
            resolve(parent, args) {
                // return clients.find(client => client.id === parent.clientId)
                return clients.findById(parent.clientId)
            }
        }
    })
})

// to create a query eg get client by Id
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //get all projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            },
        },
        //get project by ID
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        },
        //get all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            },
        },
        //get client by ID
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})





