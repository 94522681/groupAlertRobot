const { nowMonthAndDate } = require('../utils/monent')
const { signRobotAlert } = require('../api/robot')

// 今天的缓存是否完成
let clickReminderCache = {
    theDate: '',
    doneFlag: false
}

/**
 * 核心函数
 * 检查是否完成当前的flag 
 */
function signToCloseReminder() {
    clickReminderCache = {
        theDate: checkIsDone(),
        doneFlag: true
    }
    signRobotAlert()
}

/**
 * 比对flag值和当前时间
 * @returns Boolean
 */
function checkIsDone() {
    return clickReminderCache.doneFlag && clickReminderCache.theDate === nowMonthAndDate()
}

module.exports = {
    signToCloseReminder,
    checkIsDone
}