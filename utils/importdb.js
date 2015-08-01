var fs = require('fs');
var assign = require('object-assign');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var data = JSON.parse(fs.readFileSync('allsets.json').toString());

data = Object.keys(data).map(function(set) {
  return data[set].map(function(card) {
    return assign({}, card, {set: set});
  });
}).reduce(function(acc, setCards) {
  return acc.concat(setCards);
}, []);

function camelCase(s) {
  var capitalize = function(word) {
    return [].map.call(word, function(letter, i) {
      return i === 0 ? letter.toUpperCase() : letter.toLowerCase();
    }).join('');
  };

  return s.split(' ')
          .map(function(word, i) {
            return i === 0 ? word.toLowerCase() : capitalize(word);
          })
          .join('');
}

data = data.map(function(card) {
  return assign({}, card, { type: camelCase(card.type) });
});

MongoClient.connect('mongodb://localhost/hscards', function(err, db) {
  assert.equal(null, err);
  console.log('connected to db');

  var col = db.collection('cards');
  col.createIndex({ id: 1 }, { unique: true });

  var total = data.length;

  for (var i = 0; i < data.length; i+=1000) {
    col.insert(data.slice(i, i+1000), function(err, cards) {
      assert.equal(null, err);
      console.log(cards.result.n, 'added');
      total -= cards.result.n;
      if (!total)
        db.close();
    });
  }
});
