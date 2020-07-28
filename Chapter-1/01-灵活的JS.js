/**
 *  程序出Bug了？
 *        ∩∩
 *      （´･ω･）
 *     ＿| ⊃／(＿＿_
 *    ／ └-(＿＿＿／
 *    ￣￣￣￣￣￣￣
 *   算了反正不是我写的
 *      ⊂⌒／ヽ-、＿
 *    ／⊂_/＿＿＿＿ ／
 *    ￣￣￣￣￣￣￣
 * @Author: SeLiNnnn
 * @Description: Codes create the world.
 * @Date: 2020-07-29 00:38
 **/

// 需求：自主实现验证姓名、邮箱、密码

/**
 * Stage 1
 * 缺点：创建了太多全局变量
 */
function checkName() {
  //  验证姓名
}

function checkEmail() {
  //  验证邮箱
}

function checkPassword() {
  //  验证密码
}

//  --------> 等价于

let checkNameFn = function () {
  //  验证姓名
}

/**
 * Stage 2 用对象收编变量
 * 优点： 只声明了一个变量
 */
let CheckObject = {
  checkName: function () {
    //  验证姓名
  },
  checkEmail: function () {
    //  验证邮箱
  },
  checkPassword: function () {
    //  验证密码
  }
}
CheckObject.checkName(); // 使用.方法来使用

/**
 * Stage 3  使用.方法来创建
 * 缺点：对象无法复制
 */
let CheckObj = function () {
}

CheckObj.checkName = function () {
  //  验证姓名
}

/**
 * Stage 4 真假对象
 * 使用时 每次返回新的对象，互不影响 但a变量与CheckOb也无关系
 */
let CheckOb = function () {
  return {
    checkName: function () {
      //  验证姓名
    },
    checkEmail: function () {
      //  验证邮箱
    }
  }
}


// 使用：
let a = CheckOb();
console.log(a);
// 输出:
// {
//   checkName: [Function: checkName],
//   checkEmail: [Function: checkEmail]
// }
a.checkEmail();

/**
 * Stage 5 类创建对象
 * 使用new创建对象
 * 缺点： 每次创建都会通过this复制新的方法 造成了许多消耗
 */
let CheObj = function () {
  this.checkName = function () {
    //  验证姓名
  }
  this.checkEmail = function () {
    //  验证邮箱
  }
}
let b = new CheObj();
b.checkName();
console.log(b, 'b,输出与a一样');

/**
 * Stage 6
 * 使用原型创建对象
 * 创建出了的对象所拥有的方法都是同一个，因都依赖原型链依次寻找
 * 缺点：写了很多遍prototype
 */
let ChekObj = function () {
}
ChekObj.prototype.checkName = function () {
  //  验证姓名
}
ChekObj.prototype.checkEmail = function () {
  //  验证邮箱
}

/**
 * Stage 7
 * 注意： 6与7不可混用，否则在后面为对象原型赋值时会覆盖
 * 缺点：使用时会书写三次对象c
 */
let CheObject = function () {
}
CheObject.prototype = {
  checkName: function () {
    //  验证姓名
  },
  checkEmail: function () {
    //  验证邮箱
  }
}

// 使用
let c = new CheObject();
c.checkName();
c.checkEmail();

// JS中的this指向当前对象

/**
 * Stage 8 对象的链式调用
 */
let CheObjectObjLine = {
  checkName: function () {
    return this;
  },
  checkEmail: function () {
    return this;
  }
}
// 使用：
CheObjectObjLine.checkName().checkEmail()


/**
 * Stage 9 原型的链式调用
 */

let CheObjectLine = function () {

}
CheObjectLine.prototype = {
  checkName: function () {
    return this
  },
  checkEmail: function () {
    return this
  }
}
// 使用:
let d = new CheObjectLine();
d.checkEmail().checkEmail();


/**
 * Stage 10 函数的祖先
 * 缺点： 污染原声对象Function
 */
Function.prototype.checkEmail = function () {

}
// 函数式使用
let f = function () {

}
f.checkEmail()

// 类式使用
let f2 = new Function()
f2.checkEmail()

/**
 * Stage 11 抽象一个统一添加方法的功能方法
 */
Function.prototype.addMethod = function (name, fn) {
  this[name] = fn
}
let methods = new Function();
methods.addMethod('checkName', function () {
  // 验证姓名
})
methods.addMethod('checkEmail', function () {
  // 验证邮箱
})
methods.checkName()
methods.checkEmail()

/**
 * Stage 12 函数式链式调用11
 */
Function.prototype.addMethods = function (name, fn) {
  this[name] = fn
  return this
}
let method = function () {
}
method.addMethods('checkName', function () {
  console.log('name');
  return this
}).addMethods('checkEmail', function () {
  console.log('email');
  return this
})
// 链式使用
method.checkEmail().checkName()

/**
 * Stage 13 函数式链式调用12
 */
Function.prototype.addMethodFn = function (name, fn) {
  this.prototype[name] = fn
  return this;
}
let Methods = function () {

}
Methods.addMethodFn('checkName', function () {
  console.log('check name');
  return this
}).addMethodFn('checkPassword', function () {
  console.log('check pwd');
  return this
})
let m = new Methods();
m.checkPassword().checkName()

/**
 * 章节提问
 */
// 1. 真假对象即Stage 4, 如何实现链式调用？

// 解答
let CheckObLine = function () {
  return {
    checkName: function () {
      console.log('test name');
      return this
    },
    checkEmail: function () {
      console.log('test email');
      return this
    }
  }
}
let t = CheckObLine()
t.checkName().checkEmail()

// 3. 定义一个既可为原型添加方法又可为自身添加方法的addMethod方法  ?? 感觉不太对
Function.prototype.addMethodByType = function (name, fn, type) {
  this[name] = fn;
  if (type === 'prototype') {
    this.prototype[name] = fn
    return this
  } else if (type === 'self') {
    this[name] = fn
    return this
  } else {
    console.log('类型错误');
    return this
  }
}
let test = function () {
}
test.addMethodByType('checkPwd', function () {
  console.log('check by type');
  return this
}, 'self').addMethodByType('throwErr', function () {
  console.log('err');
  return this
}, 'err')
test.checkPwd().throwErr()
