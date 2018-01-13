const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    console.log("update insert name");
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set n save', (done) => {
    console.log("update 1");
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    console.log("update 2");
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('A model class can update', (done) => {
    console.log("update 3");
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    console.log("update 4");
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    console.log("update 5");
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });

  it('A user can have their likes incremented by 10', (done) => {
    console.log("update 6");
    User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});
