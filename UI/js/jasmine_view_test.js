describe('View order Page', () => {
    beforeAll(() => {
        jasmine.getFixtures().fixturesPath = '../UI';
        jasmine.getFixtures().load('view_order.html');
    });

    it('should display order details', () => {
        expect($('#pcl_no')[0]).toBeInDOM();
    });

    it('Should display delivery orders by logged in user', (done) => {
        let order_promise = new Promise((resolve, reject) => {
            request = new Request(SERVER + 'parcels/1', myGet);
            load_order();
            window.setTimeout(() => {
                resolve(myresponse);
            }, 1000);
        });

        order_promise.then((myresponse) => {
            expect(myresponse.message).toBeFalsy();
            expect(myresponse.ERROR).toBeFalsy();
            done();
        })
    });

    it('Should cancel delivery order where applicable', (done) => {
        let order_promise = new Promise((resolve, reject) => {
            let myPost = {
                method: 'PUT',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default'
            };
        
            let request = new Request(SERVER + 'parcels/1/cancel', myPost);
            cancel_order(request);
            window.setTimeout(() => {
                resolve(myresponse);
            }, 1000);
        });

        order_promise.then((myresponse) => {
            expect(myresponse.message).toEqual("This Order is already delivered");
            done();
        })
    });

});