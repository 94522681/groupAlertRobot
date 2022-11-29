const superagent = require( "superagent" );
module.exports = async () => {
    try {
        let data ={
            "msgtype": "text",
            "text": {
                "content": "吃饭了吃饭！"
            }
        }
        const res = await superagent.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=148d3c94-4ebc-4231-a804-170fc5bd33a6').send(data).set('Content-Type','application/json')
        // console.log('---then--111111-->>>',res,res.text,res.errcode)
    }catch (e) {
        console.log('----errrr------->',e)
    }
}
