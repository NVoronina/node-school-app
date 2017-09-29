/**
 * Created by Natalia on 28.09.2017.
 */
const fs = require('fs');
const path = require('path');

class transactionsModel{
    constructor(){
        this.fileDir = path.join(__dirname, '..', '..', 'source/data', 'transactions.json');
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
    async get(cardId){
        if(this.jsonFile === false){
            await this.loadFile();
        }
        let data = [];
        for(let transactions of this.jsonFile){
            if(transactions.cardId === cardId){
                data.push(transactions);
            }
        }
        return data;
    }
    async create(data){
        if(this.jsonFile === false){
            await this.loadFile();
        }
        this.jsonFile.push(data);
        await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile));
    }
    remove(){
         return console.log("Попытка удаления транзакции");
    }
}
module.exports = transactionsModel;