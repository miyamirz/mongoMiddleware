const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    console.log("it1")
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        console.log(user);

        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    console.log("it2")

    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        //  console.log(user);
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        console.log("saved");
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
      const joe = new User({
        name: 'Joe',
        posts: [{ title: 'New Title king' }]
      });

      joe.save()
          //.then(() => { done(); } );
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
          console.log(user);
          const post=user.posts[0];
          user.posts.remove(post);
          return user.save();
        })
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
          assert(user.posts.length === 0);
          done();
        });
    });



});
