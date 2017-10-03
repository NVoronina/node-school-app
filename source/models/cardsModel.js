/**
 * Created by Natalia on 27.09.2017.
 */
const fs = require('fs');
const path = require('path');


class cardsModel {
    constructor(){
        this.fileDir = path.join(__dirname, '..', '..', 'source/data', 'cards.json');
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
		if(this.jsonFile === false) {
			await this.loadFile();
		}
		let data = {};
		for(let key in this.jsonFile){
			if(Number(key) === cardId){
                data = JSON.stringify(this.jsonFile[key]);
			}
		}
		return data;
	}
    async addOne(data){
        if(this.jsonFile === false) {
            await this.loadFile();
        }
        this.jsonFile.push(data);
	    try {
		    await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile),(err) => {
			    if (err) throw err;
			    console.log('done');
		    });
	    }catch(error) {
		    console.log('error ' + error);
	    }
    }

    async deleteOne(id){
        if(this.jsonFile === false) {
            await this.loadFile();
        }
        if(this.jsonFile.length > id) {
            this.jsonFile.splice(id, 1);
            await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile));
        }else {
            return false;
        }
    }

}
module.exports = cardsModel;