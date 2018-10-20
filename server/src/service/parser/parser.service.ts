import { injectable, inject } from 'inversify';
import { spawn } from 'child_process';
import * as fs from 'fs-extra';
import { LinkedinInfoParserService } from 'service/linkedinInfoParser';

@injectable()
export class ParserService {

    public constructor(
        @inject(LinkedinInfoParserService) private linkedinInfoParserService: LinkedinInfoParserService,
    ) { }

    public parseUser(name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const opt = {
                stdio: 'inherit',
                shell: true,
                cwd: '../linkedInParser',
            };

            // tslint:disable-next-line:max-line-length
            const args = [`run test -- --params.login.email=wot220697@gmail.com --params.login.password=Kin11001 --params.search.username=\"${name}\"`];

            console.log(__dirname, "__dirname before spawn");
            const child = spawn('npm', args, opt);

            child.on('close', async () => {
                const path = `../linkedInParser/${name}.json`;

                console.log(__dirname, "__dirname on close");

                const isPathExist = await fs.pathExists(path);

                if (!isPathExist) {
                    reject();
                }

                const json = await fs.readJson(path);

                console.log('JSON DATA', json);

                const parsedData = this.linkedinInfoParserService.parseProfileData(json);

                resolve(parsedData);
            });
        });
    }
}
