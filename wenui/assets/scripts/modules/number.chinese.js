module.exports = function (num, company) {
  /* ===================================
     -- FX : numToZh('11') > 十一
     -- MAX: 99
     -- TAG: company = 'week' (第 NUM 周)
     ==================================== */
    num = Number(num);
    var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];
    var chinese = '';
    var length = String(num).length;
    if (length == 1) {
      chinese = upperCaseNumber[num];
    } else if (length == 2) {
      if (num == 10) {
        chinese = upperCaseNumber[num];
      } else if (num > 10 && num < 20) {
        chinese = '十' + upperCaseNumber[String(num).charAt(1)];
      } else {
        chinese = upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
      }
    }
    if(company){
      if(company == 'week'){
        return '第'+ chinese +'周'
      }
    }else{
      return chinese;
    }

}