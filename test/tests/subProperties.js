/*global it: false, describe: false, require: false */

var HandlebarsParser = require('../../index.js');
var Handlebars = require('handlebars');
var parser = new HandlebarsParser();

describe('Tool', function () {
	describe('#getPaths() - subProperty', function () {
		it('should work', function (done) {
			var template = Handlebars.parse('{{title}}{{person.title}}');
			var expectedResults = ['title', 'person.title'];

			if (JSON.stringify(parser.getPaths(template)) !== JSON.stringify(expectedResults)) {
				throw new Error('Not all values are exactly the same!');
			}
			done();
		});

		it('should work with nesting', function (done) {
			var template = Handlebars.parse('{{title}}{{#each person}}{{address.street}}{{/each}}');
			var expectedResults = ['title', 'person.#.address.street'];

			if (JSON.stringify(parser.getPaths(template)) !== JSON.stringify(expectedResults)) {
				throw new Error('Not all values are exactly the same!');
			}
			done();
		});
	});
});