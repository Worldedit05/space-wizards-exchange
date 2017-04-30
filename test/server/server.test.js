const exec = require('mz/child_process').exec;
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../server/app');

// TODO: import modules with ES5 syntax

chai.use(chaiHttp);

/* eslint func-names: ["error", "never"] */
describe('builds application', () => {
  it('builds to "build" directory', function () {
    this.timeout(0);

    return exec('npm run build');
  });
});

describe('express serving', () => {
  it('respond to / with the index.html', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.contain('<div id="root"></div>');
        done();
      });
  });

  it('respnds to any route with the index.html', (done) => {
    chai.request(app)
      .get('/foo/bar')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.contain('<div id="root"></div>');
        done();
      });
  });

  it('responds to favicon.icon request', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', 'image/x-icon');
        done();
      });
  });
});
