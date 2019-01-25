describe('Create Order Page', () => {
    let fixture_html = "";
    beforeAll(() => {
      jasmine.getFixtures().fixturesPath = '../UI';
      jasmine.getFixtures().load('create_delivery_order.html');
      fixture_html = $('#form_createDelivery')[0];
    });
  
    it('should display cretae delivery form', () => {
      expect($('#form_createDelivery')[0]).toBeInDOM();
    });
  
    it('Should display error message when input is blank', (done) => {
      fixture = setFixtures(fixture_html);
  
      let signup_promise = new Promise((resolve, reject) => {
        create_order();
        window.setTimeout(() => {
          resolve(myresponse);
        }, 1000);
      });
  
      signup_promise.then((myresponse) => {
        expect(myresponse.Error).toEqual("Weight should be decimal number")
        done();
      });
    });
  });
  
  