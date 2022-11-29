const superagent = require( "superagent" );

const memberList = ['chenjiale','luozhigang','lizhikang','longzhou']


let robotUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d3210551-9a52-4768-95c3-0c599f178b04'

let catchList = []

module.exports = async () => {
    try {
        let todayMember = ''
        memberList.some(item => {
            if(!catchList.includes(item)) {
                todayMember = item
                return true
            }
        });
        let data ={
            "msgtype": "text",
            "text": {
                "content": "今天记得录入错误日志哟！",
                "mentioned_list": [todayMember],
            }
        }
        const res = await superagent.post(robotUrl).send(data).set('Content-Type','application/json')
        catchList.push(todayMember)
        if(catchList.length >= 4) {
            catchList = []
        }
    }catch (e) {
        console.log('----errrr------->',e)
    }
}
