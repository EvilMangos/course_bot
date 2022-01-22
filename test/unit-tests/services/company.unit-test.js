const Company = require('../../../src/services/company/index');

describe('getInfoAboutUs', () => {
    it('success', async () => {
        const company = new Company();
        const info = await company.getInfoAboutUs();
        expect(info).toBe(`Info about us`);
    })
})

describe('getContacts', () => {
    it('success', async () => {
        const company = new Company();
        const info = await company.getContacts();

        expect(info).toBe(`Contacts`);
    })
})

describe('getPrice', () => {
    it('success', async () => {
        const company = new Company();
        const info = await company.getPrice();
        expect(info).toBe(`Price list`);
    })
})
