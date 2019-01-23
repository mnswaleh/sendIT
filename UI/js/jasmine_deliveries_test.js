describe('Login Page', function () {
    beforeAll(() => {
        jasmine.getFixtures().fixturesPath = '../UI';
        jasmine.getFixtures().load('delivery_orders.html');
    });

    it('should display delivery orders table', () => {
        expect($('#table_body')[0]).toBeInDOM();
    });

    it('Should display delivery orders by logged in user', (done) => {
        let login_promise = new Promise((resolve, reject) => {
            load_deliveries();
            window.setTimeout(
                function () {
                    resolve(myresponse);
                }, 1000);
        });

        login_promise.then((myresponse) => {
            expect(myresponse.Title).toBeTruthy();
            done();
        })
    });
    
});