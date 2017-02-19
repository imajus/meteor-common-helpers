export const chunk = function(data, n) {
	var chunks = [];
	while ( data.length ) {
		chunks.push(data.splice(0, n));
	}
	return chunks;
}

export const descendantField = (object, path) => {
	path = path.split('.');
	for ( i = 0; i < path.length; ++i ) {
		if ( object ) object = object[path[i]];
	}
	return object;
}