const unit = function unit() {
    return () => {return null}
}

const _isFunction = function _isFunction(f) {
    return typeof f === 'function';
}

const _isArray = function _isArray(a) {
    return Array.isArray(a);
}

const sink = function sink(array) {
    array.reverse();
    array.pop();
    array.reverse();
}

// Map function to all members of an array of arrays of any size.
const deepMap = function deepMap(array, func) {
    return array.map((x, index, array) => {
            if(_isArray(x)) return deep_map(x, func);
            return func.call(this, x, index, array);
        });
}

// deepMap but only runs the specified function if the element matches the provided pattern.
// pattern must be a function that returns a boolean.
const patternMap = function patternMap(array, func, pattern) {
    return array.map((x, index, array)=>{
        if(pattern(x)) return func(x, index, array);
        if(_isArray(x)) return patternMap(x, func, pattern);
        return unit();
    });
}

// Apply functions to every memeber of @array from left to right. Applications are subsequent.
// Function 2 is applied to the map resulting from the application of function 1.
const sequenceMap = function sequenceMap(array, functions){
    if(isArray(functions)){
        if (functions.length !== 0){
            let func = functions[0];
            sink(functions);
            return sequenceMap(deepMap(array, func), functions);
        }
    }
    return array;
}

// Return an array that contains the resulting maps of applying each function in @functions to @array separately and not sequentially.
const delimitMap = function delimitMap(array, functions){
    let res = [];
    functions.forEach((x)=>{
        res.push(deepMap(array, x));
    });
    return res;
}

exports.deepMap = deepMap;
exports.patternMap = patternMap;
exports.sequenceMap = sequenceMap;
exports.delimitMap = delimitMap;
