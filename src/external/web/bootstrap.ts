import fs from 'fs'
import path from 'path'

export function bootstrap() {
    const controllerPath = path.resolve(__dirname, '../../application/controllers');
    const controllers = fs.readdirSync(controllerPath).map((fileName) =>
        `${controllerPath}/${fileName}`
    );

    return controllers
}
