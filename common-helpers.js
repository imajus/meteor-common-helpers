import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

import { descendantField, chunk } from './utils.js';

Template.helpers({
	
	log(...rest) {
		console.log(...rest);
	},

	field(object, path) {
		return descendantField(object, path);
	},

	not(val) {
		return !val;
	},
		
	eq(...rest) {
		if ( rest.length < 2 ) return false;
		for ( let i=1; i<rest.length; ++i ) {
			if ( rest[i] != rest[i-1] ) return false;
		}
		return true;
	},
	
	is(...rest) {
		if ( rest.length < 2 ) return false;
		for ( let i=1; i<rest.length; ++i ) {
			if ( rest[i] !== rest[i-1] ) return false;
		}
		return true;
	},
	
	and(...rest) {
		if ( rest && rest.length ) {
			return _.reduce(rest, (memo, item) => memo && item, true);
		}
	},
	
	or(...rest) {
		if ( rest && rest.length ) {
			return _.reduce(rest, (memo, item) => memo || item);
		}
	},
	
	sum(...rest) {
		if ( rest && rest.length ) {
			let memo = rest[0];
			for ( let i=1; i<rest.length; ++i ) {
				memo += rest[i];
			}
			return memo;
		}
	},
	
	positive(...rest) {
		if ( rest && rest.length ) {
			return !_.some(rest, item => !(item > 0));
		}
	},

  negative(...rest) {
		if ( rest && rest.length ) {
			return !_.some(rest, item => !(item < 0));
		}
  },

	// e.g., {{gt 10 20 comp=5}}
	gt(...rest) {
		if ( rest && rest.length > 1 ) {
			const { comp } = rest.pop();
			return !_.some(rest, item => !(item > comp));
		}
	},

	// e.g., {{gte 10 20 comp=5}}
	gte(...rest) {
		if ( rest && rest.length > 1 ) {
			const { comp } = rest.pop();
			return !_.some(rest, item => !(item >= comp));
		}
	},

	// e.g., {{gt 10 20 comp=5}}
	lt(...rest) {
		if ( rest && rest.length > 1 ) {
			const { comp } = rest.pop();
			return !_.some(rest, item => !(item < comp));
		}
	},

	// e.g., {{gt 10 20 comp=5}}
	lte(...rest) {
		if ( rest && rest.length > 1 ) {
			const { comp } = rest.pop();
			return !_.some(rest, item => !(item <= comp));
		}
	},
	
	nullOrUndefined(...rest) {
		if ( rest && rest.length ) {
			return !_.some(rest, item => !_.isNull(item) && !_.isUndefined(item));
		}
	},
	
  // {{when loaded 'loaded' 'loading'}}
  // …or {{when loaded 'loaded'}}
	// …or {{when loaded no='loading'}}
	// …or {{when loaded ready subsReady yes='ready' no='loading'}}
	// …or {{when loaded ready subsReady yes='ready'}}
	// …or {{when loaded ready subsReady no='loading'}}
	when(...rest) {
		if ( rest && rest.length > 1 ) {
			if ( _.isObject(rest[rest.length-1]) ) {
				const { yes, no } = rest[rest.length-1];
				return _.some(rest, item => !item) ? no : yes;
			} else {
				return rest[0] ? rest[1] : (rest.length > 2 ? rest[2] : undefined);
			}
		}
	},
	
	chunk(array, size) {
		if ( array && size ) {
			return chunk(array, size);
		}
	}
	
});