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