'use strict';

module.exports = (app, db) => {
  app.get('/users', (req, res) => {
    db.users.findAll({
      include: [
        {
          model: db.posts,
          include: [
            {
              model: db.comments
            }
          ]
        }
      ]
    }).then(users => {
      res.json(users.map(user => Object.assign({user: user.username}, {posts: user.posts})));
    })
  });

  app.post('/users', (req, res) => {
    let created_at = new Date();
    let newUser = req.body.user;
    db.users.create({
      username: newUser.username,
      role: newUser.role,
      created_at: created_at
    })
    .then(user => {
      res.json(user);
    });
  });

  app.post('/post', (req, res) => {
    let created_at = new Date();
    let newPost = req.body.post;
    db.posts.create({
      user_id: newPost.user_id,
      content: newPost.content,
      created_at: created_at
    })
    .then(post => {
      res.json(post);
    });
  });

  app.post('/comment', (req, res) => {
    let created_at = new Date();
    let newComment = req.body.comment;
    db.comments.create({
      post_id: newComment.post_id,
      content: newComment.content,
      commenter_username: newComment.commenter_username,
      commenter_email: newComment.commenter_email,
      created_at: created_at
    })
      .then(comment => {
        res.json(comment);
      });
  });

};