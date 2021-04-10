import { browser, element, by, logging } from 'protractor';

describe('workspace-project App', () => {

  it('should display toolbar', async () => {
    await browser.get(browser.baseUrl);
    expect(await element(by.css('mat-toolbar')).isPresent()).toBeTruthy();
  });

  it('should display .page-not-found element on non-existing page"', async () => {
    await browser.get('/12345');
    expect(await element(by.css('.page-not-found')).isPresent()).toBeTruthy();
  });

  it('should display .page element on existing page"', async () => {
    await browser.get('/education');
    expect(await element(by.css('.page')).isPresent()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
