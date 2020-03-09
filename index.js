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
        throw new Error('value required');
    } else if (typeof value === 'number') {
        if (value < VALUE_RANGE.MIN || value > VALUE_RANGE.MAX) {
            throw new Error('invalid range');
        }

        this.arabic = value;

        let remainder = value;
        let romanString = '';
        while (remainder > 0) {
            const token = CONVERSION_MAP.find(e => e.ARABIC <= remainder);
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
};

RomanNumber.prototype.toString = function() {
    return this.roman;
};

RomanNumber.prototype.toInt = function() {
    return this.arabic;
};

(function() {
    const BAD_OBJECT = {toString: () => 'error', toInt: () => 0};
    const getTestObj = (roman, arabic) => ({toString: () => roman, toInt: () => arabic});

    const test = (value, expected) => {
        console.log("Testing '" + value + "'.");
        let received = null;
        try {
            received = new RomanNumber(value);
        } catch (e) {
            console.error("\tERROR.", "'" + value + "'", "conversion failed.", "Message:", e.message)
            received = BAD_OBJECT;
        }
        console.log("\tExpected: {roman: " + expected.toString() + ", arabic: " + expected.toInt() + "}.",
                    "Received: {roman: " + received.toString() + ", arabic: " + received.toInt() + "}.");
        return expected.toString() === received.toString() && expected.toInt() === received.toInt();
    }
    
    TEST_CASES = {
        null_ResolvesTo_Error:                  () => test(null,            BAD_OBJECT),
        empty_ResolvesTo_Error:                 () => test('',              BAD_OBJECT),
        arabic0_ResolvesTo_Error:               () => test(0,               BAD_OBJECT),
        arabic1_ResolvesTo_RomanI:              () => test(1,               getTestObj('I',         1)),
        arabic3_ResolvesTo_RomanIII:            () => test(3,               getTestObj('III',       3)),
        arabic4_ResolvesTo_RomanIV:             () => test(4,               getTestObj('IV',        4)),
        arabic5_ResolvesTo_RomanV:              () => test(5,               getTestObj('V',         5)),
        romanI_ResolvesTo_Arabic1:              () => test('I',             getTestObj('I',         1)),
        romanIII_ResolvesTo_Arabic3:            () => test('III',           getTestObj('III',       3)),
        romanIIII_ResolvesTo_Error:             () => test('IIII',          BAD_OBJECT),
        romanIV_ResolvesTo_Arabic4:             () => test('IV',            getTestObj('IV',        4)),
        romanV_ResolvesTo_Arabic5:              () => test('V',             getTestObj('V',         5)),
        arabic1968_ResolvesTo_RomanMCMLXVIII:   () => test(1968,            getTestObj('MCMLXVIII', 1968)),
        string1473string_ResolvesTo_Error:      () => test('1473',          BAD_OBJECT),
        arabic2999_ResolvesTo_RomanMMCMXCIX:    () => test(2999,            getTestObj('MMCMXCIX',  2999)),
        arabic3000_ResolvesTo_RomanMMM:         () => test(3000,            getTestObj('MMM',       3000)),
        arabic10000_ResolvesTo_Error:           () => test(10000,           BAD_OBJECT),
        romanCDXXIX_ResolvesTo_Arabic429:       () => test('CDXXIX',        getTestObj('CDXXIX',    429)),
        stringCD1X_ResolvesTo_Error:            () => test('CD1X',          BAD_OBJECT),
        stringError_ResolvesTo_Error:           () => test('error',         BAD_OBJECT),
        romanMCDLXXXII_ResolvesTo_Arabic1482:   () => test('MCDLXXXII',     getTestObj('MCDLXXXII', 1482)),
        romanMCMLXXX_ResolvesTo_Arabic1980:     () => test('MCMLXXX',       getTestObj('MCMLXXX',   1980)),
        romanMMMMCMXCIX_ResolvesTo_Error:       () => test('MMMMCMXCIX',    BAD_OBJECT),
        romanMMMMDMXCIX_ResolvesTo_Error:       () => test('MMMMDMXCIX',    BAD_OBJECT),
    }

    for (const [key, value] of Object.entries(TEST_CASES)) {
        console.log(value() ? "PASS" : "FAIL", key, "\n");
    }
})();
