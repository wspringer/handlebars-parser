module.exports = function () {
	var self = this;

	/**
	 *
	 * @param {Handlebars.AST.Node} node
	 * @returns {Array}
	 */
	this.getPaths = function (node) {
		var result = [];

		switch (node.type) {
			// E.g. "date" / "debtor.debtorNumber"
			case 'ID':
				// ../title?
				if (node.parts.length === 1 && node.original && node.original.substr(0, 3) === '../') {
					result.push(node.original);
					break;
				}

				result.push(node.parts.join('.'));
				break;

			// E.g. root node
			case 'program':
				node.statements.forEach(function (statement) {
					self.getPaths(statement).forEach(function (variable) {
						result.push(variable);
					});
				});
				break;

			// E.g. #each / #if / #compare / "#invoiceItems" / "#ifIsCredit"
			case 'block':
				var blockKeys = self.getPaths(node.mustache);

				if ((!node.mustache.isHelper || node.mustache.id.string === 'each') && node.program) {
					self.getPaths(node.program).forEach(function (subValue) {
						// e.g. ../title
						if (subValue.substr(0, 3) === '../') {
							result.push(subValue.substr(3));
							return;
						}

						result.push(blockKeys[0] + '.#.' + subValue);
					});
					break;
				}

				result = blockKeys;

				if (node.program) {
					self.getPaths(node.program).forEach(function (variable) {
						result.push(variable);
					});
				}
				break;

			// E.g. "{{#compare person.gender 'M'}}"
			case 'mustache':
				if (!node.isHelper) {
					self.getPaths(node.id).forEach(function (variable) {
						result.push(variable);
					});
					break;
				}

				node.params.forEach(function (param) {
					self.getPaths(param).forEach(function (variable) {
						result.push(variable);
					});
				});
				break;
		}

		return result;
	};
};