const RomanNumber = function(value) {
    const VALUE_RANGE = {MIN: 1, MAX: 3999}
    const CONVERSION_MAP = [
        {ARABIC: 1000, ROMAN: 'M'},
        {ARABIC: 900, ROMAN: 'CM'},
        {ARABIC: 500, ROMAN: 'D'},
        {ARABIC: 400, ROMAN: 'CD'},
        {ARABIC: 100, ROMAN: 'C'},
        {ARABIC: 90, ROMAN: 'XC'},
        {ARABIC: 50, ROMAN: 'L'},
        {ARABIC: 40, ROMAN: 'XL'},
        {ARABIC: 10, ROMAN: 'X'},
        {ARABIC: 9, ROMAN: 'IX'},
        {ARABIC: 5, ROMAN: 'V'},
        {ARABIC: 4, ROMAN: 'IV'},
        {ARABIC: 1, ROMAN: 'I'},
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
            const token = CONVERSION_MAP.find(e => e.ARABIC <= remainder);
            console.log(token, remainder)
            if(!token) {
                throw new Error('invalid value');
            }

            romanString += token.ROMAN;
            remainder -= token.ARABIC;
        }
        this.roman = romanString;

    } else if (typeof value === 'string') {
        this.roman = value;

        let maxTokenValue = 1000;
        let remainder = value;
        let arabicValue = 0;
        while (remainder != '') {
            const token = CONVERSION_MAP.find(e => remainder.startsWith(e.ROMAN) && e.ARABIC <= maxTokenValue);
            if(!token) {
                throw new Error('invalid value');
            }

            arabicValue += token.ARABIC;
            maxTokenValue = token.ARABIC;
            remainder = remainder.slice(token.ROMAN.length);
            
            //
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

//REMOVE start
let romanNumber1 = new RomanNumber('XX');
let romanNumber2 = new RomanNumber(40);
let r1 = new RomanNumber(1995);
let r2 = new RomanNumber(432);
let r3 = new RomanNumber(234);
let r4 = new RomanNumber(989);

let r5 = new RomanNumber("MMCXI");
let r6 = new RomanNumber("XXIX");
let r7 = new RomanNumber("DCIV");
let r8 = new RomanNumber("CDXXXIII");


console.log(romanNumber1.toString(), romanNumber2.toString(), r1.toString(), r2.toString(), r3.toString(), r4.toString());
console.log(romanNumber1.toInt(), romanNumber2.toInt(), r5.toInt(), r6.toInt(), r7.toInt(), r8.toInt());

//REMOVE end

(function() {
    TEST_VALUES = [null, '', 0, 1, 3, 4, 5, 'I', 'III', 'IIII', 'IV', 'V', 1968, '1473', 2999, 3000, 10000, 'CDXXIX', 'CD1X',
                    'error', 'MCDLXXXII', 'MCMLXXX', 'MMMMCMXCIX', 'MMMMDMXCIX'
    ];

    for (const value of TEST_VALUES) {
        console.log(value);
    }
})();

/*Test for:
null, ‘’, 0, 1, 3, 4, 5, ‘I’, ‘III’, ‘IIII’, ‘IV’, ‘V’, 1968, ‘1473’, 2999, 3000, 10000, ‘CDXXIX’, ‘CD1X’,
‘error’, ‘MCDLXXXII’, ‘MCMLXXX’, ‘MMMMCMXCIX’, ‘MMMMDMXCIX’

exceptions don't stop the code exec
*/