describe('Update Order Page', () => {
    let fixture_html = "";
    beforeAll(() => {
      jasmine.getFixtures().fixturesPath = '../UI';
      jasmine.getFixtures().load('update_order.html');
      fixture_html = $('#form_update')[0];
    });
  
    it('should display update order form', () => {
      expect($('#form_update')[0]).toBeInDOM();
    });
  
    it('Should update current location where applicable', (done) => {
      fixture = setFixtures(fixture_html);
      let request_url = SERVER + 'parcels/1/';
      let current_promise = new Promise((resolve, reject) => {
        update_order(request_url);
        window.setTimeout(() => {
          resolve(myresponse);
        }, 2020);
      });
  
      current_promise.then((myresponse) => {
        expect(myresponse.ERROR).toBeTruthy();
        done();
      });
    });
  });
  
  