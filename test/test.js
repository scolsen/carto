/**
 * Created by scolsen on 8/16/2017.
 * Tests for carto.js.
 * Ensure our maps capture the landscape.
 */
const assert = require('assert');
const carto = require('../carto');

describe('Carto', ()=>{
    describe('#deep_map()', ()=>{
        it('Should return a basic map of an array with no array members.', ()=>{
            assert.deepEqual([2, 4, 6], carto.deep_map([0, 2, 4], x=>{return x + 2}));
        });
    });
});
