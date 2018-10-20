import { injectable } from 'inversify';
import { spawn } from 'child_process';
import * as fs from 'fs-extra';

@injectable()
export class ParserService {

    public constructor() {

    }

    public parseUser(name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const opt = {
                stdio: 'inherit', shell: true,
                cwd: '../linkedInParser',
            };

            // tslint:disable-next-line:max-line-length
            const args = [`run test -- --params.login.email=wot220697@gmail.com --params.login.password=Kin11001 --params.search.username=\"${name}\"`];

            const child = spawn('npm', args, opt);

            child.on('close', async () => {
                const path = `../linkedInParser/${name}`;

                const isPathExist = await fs.pathExists(path);

                if (!isPathExist) {
                    reject();
                }

                // const json = fs.readJson(path);

                resolve(name);
            });
        });
    }
}
