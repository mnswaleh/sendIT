describe('Signup Page', function () {
    let fixture_html = "";
    beforeAll(() => {
      jasmine.getFixtures().fixturesPath = '../UI';
      jasmine.getFixtures().load('sign-up.html');
      fixture_html = $('#form_signup')[0];
    });
  
    it('should display login form', () => {
      expect($('#form_signup')[0]).toBeInDOM();
    });
  
    it('Should display error message when input is blank', (done) => {
      fixture = setFixtures(fixture_html);
      
      let signup_promise = new Promise((resolve, reject) => {
        signup_user();
        window.setTimeout(
          function () {
            resolve(myresponse);
          }, 1000);
      });
      
      signup_promise.then((myresponse) => {
        expect(myresponse.ERROR).toEqual("username is missing")
        done();
      });
    });
  });
  
  