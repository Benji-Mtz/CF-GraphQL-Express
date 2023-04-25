const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, graphql, GraphQLInt } = require('graphql'); 

const app = express();
const port = process.env.PORT || 8080;

// Nuevos tipos con subpropiedades => GraphQLObjectType 
const courseType = new GraphQLObjectType({
    name: 'Course',
    fields: {
        title: { type: GraphQLString },
        views: { type: GraphQLInt }
    }
})

// Definicion del schema inputs & outputs
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            message: {
                type: GraphQLString,
                resolve(){
                    return "Hola Schema";
                }
            },
            course: {
                type: courseType,
                resolve(){
                    return { title: "Curso de Graphql", views: 1000};
                }
            }
        }
    })
});

app.get('/', function(req, res){
    graphql(schema, `{ message, course{ title, views } }`)
        .then( r => res.json(r))
        .catch(res.json);
});

app.listen(port, function(){
    console.log(`Servidor iniciado en http://localhost:${ port }`);
})