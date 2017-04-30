import chai from 'chai';
import User from '../../server/models/user';

const should = chai.should();

const user = new User();
let error;

describe('user model validation', () => {
  it('returns no error with a valid email', (done) => {
    user.email = 'test@email.com';
    error = user.validateSync();
    should.not.exist(error.errors.email);
    done();
  });
  it('returns an error with an invalid email', (done) => {
    user.email = 'testemail.com';
    error = user.validateSync();
    should.exist(error.errors.email);
    done();
  });
  it('saves a lowercase email address', (done) => {
    user.email = 'TEST@EMAIL.COM';
    user.email.should.be.equal('test@email.com');
    done();
  });
});
