const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const expect = require('chai').expect;

const app = require('../server/app');

/* eslint func-names: ["error", "never"] */
describe('builds application', () => {
  it('builds to "build" directory', function () {
    this.timeout(0);

    return exec('npm run build');
  });
});

describe('express serving', () => {
  it('respond to / with the index.html', () => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .then((res) => expect(res.text).to.contain('<div id="root"></div>'));
  });

  it('responds to favicon.icon request', () => {
    request(app)
      .get('/favicon.ico')
      .expect('Content-Type', 'image/x-icon')
      .expect(200);
  });

  it('respnds to any route with the index.html', () => {
    request(app)
      .get('/foo/bar')
      .expect('Content-Type', /html/)
      .expect(200)
      .then((res) => expect(res.text).to.contain('<div id="root"></div>'));
  });
});
