describe('Login Page', function () {
  let fixture_html = "";
  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = '../UI';
    jasmine.getFixtures().load('sign-in.html');
    fixture_html = $('#form_login')[0];
  });

  it('should display login form', () => {
    expect($('#form_login')[0]).toBeInDOM();
  });

  it('Should Login User', (done) => {
    fixture = setFixtures(fixture_html);
    $('#username')[0].setAttribute("value", "fred");
    $('#password')[0].setAttribute("value", "Ab243677");
    let login_promise = new Promise((resolve, reject) => {
      login_user();
      window.setTimeout(
        function () {
          resolve(myresponse);
        }, 1000);
    });
    
    login_promise.then((myresponse) => {
      localStorage.setItem('token', myresponse.access);
      localStorage.setItem('user', myresponse.user);
      expect(myresponse.access).toBeTruthy();
      done();
    })
  });
});