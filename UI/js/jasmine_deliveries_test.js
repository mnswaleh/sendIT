describe('Deliveries Page', () => {
    beforeAll(() => {
        jasmine.getFixtures().fixturesPath = '../UI';
        jasmine.getFixtures().load('delivery_orders.html');
    });

    it('should display delivery orders table', () => {
        expect($('#table_body')[0]).toBeInDOM();
    });

    it('Should display delivery orders by logged in user', (done) => {
        let deliveries_promise = new Promise((resolve, reject) => {
            load_deliveries();
            window.setTimeout(() => {
                resolve(myresponse);
            }, 1000);
        });

        deliveries_promise.then((myresponse) => {
            expect(myresponse.Title).toBeTruthy();
            done();
        })
    });

});