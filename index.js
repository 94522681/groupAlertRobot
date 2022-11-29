const Koa = require('koa');
const app = new Koa();
const superagent = require("superagent");
const sendMsgRobot  = require('./api/robot')
app.use(async ctx => {
    ctx.body = 'Hello Vercel'
});


// 请求企业微信机器人编号89757
// const sendMsgRobot = async () => {
//     try {
//         let data ={
//             "msgtype": "text",
//             "text": {
//                 "content": "乐老师今天还没有喝咖啡yayayayayay"
//             }
//         }
//         const res = await superagent.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=148d3c94-4ebc-4231-a804-170fc5bd33a6').send(data).set('Content-Type','application/json')
//         // console.log('---then--111111-->>>',res,res.text,res.errcode)
//     }catch (e) {
//         console.log('----errrr------->',e)
//     }
// }

// sendMsgRobot()

setInterval(()=>{
    sendMsgRobot()
},1000*60*10)
sendMsgRobot()

// app.listen(3023,()=> {
//     console.log('30015项目启动')
// })
