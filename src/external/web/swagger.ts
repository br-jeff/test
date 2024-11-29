
import fs from 'fs'
import path from 'path'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { Express, Request } from 'express'
import _ from 'lodash'
import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { serve, setup } from 'swagger-ui-express'
import YAML from 'yaml'

export async function setupSwagger(app: Express): Promise<void> {
    const storage = getMetadataArgsStorage()
    const schemas = validationMetadatasToSchemas({
        refPointerPrefix: '#/components/schemas/',
    })

    const spec = routingControllersToSpec(storage, undefined, {
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development',
            },
        ],
        components: {
            schemas: _.fromPairs(
                _.orderBy(_.toPairs(schemas), ([key]) => [key.endsWith('Schema'), key])
            ) as Record<string, any>,
            securitySchemes: {
                bearerAuth: {
                    scheme: 'bearer',
                    type: 'http',
                },
            },
        },
        info: {
            title: 'Documentation',
            description: '',
            version: '1.0.0',
        },
    })

    fs.writeFileSync(path.resolve('swagger.yml'), YAML.stringify(spec))

    const serveInstance = setup(spec)

    app.use(`/docs`, serve)
    app.get(`/docs`, serveInstance)
}
