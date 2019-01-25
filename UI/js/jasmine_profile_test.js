describe('View Profile Page', () => {
    let fixture_html = "";
    beforeAll(() => {
        jasmine.getFixtures().fixturesPath = '../UI';
        jasmine.getFixtures().load('user_profile.html');
        fixture_html = $('#user_table')[0];
    });

    it('should display change destination form', () => {
        expect($('#user_name')[0]).toBeInDOM();
    });

    it('Should fetch total number of orders by user', (done) => {
        fixture = setFixtures(fixture_html);
        let total_promise = new Promise((resolve, reject) => {
            get_total();
            window.setTimeout(() => {
                resolve(myresponse);
            }, 1200);
        });

        total_promise.then((myresponse) => {
            expect($('#total_orders').text()).not.toEqual("Could not fetch")
            done();
        });
    });

    it('Should fetch number of orders delivered for user', (done) => {
        fixture = setFixtures(fixture_html);
        let delivered_promise = new Promise((resolve, reject) => {
            get_delivered();
            window.setTimeout(() => {
                resolve(myresponse);
            }, 1200);
        });

        delivered_promise.then((myresponse) => {
            expect($('#delivered').text()).not.toEqual("Could not fetch")
            done();
        });
    });

    it('Should fetch number of orders in transit for user', (done) => {
        fixture = setFixtures(fixture_html);
        let transit_promise = new Promise((resolve, reject) => {
            get_inTransit();
            window.setTimeout(() => {
                resolve(myresponse);
            }, 1200);
        });

        transit_promise.then((myresponse) => {
            expect($('#delivered').text()).not.toEqual("Could not fetch")
            done();
        });
    });
});

