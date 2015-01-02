#FunctionInject
==============
Inject your script to any function before or after this function execute, or inject your script to any function's callback.
##Feature
* You can catch function's argument before execute, catch function's result after execute and before it's invoke function get it.
* You can change function's(and callback function) argument and result.
* You can cancel function execute.

#Sample
define a function named setFullName, get a fullName argument, print it, use as callback's argument and return it.
```Node
var funcInject = require("./script/funcInject");
var callbackInject = require("./script/callbackInject");
var mouse = function(){};
mouse.prototype.setFullName = function(fullName, callback){
    this.fullName = fullName;
    console.log(this.fullName);
    if(callback instanceof Function){
        callback(this.fullName);
    }
    return this.fullName;
};
```
##preInject
###1. execute custom script before the function execute
```Node
funcInject.funcPreInject(mouse, 'setFullName',function(){
        console.log('injected');
    });
var mickey = new mouse();
console.log('result:' + mickey.setFullName('mickey mouse'));
```
###2. change the argument before the function execute
```Node
funcInject.funcPreInject(mouse, 'setFullName', function(fullNameObj){
    console.log('injected');
    fullNameObj.value = 'McDuck';
});
var mickey = new mouse();
console.log('result:' + mickey.setFullName('mickey mouse'));
```
###3. execute script and cancel execute the function's script 
execute custom script, return custom result and calcel execute the function's script
```Node
funcInject.funcPreInject(mouse, 'setFullName', function(fullNameObj){
        console.log('injected');
        return 'Goofy';
    });
var mickey = new mouse();
console.log('result:' + mickey.setFullName('mickey mouse'));
```

##sufInject
###1. get function's result value
```Node
funcInject.funcSufInject(mouse, 'setFullName', function(resultObj){
        console.log('injected, result:' + resultObj.value);
    });
var mickey = new mouse();
console.log('result:' + mickey.setFullName('mickey mouse'));
```
###2. change function's result
change the function's result value before function's invoker get it
```Node
funcInject.funcSufInject(mouse, 'setFullName', function(oldResult){
    console.log('Injected');
    oldResult.value = 'McDuck'
});
var mickey = new mouse();
console.log('result:' + mickey.setFullName('mickey mouse'));
```

##callbackInject
** now target function's last argument as callback function(if it's Function type) **

###1. execute script before callback invoke
your can execute custom script before the function's invoker callback function invoke
```Node
callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
    console.log('Injected callback argument:'+ fullNameObj.value);
});
var mickey = new mouse();
console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
    console.log('callback argument:'+ fullName);
}));
```
###2. change callback's arguments
```Node
callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
    console.log('Injected callback argument:'+ fullNameObj.value);
    fullNameObj.value = 'McDuck';
});
var mickey = new mouse();
console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
    console.log('callback argument:'+ fullName);
}));
```
TOTO:  
* 
