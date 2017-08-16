# Carto 
Carto is a small javascript library that provides a set of mapping functions. 

## Reference 

#### deep_map
Applies a function to all members of an array as well as all members of nested arrays and retains the array structure

*Parameters*
* array: An array with one or more nested arrays.
@function will be applied to every member of the array and every member of the arrays it contains.
* function: A function to apply to each member of the array. 
Must have a signature `fn(element, index, array)`

*Example*
```javascript
carto.deep_map([1, 2, 3, [4, 5, 6], [2, 3, [4, 5]]], x => {return x + 1});
//=> returns [2, 3, 4, [5, 6, 7], [3, 4, [5, 6]]]
```