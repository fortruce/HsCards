import { MongoClient } from 'mongodb';

let _db = null;

const db = {
  connect: function(url, done) {
    if (_db) return done();

    MongoClient.connect(url, function(err, db) {
      if (err) return done(err);

      _db = db;
      done();
    });
  },

  get: function() {
    return _db;
  },

  close: function() {
    if (_db) {
      _db.close(function(err, result) {
        _db = null;
        done(err);
      });
    }
  }
};

export default db