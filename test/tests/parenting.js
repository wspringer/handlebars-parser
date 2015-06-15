/*global it: false, describe: false, require: false */

var HandlebarsParser = require('../../index.js');
var Handlebars = require('handlebars');
var parser = new HandlebarsParser();

describe('Tool', function () {
	describe('#getPaths() - getting values from parent', function () {
		it('should work with "../title"', function (done) {
			var template = Handlebars.parse("{{#each person}}{{#each position}}{{title}}{{../title}}{{/each}}{{/each}}");
			var expectedResults = ['person.#.position.#.title', 'person.#.title'];

			if (JSON.stringify(parser.getPaths(template)) !== JSON.stringify(expectedResults)) {
				throw new Error('Not all values are exactly the same!');
			}
			done();
		});

		it('should work with "../../title"', function (done) {
			var template = Handlebars.parse("{{#each person}}{{#each position}}{{#each addresses}}{{title}}" +
				"{{../title}}{{../../title}}{{/each}}{{/each}}{{/each}}");
			var expectedResults = ['person.#.position.#.addresses.#.title', 'person.#.position.#.title',
				'person.#.title'];

			if (JSON.stringify(parser.getPaths(template)) !== JSON.stringify(expectedResults)) {
				throw new Error('Not all values are exactly the same!');
			}
			done();
		});
	});
});
