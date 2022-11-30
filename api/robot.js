const superagent = require( "superagent" );

const memberList = ['chenjiale','luozhigang','lizhikang','longzhou']

let catchName = {
    'chenjiale': "陈家乐",
    'lizhikang': "李智康",
    'longzhou': "龙舟",
    'luozhigang': "罗志刚",
}

let robotUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d3210551-9a52-4768-95c3-0c599f178b04'

let catchList = []

module.exports = async () => {
    try {
        console.log('-----1-1----');
        let todayMember = ''
        memberList.some(item => {
            if(!catchList.includes(item)) {
                todayMember = item
                return true
            }
        });
        let data ={
            "msgtype": "template_card",
            "template_card":{
                "card_type":"text_notice",
                "source":{
                    "icon_url":"https://wework.qpic.cn/wwpic/252813_jOfDHtcISzuodLa_1629280209/0",
                    "desc":"微信四组",
                    "desc_color":0
                },
                "main_title":{
                    "title": "今天录入错误日志人员",
                },
                "emphasis_content":{
                    "title": catchName[todayMember],
                },
                "jump_list":[
                    {
                        "type":1,
                        "url":"https://xsuxt.yuque.com/xsued/client/bn7knkn9gler313f#R1eg",
                        "title":"错误日志值班表"
                    },
                    {
                        "type":1,
                        "url":"http://go.xsyxsc.cn/#/api-err-realtime?appId=wx11c47ad40ae04c48&type=customError&startTime=1669772348340&endTime=1669772374000",
                        "title":"哨兵地址"
                    },
                    {
                        "type":1,
                        "url": "http://bigpan.xsyxsc.cn/#/myProject",
                        "title":"bigPan地址"
                    },
                ],
                "card_action":{
                    "type":1,
                    "url": "https://xsuxt.yuque.com/xsued/client/bn7knkn9gler313f#R1eg",
                }        
            }
        }
    //     let secondData =  {
    //         "msgtype": "text",
    //         "text": {
    //             "content": "hello world"
    //         }
    //    }
        const res = await superagent.post(robotUrl).send(data).set('Content-Type','application/json')
        console.log('-------->>>',res);
        catchList.push(todayMember)
        if(catchList.length >= 4) {
            catchList = []
        }
    }catch (e) {
        console.log('----errrr------->',e)
    }
}
