import rAll from 'require-all'
import { extname } from 'path'
import { Container, ObjectFactory } from 'typescript-ioc'
import { Config } from '@smoothjs/config'
import { esmResolver } from '../utils'

export class ConfigResolver {
    constructor(public directory: string) {}

    public register() {
        const configFactory: ObjectFactory = () => new Config(this.requireAll())
        Container.bind(Config).factory(configFactory)
    }

    public requireAll(
        recursive: boolean = true,
        optional: boolean = false,
    ) {
        try {
            return rAll({
                dirname: this.directory,
                recursive,
                filter: (file: string) => {
                    let result: boolean | string = this.fileFilter(file)

                    if (result === true) {
                        const ext = extname(file)
                        return file.replace(new RegExp(`${ext}$`), '')
                    }

                    return result
                },
                resolve: this.resolver,
            })
        } catch (error) {
            if (error.code === 'ENOENT' && optional) {
                return {}
            } else {
                throw error
            }
        }
    }

    private fileFilter(file: string): boolean {
        const ext = extname(file)

        if (['.js', '.json'].includes(ext)) {
          return true
        }
      
        if (ext === '.ts' && ! file.endsWith('.d.ts')) {
          return true
        }
      
        return false
    }

    private resolver(output: any): any {
        return esmResolver(output) as Object
    }
}