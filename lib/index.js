var debug = require('debug')('metalsmith-filetype-marker');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to mark files with some piece of front matter.
 *
 * @param {Object} options (optional)
 *   @property {Object} markers
 * @return {Function}
 */

function plugin(options){
  options = options || {};
  var markers = options.markers || {};

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      var data = files[file];

      Object.keys(markers).forEach(function(attribute) {
          if (!data[attribute] &&
                  data[attribute] !== false &&
                  markers[attribute].test(file)) {
            data[attribute] = true;
          }
      });
    });
  };
}
