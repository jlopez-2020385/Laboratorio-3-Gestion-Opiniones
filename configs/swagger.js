import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestion de Opiniones API",
            version: "1.0.0",
            description: "API para gestiona opiniones",
            contact:{
                name: "José López",
                email: "jlopez-2020385@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/gestionPublicaciones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/publications/publications.routes.js",
        "./src/comments/comment.routes.js",
        "./src/category/category.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}