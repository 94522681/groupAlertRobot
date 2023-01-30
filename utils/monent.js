

// 处理得到当前的月份日期

/**
 * 处理得到当前最新的月份和时间
 */
function nowMonthAndDate () {
    let nowDate = new Date()
    let month = nowDate.getMonth() + 1
    let detailDate = nowDate.getDate()
    return `${month.length === 1 ? '0'+ month : month}-${detailDate.length === 1 ? '0'+detailDate : detailDate}`
}


module.exports = {
    nowMonthAndDate
}