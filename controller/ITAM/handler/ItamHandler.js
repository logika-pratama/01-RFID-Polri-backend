const apiAdapter = require('../apiAddapter');

const url = 'https://api.itam.dev.digiprimatera.co.id';

const api = apiAdapter(url);



exports.gateIn = async(req, res) =>{
    try{
        console.log(api);
        const gatein = await api.post('/api/gate_in', req.body);
        return res.json(gatein.data);

    }catch(error){
        console.log(eror);
    }
}
