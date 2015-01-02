/**
 * Created by fooevr on 15/1/2.
 */


var callbackInject = function(cls, methodName, procCallback)
{
    var method = cls.prototype[methodName];
    if(method)
    {
        cls.prototype['fakeCallback_'+methodName] = method;
        cls.prototype[methodName]=function()
        {
            var callback = arguments[arguments.length - 1];
            if(typeof callback === 'function') {
                arguments[arguments.length - 1] = function () {
                    var argObjs = [];
                    for(var index in arguments)
                    {
                        var item = arguments[index];
                        var obj = new Object();
                        obj.value = item;
                        argObjs.push(obj);
                    }
                    procCallback.apply(this, argObjs);
                    var args = [];
                    argObjs.forEach(function (item) {
                        args.push(item.value);
                    });
                    callback.apply(this, args);
                };
            }
            return this['fakeCallback_'+methodName].apply(this,Array.prototype.slice.call(arguments));
        };
    }
};

module.exports.inject = callbackInject;

/* sample
var cls = function()
{};

cls.prototype.callValue = function(value, callback)
{
    console.log('callValue');
    callback(value);
};

var obj = new cls();

obj.callValue(10, function(value){
    console.log(value);
});

inj(cls, 'callValue', function(value){
    value.value+=1;
    console.log('inject:'+value.value);
});

obj.callValue(10, function(value){
    console.log(value);
});
sample */