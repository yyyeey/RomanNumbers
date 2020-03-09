const RomanNumber = function(value) {
    if(!new.target)
        return new RomanNumber(value)

    //check input
    //parse input
    //check for small before big
    //make sure theres a combination of 1 small and 1 big  pair at a time
    this.string = 'RomanNumber.string';
    this.number = 123;
}

RomanNumber.prototype.toString = function() {
    return this.string;
}

RomanNumber.prototype.toInt = function() {
    return this.number;
}

let romanNumber1 = new RomanNumber('XX');
let romanNumber2 = new RomanNumber(40);

console.log(romanNumber1.toInt(), romanNumber1.toString())

/*Test for:
null, ‘’, 0, 1, 3, 4, 5, ‘I’, ‘III’, ‘IIII’, ‘IV’, ‘V’, 1968, ‘1473’, 2999, 3000, 10000, ‘CDXXIX’, ‘CD1X’,
‘error’, ‘MCDLXXXII’, ‘MCMLXXX’, ‘MMMMCMXCIX’, ‘MMMMDMXCIX’

● Is null or empty, it should throw a ‘value required’ exception error (e.g. ‘throw new
Error(‘value required’);’ )
● Is outside of 1 to 3999, it should throw an ‘invalid range’ exception error.
● Is invalid, it should throw an ‘invalid value’ exception error.

*/