const RomanNumber = function(value) {
    const VALUE_RANGE = {MIN: 1, MAX: 3999}
    const arabicToRomanMap = [
        {arabic: 1, roman: 'I'},
        {arabic: 4, roman: 'IV'},
        {arabic: 5, roman: 'V'},
        {arabic: 9, roman: 'IX'},
        {arabic: 10, roman: 'X'},
        {arabic: 40, roman: 'XL'},
        {arabic: 50, roman: 'L'},
        {arabic: 90, roman: 'XC'},
        {arabic: 100, roman: 'C'},
        {arabic: 400, roman: 'CD'},
        {arabic: 500, roman: 'D'},
        {arabic: 900, roman: 'CM'},
        {arabic: 1000, roman: 'M'},
    ];

    if(!new.target)
        return new RomanNumber(value)

    if (!value) {
        throw new Error('value required'); //the value cannot be empty
    } else if (typeof value === 'number') {
        if (value < VALUE_RANGE.MIN || value > VALUE_RANGE.MAX) {
            throw new Error('invalid range');
        }

        this.number = value;

        // this.string = 
    } else if (typeof value === 'string') {
        this.string = value;

        //check for small before big
        //make sure theres a combination of 1 small and 1 big  pair at a time
        //no more than 3x same char
        //only multiples of 10 and 1 can be subtracted
        //this.number = 
    } else {
        throw new Error('invalid value');
    }
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
let a = "12345"
for(let i = 0; i < a.length; ++i) {
    console.log(a[i])
}

/*Test for:
null, ‘’, 0, 1, 3, 4, 5, ‘I’, ‘III’, ‘IIII’, ‘IV’, ‘V’, 1968, ‘1473’, 2999, 3000, 10000, ‘CDXXIX’, ‘CD1X’,
‘error’, ‘MCDLXXXII’, ‘MCMLXXX’, ‘MMMMCMXCIX’, ‘MMMMDMXCIX’

exceptions don't stop the code exec
*/