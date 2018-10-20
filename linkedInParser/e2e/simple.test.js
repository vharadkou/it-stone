const { browser, by } = require('protractor');
const { writeFileSync } = require('fs');

describe('Visit base url', function () {
    browser.waitForAngularEnabled(false);

    browser.driver.manage().window().maximize();
    it('title shout be true', async () => {
        await browser.get(browser.baseUrl);
        await browser.switchTo().frame(0);

        const elem = await browser.findElement(by.css('.sign-in-link'));
        await elem.click();

        const { email, password } = browser.params.login;
        const { username } = browser.params.search

        await (await browser.findElement(by.css('#session_key-login'))).sendKeys(email);
        await (await browser.findElement(by.css('#session_password-login'))).sendKeys(password);
        await (await browser.findElement(by.css('input[type="submit"]'))).click();
        await browser.sleep(5500);

        const searchElem = await browser.findElement(by.css('input[role="combobox"]'))

        await searchElem.click();

        await searchElem.sendKeys(username);

        await browser.sleep(4500);

        const searchTypeAhead = 'search-typeahead-v2__hit'
        const firstFindElem = await browser.findElement(by.css(`.${searchTypeAhead}.${searchTypeAhead}--profile-entity`));

        firstFindElem.click();

        await browser.sleep(5500);

        // parsing data

        const fullName = await (await browser.findElement(by.css('.pv-top-card-section__name'))).getText();

        const position = await (await browser.findElement(by.css('.pv-top-card-section__headline'))).getText();

        const connectionsText = await (await browser.findElement(by.css('.pv-top-card-v2-section__connections'))).getText();

        const seeConnectionsIndex = connectionsText.indexOf('See connections');

        let connections = 0;

        if (seeConnectionsIndex > -1) {
            const skobkaIndex = connectionsText.indexOf('(');
            connections = parseInt(connectionsText.slice(skobkaIndex + 1, connectionsText.length - 1));
        } else {
            connections = parseInt(connectionsText);
        }

        let image = '';

        try {
            const inlineStyleImage = await (await browser.findElement(by.css('.pv-top-card-section__photo'))).getAttribute('style');

            const httpStart = inlineStyleImage.indexOf('http');
            const imageEnd = inlineStyleImage.length - 3;
            image = inlineStyleImage.slice(httpStart, imageEnd);
        } catch (err) {
            image = '';
        }

        // const experienceElems = await (await browser.findElements(by.css('.pv-profile-section__card-item-v2')));
        // const lastExperienceEl = experienceElems[0];

        // const lastExperienceCompanyName = await (await lastExperienceEl.findElement(by.css('.pv-entity__secondary-title'))).getText();
        // const lastExperienceCompanyTitle = await (await lastExperienceEl.findElement(by.css('h3'))).getText();
        // const lastExperienceCompanyLogoUrl = await (await lastExperienceEl.findElement(by.css('.pv-entity__logo-img'))).getAttribute('src');

        // const yearsElem = await lastExperienceEl.findElement(by.css('.pv-entity__bullet-item-v2'));

        // browser.actions().mouseMove(yearsElem).perform();

        // const lastExperienceCompanyDuration = await yearsElem.getText();

        await browser.sleep(3000);
        // console.dir(lastExperienceCompanyDuration);
        // expandButton



        const skillsHeaderElem = await browser.findElement(by.xpath('//h2[text()="Experience"]'));

        await browser.sleep(1000);

        await browser.executeScript("arguments[0].scrollIntoView();", skillsHeaderElem);

        await browser.sleep(3000);

        const expands = await browser.findElements(by.css('.pv-profile-section__card-action-bar'));

        // await browser.actions().mouseMove(expands[expands.length - 1]).perform();

        await expands[expands.length - 1].click();

        // await Promise.all(expands.map(async expand => await expand.click()));

        // await (await browser.findElement(by.css('.pv-profile-section__card-action-bar'))).click();
        // tools and technologies
        await browser.sleep(3 * 1000);

        const categoryList = await browser.findElement(by.css('.pv-skill-categories-section__expanded'));
        // let category;

        const skillsElem = await browser.findElements(by.css('.pv-skill-category-entity__name'));

        const skills = await Promise.all(skillsElem.map(async skill => skill.getText())) || [];

        // const toolsHeader = await categoryList.findElement(by.xpath('//h3[text()="Tools & Technologies"]')); // заменить на англ
        // const toolsEls = await (await toolsHeader.findElement(by.xpath('..'))).findElements(by.css('.pv-skill-category-entity__name'));
        // const texts = await Promise.all(toolsEls.map(async tool => tool.getText())) || [];

        //education experience
        const educationEls = await browser.findElements(by.css('.pv-education-entity'));
        let globalEducation = 0;
        await Promise.all(educationEls.map(async el => {
            const timeEls = await el.findElements(by.css('time'));
            const time = await Promise.all(timeEls.map(async t => t.getText())) || [];
            const calcTime = time.reduce((prev, next) => Math.abs(prev - next));
            globalEducation += calcTime;
        }));

        console.dir(`calc Time: ${globalEducation}`);

        const exportJson = {
            name: fullName,
            currentPosition: position,
            // currentCompanyName: lastExperienceCompanyName,
            // currentCompanyTitle: lastExperienceCompanyTitle,
            // currentCompanyLogoUrl: lastExperienceCompanyLogoUrl,
            // currentCompanyExperience: lastExperienceCompanyDuration,
            skills: skills,
            education: globalEducation,
            image: image,
            connections: connections,
        };

        writeFileSync(`./${fullName}.json`, JSON.stringify(exportJson), { encoding: 'utf-8' });
    }, 5 * 60 * 1000);
}, 6 * 60 * 1000);
