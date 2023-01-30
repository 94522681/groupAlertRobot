// node 发起请求的工具
const superagent = require( "superagent" );

const memberList = ['luodanni','chenjiale','lizhikang','longzhou','luozhigang']

let catchStatus =  {
    dateString: '',
    flag: false
}
// 最多提醒次数
const MAX_TIMES = 12
// 间隔时间
const DURATION_TIME = 30*1000 
// 签到接口
const signUrl = 'http://127.0.0.1:3011/click/robotAlert'
// 微信机器人调用地址
const  robotUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d3210551-9a52-4768-95c3-0c599f178b04'
// mock测试机器人微信地址
let mockUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=fbf081c4-b341-4962-9868-d730a3ee2efb'
// 缓存列表
let catchList = []
// 现在的次数
let nowTimes = 0



/**
 * 调用企业微信的接口
 * DURATION_TIME  递归调用这个接口10分钟一次
 * @returns 
 */
async function sendMsgRobot() {
    try {
        let lastCatchItem = catchList[catchList.length-1]
        if(lastCatchItem.doneFlag) {
            return
        }
        let todayMember = lastCatchItem.name
        let data ={
            "msgtype": "markdown",
            "markdown":{
                "content": `
                # 微信四组
                > ## <font color="info">今天录入错误日志人员</font> 
                > # <@${todayMember}>
                    
                > #### [<font color="warning">请点击签到</font>](${signUrl})
                > #### [<font color="warning">错误日志值班表</font>](https://xsuxt.yuque.com/xsued/client/bn7knkn9gler313f#R1eg)
                > #### [ <font color="warning">哨兵地址</font>](http://go.xsyxsc.com/#/errorOverview/api)
                > #### [<font color="warning">bigPan地址</font>](http://bigpan.xsyxsc.cn/#/myProject)
                `
            }
        }
        const res = await superagent.post(mockUrl || robotUrl).send(data).set('Content-Type','application/json')
        nowTimes++
        if( nowTimes < MAX_TIMES) {
            setTimeout(()=>{
                sendMsgRobot()
            },DURATION_TIME)
        }else {
            signRobotAlert()
        }
    }catch (e) {
        console.log('----errrr---31231---->',e)
    }
}

/**
 *  控制缓存逻辑
 */
function handleCacheListLogic() {
    let todayMember = memberList[catchList.length]
    let todayMemberObj = {
        name: todayMember,
        doneFlag: false
    }
    catchList.push(todayMemberObj)
    sendMsgRobot()
}

/**
 * 点击签到录入
 */
function signRobotAlert() {
    catchList[catchList.length-1].doneFlag = true
    if(catchList.length >= 5) {
        catchList = []
    }
}


/**
 * 倒计时逻辑初始化函数
 */
function startAppSetTime() {
    handleCacheListLogic()
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
            handleCacheListLogic()
            catchStatus = {
                flag: true,
                dateString: date,
            }
        }
    },1000*10)
}


module.exports =  {
    startAppSetTime,
    signRobotAlert
}
