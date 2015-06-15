/*global it: false, describe: false, require: false */

var fs = require('fs');
var HandlebarsParser = require('../../index.js');
var Handlebars = require('handlebars');
var parser = new HandlebarsParser();

var expectedResults = [
	'records.#.title',
	'records.#.sessions.#.title',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.status',
	'records.#.sessions.#.participants.#.person._title',
	'records.#.sessions.#.participants.#.registeredDate',
	'records.#.sessions.#.participants.#.person.firstName',
	'records.#.sessions.#.participants.#.person.initials',
	'records.#.sessions.#.participants.#.person.middleName',
	'records.#.sessions.#.participants.#.person.lastName',
	'records.#.sessions.#.participants.#.person.gender',
	'records.#.sessions.#.participants.#.person.emailAddresses.0.emailAddress',
	'records.#.sessions.#.participants.#.person.gender',
	'records.#.sessions.#.participants.#.person._title',
	'records.#.sessions.#.participants.#.person.firstName',
	'records.#.sessions.#.participants.#.person.middleName',
	'records.#.sessions.#.participants.#.person.middleName',
	'records.#.sessions.#.participants.#.person.lastName',
	'records.#.sessions.#.participants.#.person.lastName',
	'records.#.sessions.#.participants.#.person.initials',
	'records.#.sessions.#.participants.#.person.middleName',
	'records.#.sessions.#.participants.#.person.positions.0.company.title',
	'records.#.sessions.#.participants.#.person.addresses.0.countryCode'
];



describe('Tool', function () {
	describe('#getPaths() - participant.csv', function () {
		it('should work', function (done) {
			var template = Handlebars.parse(fs.readFileSync(__dirname + '/../files/participant.csv', 'utf-8'));

			if (JSON.stringify(parser.getPaths(template)) !== JSON.stringify(expectedResults)) {
				throw new Error('Not all values are exactly the same!');
			}
			done();
		});
	});
});
