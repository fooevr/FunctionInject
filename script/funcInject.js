/**
 * Created by fooevr on 15/1/1.
 */

var funcInject = function(cls, methodName, func, preInject)
{
    var method = cls.prototype[methodName];
    if(method)
    {
        var prefix = 'fake';
        if(preInject)
            prefix += 'Pre_';
        else
            prefix += 'Suf_';
        cls.prototype[prefix + methodName] = method;
        if(!preInject)
        {
            cls.prototype[methodName] = function()
            {
                var result = this[prefix + methodName].apply(this, arguments);
                var obj = new Object();
                obj.value = result;
                func(obj);
                return obj.value;
            };
        }
        else {
            var realFunc = undefined;
            var fakeFunc = function () {
                var argObjs = [];
                Array.prototype.slice.call(arguments).forEach(function (item) {
                    var obj = new Object();
                    obj.value = item;
                    argObjs.push(obj);
                });
                var result = func.apply(this, argObjs);
                if (result != undefined) {
                    return result;
                }
                var args = [];
                argObjs.forEach(function (item) {
                    args.push(item.value);
                });
                return realFunc.apply(this, args);
            };
            if(cls.prototype['fakeCallback_'+methodName])
            {
                realFunc =  cls.prototype['fakeCallback_' + methodName];
                cls.prototype['fakeCallback_'+ methodName] = fakeFunc;
            }
            else
            {
                realFunc = cls.prototype[methodName];
                cls.prototype[methodName] = fakeFunc;
            }
        }
    }
    else
    {

    }
};

// 常用于预处理参数(若func有返回值，则取消后续命令执行，并返回该值)
module.exports.funcPreInject = function(cls, methodName, func)
{
    funcInject(cls, methodName, func, true);
};

// 常用于触发原函数后处理返回值
module.exports.funcSufInject = function(cls, methodName, func)
{
    funcInject(cls, methodName, func, false);
};


/* prototype method sample
 var cls = function()
 {
 this.count = 25;
 };

 cls.prototype.addValue = function(add)
 {
 this.count += add;
 return this.count;
 };


 var obj = new cls();
 console.log(obj.addValue(10));

 // 前置注入，用于处理参数
 module.exports.funcPreInject(cls,'addValue',function(value){
 value.value = 0;
 console.log('inject age');
 });
 //前置注入

 // 后置注入，用于处理返回值
 module.exports.funcSufInject(cls,'addValue',function(result){
 result.value = 0;
 console.log('inject age');
 });
 //后置注入

 console.log(obj.addValue(10));

 prototype method sample*/