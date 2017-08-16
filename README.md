# Carto 
Carto is a small javascript library that provides a set of mapping functions. 

## Reference 

#### deep_map
*Parameters*
* array: An array with one or more nested arrays.
@function will be applied to every member of the array and every member of the arrays it contains.
* function: A function to apply to each member of the array. 
Must have a signature `fn(element, index, array)`
*Example*
```javascript
const carto = require('carto');
function addOne(x){return x + 1}
deep_map([1, 2, 3, [4, 5, 6], [2, 3, [4, 5]]], addOne);
//=> returns 
```