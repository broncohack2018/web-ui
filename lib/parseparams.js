/**
 * Converts a string that was serialized with jQuery.param back to the object.
 *
 * @param {String} str
 *
 * @return {Object}
 */
function parseParams(str) {
    var obj = {}, pair;
    var pairs = decodeURIComponent(str).split( "&" );
    var injectParam = function(key, val) {
        var firstBracket = key.indexOf('[');

        if (firstBracket === -1) {
            obj[key] = val;
            return;
        }

        var prevkey = key.substring(0, firstBracket),
            key = key.substr(firstBracket),
            prev = obj,
            newobj,
            newkey;

        key.replace(/\[([^\]]+)?\]/g, function(chunk, idx, pos) {
            var newobj, newkey;
            if (chunk.match(/\[\d*\]/)) {
                newobj = prev[prevkey] || [];
                newkey = idx || '[]';
            } else {
                newobj = prev[prevkey] || {};
                newkey = idx;
            }

            if (prevkey === '[]') {
                prev.push(newobj);
            } else {
                prev[prevkey] = newobj;
            }

            prev = newobj;
            prevkey = newkey;
        });

        if (prevkey === '[]') {
            prev.push(val);
        } else {
            prev[prevkey] = val;
        }
    }

    //if user passes simple string, we return it as an response
    if (pairs.length === 1) {
        return pair[0];
    }

    for( var arg = 0; arg < pairs.length; arg++ ) {
        pair = pairs[ arg ].split( "=" );
        injectParam(pair[0], pair[1]);
    }

    return obj;
}