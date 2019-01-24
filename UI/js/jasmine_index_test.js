describe('Index Page', () => {
  beforeAll(() => {
    jasmine.getFixtures().fixturesPath = '../UI';
    jasmine.getFixtures().load('index.html');
  });

  it('should display Welcome message', () => {
    expect($('#welcome_message')[0]).toBeInDOM();
  });
});

