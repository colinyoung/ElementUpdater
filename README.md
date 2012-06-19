ElementUpdater
==============

Updates elements on a page. Nice for updating values retrieved with ajax.

## Usage

```html
<p>You have <span data-update-id="twitter" data-update-key="followers">150</span> followers.</p>
```

```javascript

var data = {
  followers: 200
};

var updater = new ElementUpdater('twitter').update(data);
  
```

