const RomanNumber = function(value) {
    const VALUE_RANGE = {MIN: 1, MAX: 3999}
    const arabicToRomanMap = [
        {arabic: 1000, roman: 'M'},
        {arabic: 900, roman: 'CM'},
        {arabic: 500, roman: 'D'},
        {arabic: 400, roman: 'CD'},
        {arabic: 100, roman: 'C'},
        {arabic: 90, roman: 'XC'},
        {arabic: 50, roman: 'L'},
        {arabic: 40, roman: 'XL'},
        {arabic: 10, roman: 'X'},
        {arabic: 9, roman: 'IX'},
        {arabic: 5, roman: 'V'},
        {arabic: 4, roman: 'IV'},
        {arabic: 1, roman: 'I'},
    ];

    if(!new.target)
        return new RomanNumber(value)

    if (!value) {
        throw new Error('value required'); //the value cannot be empty
    } else if (typeof value === 'number') {
        console.log(value)
        if (value < VALUE_RANGE.MIN || value > VALUE_RANGE.MAX) {
            throw new Error('invalid range');
        }

        this.arabic = value;

        let remainder = value;
        let romanString = '';
        while (remainder > 0) {
            const token = arabicToRomanMap.find(e => e.arabic <= remainder);
            console.log(token, remainder)
            if(!token) {
                throw new Error('invalid value');
            }

            romanString += token.roman;
            remainder -= token.arabic;
        }
        this.roman = romanString;

    } else if (typeof value === 'string') {
        this.roman = value;

        let remainder = value;
        let biggestValue = 1000;
        let arabicValue = 0;
        while (remainder != '') {
            const token
            
            //check for small before big
            //make sure theres a combination of 1 small and 1 big  pair at a time
            //no more than 3x same char
            //only multiples of 10 and 1 can be subtracted
        }

        this.arabic = arabicValue;

    } else {
        throw new Error('invalid value');
    }
}

RomanNumber.prototype.toString = function() {
    return this.roman;
}

RomanNumber.prototype.toInt = function() {
    return this.arabic;
}

let romanNumber1 = new RomanNumber('XX');
let romanNumber2 = new RomanNumber(40);
let r1 = new RomanNumber(1995);
let r2 = new RomanNumber(432);
let r3 = new RomanNumber(234);
let r4 = new RomanNumber(989);

console.log(romanNumber1.toInt(), romanNumber1.toString(), r1.toString(), r2.toString(), r3.toString(), r4.toString())

/*Test for:
null, ‘’, 0, 1, 3, 4, 5, ‘I’, ‘III’, ‘IIII’, ‘IV’, ‘V’, 1968, ‘1473’, 2999, 3000, 10000, ‘CDXXIX’, ‘CD1X’,
‘error’, ‘MCDLXXXII’, ‘MCMLXXX’, ‘MMMMCMXCIX’, ‘MMMMDMXCIX’

exceptions don't stop the code exec
*/