ElementUpdater
==============

Updates elements on a page. Nice for updating values retrieved with ajax.

## Usage

You have **150** followers.

```html
<p>You have <span data-update-id="twitter" data-update-key="followers">150</span> followers.</p>
```

```javascript

var data = {
  followers: 200
};

var updater = new ElementUpdater('twitter').update(data);
  
```

Will result in:

You have **200** followers.

```html
<p>You have <span data-update-id="twitter" data-update-key="followers">200</span> followers.</p>
```

## Advanced Usage

`ElementUpdater` supports advanced finders, inspired by JSONQuery but more logically suited and simplified for this purpose. It's easy to learn, don't worry.

The format of your `data-update-key` attributes can be a lot like jQuery:

- `people[name='Joe']` will find the object in the people array with a 'name' of 'Joe
- `people[name="Joe"].phone_numbers[type="Work"]` works too
- Or, you can keep it simple and just do `people[joe]` or `people.joe`.

```html
<p>Joe's mother's name is <span data-update-id="joe" data-update-key="mothers[child='Joe'].name"></span></p>
```

```javascript
var data = {
  mothers: [{
    child: 'Joe',
    name: 'Barbara'
  }]
};

var updater = new ElementUpdater('joe').update(data);
```

Joe's mother's name is **Barbara**.

```html
<p>Joe's mother's name is <span data-update-id="joe" data-update-key="mothers[child='Joe'].name">Barbara</span></p>
```

## Usage with AJAX

```javascript
$.getJSON('http://example.com/data.json', function(data) {
  // data = {cubs: 1, red_sox: 0}
  new ElementUpdater('game-score').update(data);
});
```

```html
<ul id="game-score">
  <li>CHC: <span data-update-id="game-score" data-update-key="cubs">0</li>
  <li>BOS: <span data-update-id="game-score" data-update-key="red_sox">0</li>
</ul>
```
