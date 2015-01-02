/**
 * Created by fooevr on 15/1/3.
 */
var funcInject = require("./Script/funcInject");
var callbackInject = require("./Script/callbackInject");
var mouse = function(){};
mouse.prototype.setFullName = function(fullName, callback){
    this.fullName = fullName;
    console.log(this.fullName);
    if(callback && (callback instanceof Function)){
        callback(this.fullName);
    }
    return this.fullName;
};

// normal output;
// assert:
//  mickey mouse
//  result : mickey mouse
/*{
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse'));
    console.log('============');
}*/
// preInject(no change argument)
// assert:
//  injected
//  mickey mouse
//  result : mickey mouse
/*{
    funcInject.funcPreInject(mouse, 'setFullName',function(){
        console.log('injected');
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse'));
    console.log('============');
}*/

// preInject(change argument)
// assert:
//  injected
//  McDuck
//  result : McDuck
/*{
    funcInject.funcPreInject(mouse, 'setFullName', function(fullNameObj){
        console.log('injected');
        fullNameObj.value = 'McDuck';
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse'));
    console.log('============');
}*/

// preInject(cancel execute)
// assert:
//  injected
//  result : Goofy
/*{
    funcInject.funcPreInject(mouse, 'setFullName', function(fullNameObj){
        console.log('injected');
        return 'Goofy';
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse'));
    console.log('============');
}*/

// sufInject(no change result)
// assert:
//  mickey mouse
//  inject
//  result: mickey mouse
/*{
    funcInject.funcSufInject(mouse, 'setFullName', function(){
        console.log('injected');
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse'));
    console.log('============');
}*/

// sufInject(change result)
// assert:
//  mickey mouse
//  inject
//  result: McDuck
/*{
    funcInject.funcSufInject(mouse, 'setFullName', function(oldResult){
        console.log('Injected');
        oldResult.value = 'McDuck'
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse'));
    console.log('============');
}*/

// callbackInject(no change argument)
// assert:
//  mickey mouse
//  Injected callback argument:mickey mouse
//  callback argument:mickey mouse
//  result:mickey mouse
/*{
    callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
        console.log('Injected callback argument:'+ fullNameObj.value);
    });

    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
        console.log('callback argument:'+ fullName);
    }));
    console.log('============');
}*/

// callbackInject(change argument)
// assert:
//  mickey mouse
//  Injected callback argument:mickey mouse
//  callback argument:McDuck
//  result:mickey mouse
/*{
    callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
        console.log('Injected callback argument:'+ fullNameObj.value);
        fullNameObj.value = 'McDuck';
    });

    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
        console.log('callback argument:'+ fullName);
    }));
    console.log('============');
}*/

// preInject&callback(normal)
// assert:
//  Injected
//  mickey mouse
//  Injected callback argument:mickey mouse
//  callback argument:mickey mouse
//  result:mickey mouse

// 1:
/*{
    funcInject.funcPreInject(mouse,'setFullName', function(){
        console.log('Injected');
    });
    callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
        console.log('Injected callback argument:'+fullNameObj.value);
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
        console.log('callback argument:'+ fullName);
    }));
    console.log('============');
}*/

// 2:
/*{
    callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
        console.log('Injected callback argument:'+fullNameObj.value);
    });
    funcInject.funcPreInject(mouse,'setFullName', function(){
        console.log('Injected');
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
        console.log('callback argument:'+ fullName);
    }));
    console.log('============');
}*/

// preInject(change argument) & callback(normal)
// assert:
//  Injected
//  McDuck
//  Injected callback argument:McDuck
//  callback argument:McDuck
//  result:McDuck

// 1:
/*{
    funcInject.funcPreInject(mouse,'setFullName', function(fullNameObj){
        console.log('Injected');
        fullNameObj.value = 'McDuck';
    });
    callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
        console.log('Injected callback argument:'+fullNameObj.value);
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
        console.log('callback argument:'+ fullName);
    }));
    console.log('============');
}*/

// 2:
/*{
    callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
        console.log('Injected callback argument:'+fullNameObj.value);
    });
    funcInject.funcPreInject(mouse,'setFullName', function(fullNameObj){
        console.log('Injected');
        fullNameObj.value = 'McDuck';
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
        console.log('callback argument:'+ fullName);
    }));
    console.log('============');
}*/

// preInject(normal) & callback(change argument)
// assert:
//  Injected
//  mickey mouse
//  Injected callback argument:mickey mouse
//  callback argument:McDuck
//  result:mickey mouse

// 1:
/*{
    funcInject.funcPreInject(mouse,'setFullName', function(){
        console.log('Injected');
    });
    callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
        console.log('Injected callback argument:'+fullNameObj.value);
        fullNameObj.value = 'McDuck';
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
        console.log('callback argument:'+ fullName);
    }));
    console.log('============');
}*/

// 2:
/*{
    callbackInject.inject(mouse, 'setFullName', function(fullNameObj){
        console.log('Injected callback argument:'+fullNameObj.value);
        fullNameObj.value = 'McDuck';
    });
    funcInject.funcPreInject(mouse,'setFullName', function(){
        console.log('Injected');
    });
    var mickey = new mouse();
    console.log('result:' + mickey.setFullName('mickey mouse',function(fullName){
        console.log('callback argument:'+ fullName);
    }));
    console.log('============');
}*/

// preInject(change argument&cancel execute) & callback(normal)

// preInject(change argument & cancel execute) & callback(change argument)

// sufInject(change result) & callback(normal)

// sufInject(normal) & callback(change argument)

// sufInject(change result) & callback(change argument)