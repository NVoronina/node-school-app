/**
 * Created by Natalia on 12.10.2017.
 */
const cardsModel = require('../models/cardsModel');

test('get card list', async () => {
	const model = new cardsModel();
	const data = await model.getList();
	const info = [
		{}
	];
	expect(data).toBe(info);
});