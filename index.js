const express = require('express')
const app = express()
const port = 3011
let { checkIsDone, signToCloseReminder  } = require('./controller/strongAlert')
const { startAppSetTime } = require('./api/robot')


// 开启倒计逻辑
startAppSetTime()

app.get('/', (req, res) => {
    console.log('-----接收到了请求---空-->')
    res.send('hello world')
})

app.get('/click/robotAlert', (req, res) => {
    console.log('-----接收到了请求-----click/robotAler-->')
    // 1.判断今天的缓存是否完成点击完成签到
    if(checkIsDone()) {
        return
    }
    // 2.去签到完成
    signToCloseReminder()
    res.send('恭喜你签到成功！记得去填写今天的日志!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

