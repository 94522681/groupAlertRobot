const superagent = require( "superagent" );

const memberList = ['longzhou','luozhigang','chenjiale','lizhikang']

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
        let todayMember = ''
        memberList.some(item => {
            if(!catchList.includes(item)) {
                todayMember = item
                return true
            }
        });
        let data ={
            "msgtype": "markdown",
            "markdown":{
                "content": `
                # 微信四组
                > ## <font color="info">今天录入错误日志人员</font> 
                > # <@${todayMember}>
                    
                > #### [<font color="warning">错误日志值班表</font>](https://xsuxt.yuque.com/xsued/client/bn7knkn9gler313f#R1eg)
                > #### [ <font color="warning">哨兵地址</font>](http://go.xsyxsc.cn/#/api-err-realtime?appId=wx11c47ad40ae04c48&type=customError&startTime=1669772348340&endTime=1669772374000)
                > #### [<font color="warning">bigPan地址</font>](http://bigpan.xsyxsc.cn/#/myProject)
                `
            }
        }
        const res = await superagent.post(robotUrl).send(data).set('Content-Type','application/json')
        console.log('-------->>>',res);
        catchList.push(todayMember)
        if(catchList.length >= 4) {
            catchList = []
        }
    }catch (e) {
        console.log('----errrr---31231---->',e)
    }
}
