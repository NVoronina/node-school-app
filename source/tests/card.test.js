/**
 * Created by Natalia on 12.10.2017.
 */
const cardsModel = require('../models/cardsModel');

test('getList in cardsModel return json list', async () => {
	let model = new cardsModel();
	let cards = require('../data/cards.json');
	//console.log(info);
	expect(await model.getList()).toEqual(cards);
});
test('getOne in cardsModel return json one Card', async () => {
	let model = new cardsModel();
	let check = {
			"id": 1,
			"cardNumber": "546925000000000",
			"balance": 231207
		};
	//console.log(info);
	expect(await model.getOne(1)).toEqual(check);
});

test('addOne in cardsModel add json one Card and return true', () => {
	let model = new cardsModel();

	let check = {
		"id": 1000,
		"cardNumber": "546925000000000",
		"balance": 231207
	};
	//console.log(info);
	expect(model.addOne(check)).toBeTruthy();
});

test('updateBalance in cardsModel return json one Card', async () => {
	let model = new cardsModel();
	let check = {
		"id": 1000,
		"cardNumber": "546925000000000",
		"balance": 231000
	};
	//console.log(info);
	expect(await model.updateBalance(1000, 207)).toEqual(check);
});

test('deleteOne in cardsModel return json one Card', () => {
	let model = new cardsModel();
	//console.log(info);
	expect(model.deleteOne(1000)).toBeTruthy();
});