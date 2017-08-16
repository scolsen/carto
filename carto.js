/**
 * Created by scolsen on 8/8/2017.
 */

function unit(){
    return ()=>{return null}
}

function is_function(f){
    return typeof f === 'function';
}

function is_array(a){
    return Array.isArray(a);
}

function sink(array){
    array.reverse();
    array.pop();
    array.reverse();
}

/**
 * deep_map. Apply designated function to all members
 * Of an array of arrays of any size.
 * Supplied function should have signature:
 * func(x, index, array)
 */
function deep_map(array, func){
    if(!is_array(array)) return unit();
    return array.map((x, index, array)=>{
        if(is_array(x)) return deep_map(x, func);
        return func.call(this, x, index, array);
    });
}

/**
 * Deep_map but only runs the specified function if
 * the element matches the provided pattern which is
 * a function that returns a Boolean and is passed as
 * func[1]
 * @param array
 * @param func
 * @param pattern
 * @returns {*|Array|{}}
 */
function pattern_map(array, func, pattern){
    if(!is_function(pattern)) return unit();
    return array.map((x, index, array)=>{
        if(pattern(x)) return func(x, index, array);
        if(is_array(x)) return pattern_map(x, func, pattern);
        return unit();
    });
}

/**
 * Apply functions to every memeber of @array from
 * lef to right. Applications are subsequent.
 * function 2 is applied to the map resulting from
 * the application of function 1.
 * @param array
 * @param functions
 * @returns {*}
 */
function sequence_map(array, functions){
    if(!is_array(functions)) return unit();
    if (functions.length !== 0){
        let func = functions[0];
        sink(functions);
        return sequence_map(deep_map(array, func), functions);
    }
    return array;
}

/**
 * Return an array that contains the resulting maps of
 * Applying each function in @functions to @array
 * separately and not sequentially.
 * @param array
 * @param functions
 * @returns {Array}
 */
function delimit_map(array, functions){
    let res = [];
    if(!is_array(functions)) return unit();
    functions.forEach((x)=>{
        res.push(deep_map(array, x));
    });
    return res;
}

exports.deep_map = deep_map;
exports.pattern_map = pattern_map;
exports.sequence_map = sequence_map;
exports.delimit_map = delimit_map;
