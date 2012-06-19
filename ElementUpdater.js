/*
  ElementUpdater
  Colin Young
  June 2012
*/
var ElementUpdater = function(updateID) {
  this.updateID = updateID;
  this.selector = '*[data-update-id="' + this.updateID + '"]';
};

ElementUpdater.prototype = {
  update: function(data) {
    var _this = this;
    // Loops over all elements matching the custom selector
    $.each($(this.selector), function(i, el) {
      // The key is also set on the object with the following data- HTML attribute;
      var key = $(el).attr('data-update-key');
      if (!key) return;
      
      // The value (what the element's new text will be) should be present in the data hash
      var value = _this.get(data, key);
      if (typeof value == "undefined" || value == null) return;
      
      $(el)
      .text(value + "")            // Replace the text with the new value
      .addClass('updated');   // Add an updated class so that we can highlight.
    });
  },
  // Recursively finds stuff matching the data-update-key.
  //
  // I'm not particularly proud of this method...
  //
  // Format is a lot like jQuery:
  // people[name='Joe'] will find the object in the people array with a 'name' of 'Joe
  // people[name="Joe"].phone_numbers[type="Work"] works too
  //
  // Or, you can keep it simple and just do people[joe] or people.joe (if it's an array, not an object).
  get: function(data, key) {
    if (typeof key == "undefined" || key == null) {
      return data;
    }
    var selectors = key.split('.');
    var top = selectors[0];
    var next = "";
    // We examine the top selector, and store the following ones in the next variable.
    for (var i = 1; i < selectors.length; i++) {
      next += selectors[i];
      if (i < selectors.length - 1) next += ".";
    }
    
    // Look at the array subscript
    if (key.indexOf('[') > -1) {
      var kv_pair = key.split('[');
      var object = kv_pair[0];
      var bracket = kv_pair[1];
      bracket = bracket.substr(0, bracket.indexOf(']')); // Make sure the subscript stops at the closing bracket
      if (bracket.indexOf('=') == -1) {
        return data[key]; // Return data's key value since there's no =
      } else {
        var kv_pair2 = bracket.split('='); // Select the attribute
        var attr = kv_pair2[0];
        var match = kv_pair2[1];
        var results = $.grep(data[object], function(e) { // Match it with jQuery.grep
          var new_match = match.replace(/(^\'|^"|"$|\'$)/g, ''); // Remove all leading and trailing ' and " characters
          return e[attr] == new_match;
        });
        if (typeof results[0] == "undefined") return null;
        // Recur, looking at the new path.
        return this.get(results[0], next);
      }
    } else {
      return data[key];
    }
  }
};

/* Export to commonJS */
if (typeof exports !== "undefined") {
  exports.ElementUpdater = ElementUpdater;
}