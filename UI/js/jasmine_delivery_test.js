describe('Change destination Page', () => {
    let fixture_html = "";
    beforeAll(() => {
      jasmine.getFixtures().fixturesPath = '../UI';
      jasmine.getFixtures().load('change_delivery.html');
      fixture_html = $('#form_changeDelivery')[0];
    });
  
    it('should display change destination form', () => {
      expect($('#form_changeDelivery')[0]).toBeInDOM();
    });
  
    it('Should change destination where applicable', (done) => {
      fixture = setFixtures(fixture_html);
      let request_url = SERVER + 'parcels/1/destination';
      let signup_promise = new Promise((resolve, reject) => {
        change_delivery(request_url);
        window.setTimeout(() => {
          resolve(myresponse);
        }, 2020);
      });
  
      signup_promise.then((myresponse) => {
        expect(myresponse.message).toEqual("This Order is already delivered")
        done();
      });
    });
  });
  
  