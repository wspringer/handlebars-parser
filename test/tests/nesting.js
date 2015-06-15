/*global it: false, describe: false, require: false */

var HandlebarsParser = require('../../index.js');
var Handlebars = require('handlebars');
var parser = new HandlebarsParser();

describe('Tool', function () {
	describe('#getPaths() - nested value', function () {
		it('should work with one layer', function (done) {
			var template = Handlebars.parse("{{date}}{{#each debtor}}{{debtorNumber}}{{/each}}");
			var expectedResults = ['date', 'debtor.#.debtorNumber'];

			if (JSON.stringify(parser.getPaths(template)) !== JSON.stringify(expectedResults)) {
				throw new Error('Not all values are exactly the same!');
			}
			done();
		});

		it('should work with two layers', function (done) {
			var template = Handlebars.parse("{{title}}{{#each person}}{{firstName}}{{#each position}}{{companyId}}" +
				"{{/each}}{{lastName}}{{/each}}");
			var expectedResults = ['title', 'person.#.firstName', 'person.#.position.#.companyId', 'person.#.lastName'];

			if (JSON.stringify(parser.getPaths(template)) !== JSON.stringify(expectedResults)) {
				throw new Error('Not all values are exactly the same!');
			}
			done();
		});
	});
});
