describe('Admin Page', () => {
    beforeAll(() => {
        jasmine.getFixtures().fixturesPath = '../UI';
        jasmine.getFixtures().load('admin.html');
    });

    it('should display delivery orders table', () => {
        expect($('#table_body')[0]).toBeInDOM();
    });

    it('Should display all delivery orders if admin is logged in', (done) => {
        let deliveries_promise = new Promise((resolve, reject) => {
            admin_deliveries();
            window.setTimeout(() => {
                resolve(myresponse);
            }, 1000);
        });

        deliveries_promise.then((myresponse) => {
            expect(myresponse.Title).toBeFalsy();
            done();
        })
    });

});