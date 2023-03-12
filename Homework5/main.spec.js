describe('ageClassification function testing', function() {

    const ageClassificationUnderTest = ageClassification;

    it('negative age return null', function () {
        expect(ageClassificationUnderTest(-1)).toBeNull();
    });

    it('oversize age return null', function () {
        expect(ageClassificationUnderTest(122.01)).toBeNull();

        expect(ageClassificationUnderTest(150)).toBeNull();
    });

    it('from 1 to 24 (included) returns \'детский возраст\'', function() {
        const expectedResult = 'детский возраст';

        expect(ageClassificationUnderTest(1)).toBe(expectedResult);

        expect(ageClassificationUnderTest(24)).toBe(expectedResult);
    });

    it('from 24 (not included) to 44 (included) returns \'молодой возраст\'', function() {
        const expectedResult = 'молодой возраст';

        expect(ageClassificationUnderTest(24.01)).toBe(expectedResult);

        expect(ageClassificationUnderTest(44)).toBe(expectedResult);
    });

    it('from 44 (not included) to 65 (included) returns \'средний возраст\'', function() {
        const expectedResult = 'средний возраст';

        expect(ageClassificationUnderTest(44.01)).toBe(expectedResult);

        expect(ageClassificationUnderTest(65)).toBe(expectedResult);
    });

    it('from 65 (not included) to 75 (included) returns \'пожилой возраст\'', function () {
        const expectedResult = 'пожилой возраст';

        expect(ageClassificationUnderTest(65.1)).toBe(expectedResult);

        expect(ageClassificationUnderTest(75)).toBe(expectedResult);
    });

    it('from 75 (not included) to 90 (included) returns \'старческий возраст\'', function () {
        const expectedResult = 'старческий возраст';

        expect(ageClassificationUnderTest(75.01)).toBe(expectedResult);

        expect(ageClassificationUnderTest(90)).toBe(expectedResult);
    });

    it('from 90 (not included) to 122 (included) returns \'долгожители\'', function () {
        const expectedResult = 'долгожители';

        expect(ageClassificationUnderTest(90.01)).toBe(expectedResult);

        expect(ageClassificationUnderTest(122)).toBe(expectedResult);
    });

});

describe('\'oddFn\' function testing', function () {
    const oddFnUnderTest = oddFn;

   it('result array contains only odd numbers', function () {
        for (const element of oddFnUnderTest(10)) expect(element % 2).toBeGreaterThan(0);
   });

   it('loop should works up to \'n\' inclusive', function () {
        expect(oddFnUnderTest(10).length).toBe(5);

        expect(oddFnUnderTest(15).length).toBe(8);

        expect(oddFnUnderTest(20).length).toBe(10);
   });

   it('only \'while\' operator allowed', function () {
        const funcAsStr = oddFn.toString();

        expect(funcAsStr.search(/(for|do|of|in)/)).toBe(-1);
        
        /* expect(funcAsStr.includes('for')).toBeFalsy();
        expect(funcAsStr.includes('do')).toBeFalsy();
        expect(funcAsStr.includes('of')).toBeFalsy();
        expect(funcAsStr.includes('in')).toBeFalsy();
        expect(funcAsStr.includes('forEach(')).toBeFalsy(); */
   });

});