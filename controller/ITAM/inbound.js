const axios = require('axios');

// exports.inbound = async function(req, res) {

//     let payload = {
//         tipe: "gate_in",
//         rfid_code: "112232321",
//         tgl_masuk: "11-02-2022"
//      };

//     let send = await axios.post('http://localhost:3000/users', req.body);
//     //return res.json({data: send.data})

// }





async function makeGetRequest() {
    const url = 'https://api.itam.dev.digiprimatera.co.id/api/gate_in';

    let payload = {
        tipe: "gate_in",
        rfid_code: "11122223333222",
        tgl_masuk: "2022-02-07 11:11:11"
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios.defaults.headers.common = {
            "apikey" : "$pbkdf2-sha512$6000$2vs/x5iTEgJASKkVgjAmhA$G2JBx8f9EC9f8xdXCVcpwryTWeFu0stocMDx6MH6lAUSbb3HzFPB9Ly9nMHQGjUH.RYnprT7Hg30WVxipo8hUw"
        }
    let send = await axios({
        method: "post",
        url: url,
        data: payload,
        config
    });
    console.log(send.data);

 
}
makeGetRequest();
