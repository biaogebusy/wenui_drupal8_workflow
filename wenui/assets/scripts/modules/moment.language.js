module.exports = function(moment){

  moment.locale('zh', {
    weekdaysShort: function(m) {
      return "周" + "日一二三四五六".split("")[m.day()];
    },
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    relativeTime : {
      future: "在%s",
      past:  "%s前",
      s:  "1秒",
      m:  "1分钟",
      mm: "%d分钟",
      h:  "1小时",
      hh: "%d小时",
      d:  "1天",
      dd: "%d天",
      M:  "1个月",
      MM: "%d月",
      y:  "1年",
      yy: "%d年"
    },
    longDateFormat : {
      LT: "A h:mm",
      LTS: "A h:mm:ss",
      L: "MM/DD/YYYY",
      l: "M/D/YYYY",
      LL: "MMMM Do YYYY",
      ll: "MMM D YYYY",
      LLL: "MMMM Do YYYY LT",
      lll: "MMM D YYYY LT",
      LLLL: "dddd, MMMM Do YYYY LT",
      llll: "ddd, MMM D YYYY LT"
    },
    meridiem: function (hour, minute, isLowercase) {
      if (hour < 9) {
          return "早上";
      } else if (hour < 11 && minute < 30) {
          return "上午";
      } else if (hour < 13 && minute < 30) {
          return "中午";
      } else if (hour < 18) {
          return "下午";
      } else {
          return "晚上";
      }
    },
    calendar : {
      lastDay : '昨天 LT',
      sameDay : '今天 LT',
      nextDay : '明天 LT',
      lastWeek : 'dddd LT',
      nextWeek : 'dddd LT',
      sameElse : 'L'
    },
    week : {
      dow : 1, // Monday is the first day of the week.
      doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
  })

}
