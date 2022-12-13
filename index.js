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

let catchStatus = {
    flag: false,
    dateString: '',
}

setInterval(()=>{
    let dateTime  =  new Date()
    let hours = dateTime.getHours() 
    let mint = dateTime.getMinutes()
    let date = dateTime.getDate()
    if(date === catchStatus.dateString && catchStatus.flag) {
        return
    }
    if(dateTime.getDay() === 6 && date < 7) {
        return
    }
    if(dateTime.getDay() === 0) {
        return
    }
    if((hours == '9' ||  hours == '09' ) && (mint == '0' || mint == '00')) {
        sendMsgRobot()
        catchStatus = {
            flag: true,
            dateString: date,
        }
    }
},1000*5)

// sendMsgRobot()
// app.listen(3023,()=> {
//     console.log('30015项目启动')
// })
