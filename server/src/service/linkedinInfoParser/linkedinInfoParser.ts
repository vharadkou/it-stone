const ignoreSkillsJson: any = {
    'HTML': 'XML',
    'CSS': [
        'Sass',
        'Less'
    ],
    'JavaScript': [
        'TypeScript'
    ],
    'React': [
        'Angular',
        'AngularJS',
        'Vue.js'
    ],
    'D3.js': 6,
    'Webpack': [
        'Grunt',
        'Gulp'
    ],
    'SQL': [
        'NOSQL'
    ],
    'C#': [
        'Java'
    ],
    'ASP.NET': 4,
    'Java': [
        '.Net',
        'C#'
    ],
    'Android': 1,
    '.NET': 'Java',
    'arduino': 9,
    'Arduino': [
        'C'
    ],
    'C++': '',
    'C': 'Rust',
    'Rust': 'C'
};

let superSkillsArray = (coreSkills: any) => {
    if (coreSkills.indexOf("Java") !== -1) {

        return (education: any) => {

            return (connection: any) => {
                if (education <= 2) {
                    return "easyJava";
                }

                if (connection <= 50) {
                    return "mediumJava";
                }

                return "hardJava";
            };
        }
    }

    if (coreSkills.indexOf(".Net") !== -1 || coreSkills.indexOf("C#") !== -1) {
        return (education: any) => {

            return (connection: any) => {

                if (education <= 2) {
                    return "easy.Net";
                }

                if (connection <= 50) {
                    return "medium.Net";
                }

                return "hard.Net";
            };
        }
    }

    return (education: any) => {
        return (connections: any) => {
            return "Base";
        }
    }
}

const skillsValues: any = {
    'HTML': 1,
    'CSS': 2,
    'JavaScript': 7,
    'React': 6,
    'D3.js': 6,
    'Webpack': 3,
    'SQL': 4,
    'C#': 1,
    'ASP.NET': 4,
    'Java': 0,
    'Android': 1,
    '.NET': 4,
    'arduino': 9,
    'Arduino': 10,
    'C++': 10,
    'C': 10
};
import { injectable } from 'inversify';

@injectable()
export class LinkedinInfoParserService {
    public parseProfileData(data: any): any {
        const skills = data.skills;

        const createAttack = (skills: any) => {
            return skills
                .map((skill: any) => skillsValues[skill] ? { skill, value: skillsValues[skill], } : { skill, value: 2 })
                .reduce((resultObj: any, current: any) => {
                    resultObj[current.skill] = current.value;
                    return resultObj
                }, {});
        };

        const ignoreSkills = (skills: any) => {
            return skills
                .map((skill: any) => ignoreSkillsJson[skill] ? ignoreSkillsJson[skill] : [])
                .reduce((result: any, current: any) => [...result, ...current], []);
        }

        const getSuperSkill = (profile: any): any => {
            const education = profile.education || 0;
            const connections = profile.connections || 0;
            const skills = profile.skills;
            const coreSkills = skills.slice(0, 3);

            return superSkillsArray(coreSkills)(education)(connections);
        };

        const getCoef = (coreSkills: any) => {
            const superSkill = ['.Net', 'JavaScript', 'TypeScript', 'C#'];
            return coreSkills.map((skill: any) => superSkill.indexOf(skill) !== -1 ? 1.5 : 1).reduce((acc: any, cur: any) => acc * cur, 1);
        };

        return {
            name: data.name,
            image: data.image,
            hp: (data.education + data.skills.length) * getCoef(skills.slice(0, 3)),
            superSkill: getSuperSkill(data),
            createAttack: createAttack(data.skills),
            ignore: ignoreSkills(skills)
        };
    }
}

// const parser = new LinkedinInfoParserService();

// const data = {
//     name: 'Nikita Bazhkou',
//     currentPosition: '.Net Software Engineer - EPAM Systems',
//     skills: [
//         'C#',
//         'JavaScript',
//         'SQL',
//         'Microsoft SQL Server',
//         'Cascading Style Sheets (CSS)',
//         'ASP.NET Core',
//         'ASP.NET MVC 5',
//         'Entity Framework',
//         'LINQ',
//         'ADO.NET',
//         'jQuery',
//         'React.js',
//         'Angular',
//         'git',
//         'AJAX',
//         'JIRA',
//         'Solr',
//         'EPiServer CMS',
//         'EPiServer Commerce'
//     ],
//     education: 5,
//     // tslint:disable-next-line:max-line-length
//     image: 'https://media.licdn.com/dms/image/C4E03AQHQPp3axkhdSA/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=NkQL-yaMMRa4WzI22Ks9xrmeTLekzYAjYnhGWD1Nc1Y',
//     connections: 50
// };

// console.log(parser.parseProfileData(data));
