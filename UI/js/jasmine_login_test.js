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
      expect(myresponse.access).toBeTruthy();
      done();
    })
  });
});

// describe('Signup Page', function () {
//   let fixture_html = "";
//   beforeAll(() => {
//     fixture = setFixtures("");
//     jasmine.getFixtures().clearCache();
//     jasmine.getFixtures().fixturesPath = '../UI';
//     jasmine.getFixtures().load('sign-up.html');
//     fixture_html = $('#form_signup')[0];
//   });

//   it('should display signup form', () => {
//     expect($('#form_signup')[0]).toBeInDOM();
//   });
// });

