#FunctionInject
==============
Inject your script to any function before or after this function execute, or inject your script to any function's callback.
* You can catch function's argument before execute, catch function's result after execute and before it's invoke function get it.
* You can change function's(and callback function) argument and result.
* You can cancel function execute.

#Sample
##preInject
###1. execute your custom script before the function execute
###2. change the argument before the function execute
###3. execute your script and cancel execute the function's script 

##sufInject
###1. get function's result value
###2. change function's result
change the function's result value before function's invoker get it

##callbackInject
###1. execute script before callback invoke
your can execute your custom script before the function's invoker callback function invoke
###2. change callback's arguments
