/**
 * Created by Natalia on 27.09.2017.
 */
const path = require('path');
const fs = require('fs');
const logger = require('./../../libs/logger.js')('wallet-app');

class cardsModel {
    constructor(){
        this.fileDir = path.join(__dirname, '..', '..',  'source/data', 'cards.json');
        this.jsonFile = false;
    }
    async loadFile(){
        if(this.jsonFile === false) {
            this.jsonFile = await new Promise((resolve, reject) => {
                fs.readFile(this.fileDir, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(JSON.parse(data));
                })
            });
        }
        return this.jsonFile;
    }
    async getList(){
        await this.loadFile();
        return this.jsonFile;
    }
	async getOne(cardId){
		await this.loadFile();
		for(let card of this.jsonFile){
			if(Number(card.id) === Number(cardId)){
				const data = card;
				return data;
			}
		}
		return false;
	}
    async addOne(data){
        if(this.jsonFile === false) {
            await this.loadFile();
        }
        this.jsonFile.push(data);
	    try {
		    await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile),(err) => {
			    if (err) throw err;
			    logger.log('dev', 'One card added');
		    });
	    }catch(error) {
		    logger.log('dev', 'error one card add');
	    }
    }

    async deleteOne(id){
        if(this.jsonFile === false) {
            await this.loadFile();
        }
        if(this.jsonFile.length > id) {
            this.jsonFile.splice(id, 1);
            await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile, "", 2),(err) => {
	            if (err) throw err;
	            logger.log('dev', 'One card delete');
            });
        }else {
            return false;
        }
    }
    async updateBalance(id, sum){
	    this.jsonFile = await this.loadFile();
	    const cardData = await this.getOne(id);
	    if(cardData !== false) {
	    	for(let card of this.jsonFile){
	    		if(Number(card.id) === Number(id) ){
				    let amount = 0;
				    amount = card["balance"] - sum;
				    card.balance = amount;
				    await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile, "", 2),(err) => {
					    if (err) logger.log('dev', 'card balance not updated');
					    logger.log('dev', 'card balance updated');
				    });
				    return cardData;
			    }
		    }
	    }else {
		    return false;
	    }
    }

}
module.exports = cardsModel;