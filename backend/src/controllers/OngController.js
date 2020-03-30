const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        const ongs = await connection('ongs').select('*');
    
        return res.json(ongs);
    },
    async create(req,res){
        const {name,email,whatsapp,city,uf} = req.body;
        /* Convert ID in string Hexadecimal  */
        const id = generateUniqueId();

        /* Connect to datbase and insert new Ong on table ongs */
        await connection('ongs').insert({
            id,name,email,whatsapp,city,uf,
        })

        
        return res.json({id});
        },
       
}