const {Duplex} = require('stream');

class streamController extends Duplex{
	constructor(options) {
		super(options);
		this.queue = [];
	}

	_write(chunk, encoding, callback) {
		this.queue.push(Buffer.concat([
			new Buffer(""), chunk, new Buffer("\n")]));
		callback();
	}

	_read(size) {
		this.push(this.queue.shift());
	}
}



module.exports = streamController;
