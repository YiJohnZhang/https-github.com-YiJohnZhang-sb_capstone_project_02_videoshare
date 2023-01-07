const checkArrayEquality = require('../helpers/arrayEqualityHelper');

const arrayA = [1, 2, 3, 4];
const arrayA_T = [1, 3, 2, 4];
const arrayA_F1 = [1, 2, 3];
const arrayA_F2 = [1, 2, 3, 5];

const arrayB = ["testuser1", "testuser2", "testuser3", "testuser4"];
const arrayB_T = ["testuser1", "testuser3", "testuser2", "testuser4"];
const arrayB_F1 = ["testuser1", "testuser2", "testuser3"];
const arrayB_F2 = ["testuser1", "testuser2", "testuser3", "testuser5"];

describe('checkArrayEquality, \`arrayA\`', () => {

	test('\`arrayA\`, works', () => {

		expect(checkArrayEquality(arrayA, arrayA_T)).toEqual(true);

	});

	test('\`arrayA\`, fail (length)', () => {

		expect(checkArrayEquality(arrayA, arrayA_F1)).toEqual(false);

	});

	test('\`arrayA\`, fail (members)', () => {

		expect(checkArrayEquality(arrayA, arrayA_F2)).toEqual(false);

	});

});


describe('checkArrayEquality, \`arrayB\`', () => {

	test('\`arrayB\`, works', () => {

		expect(checkArrayEquality(arrayB, arrayB_T)).toEqual(true);

	});

	test('\`arrayB\`, fail (length)', () => {

		expect(checkArrayEquality(arrayB, arrayB_F1)).toEqual(false);

	});

	test('\`arrayB\`, fail (members)', () => {

		expect(checkArrayEquality(arrayB, arrayB_F2)).toEqual(false);

	});

});