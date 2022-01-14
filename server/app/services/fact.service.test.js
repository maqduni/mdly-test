import { FactService } from './fact.service';

describe('FactService', () => {
  describe('matchValueSet', () => {
    test('should indicate a match without a mask', () => {
      const valueSet = ['Logan', 'Kendall', 'Shiv'];
      const querySet = valueSet;

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.setsMatched).toBe(true);
    });

    test('should indicate a match with a mask', () => {
      const valueSet = ['Logan', 'Kendall', 'Shiv'];
      const querySet = ['Logan', '$1', '$2'];

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.setsMatched).toBe(true);
    });

    test('should not indicate a match without a mask', () => {
      const valueSet = ['Logan', 'Kendall', 'Shiv'];
      const querySet = ['Logan', 'Kendall', 'Tom'];

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.setsMatched).toBe(false);
    });

    test('should not indicate a match with a mask', () => {
      const valueSet = ['Logan', 'Kendall', 'Shiv'];
      const querySet = ['Logan', '$1', '$1'];

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.setsMatched).toBe(false);
    });

    test('should not indicate a match when set lengths differ', () => {
      const valueSet = ['Logan', 'Kendall', 'Shiv'];
      const querySet = ['Logan', '$1'];

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.setsMatched).toBe(false);
    });

    test('should return last two values', () => {
      const valueSet = ['Logan', 'Kendall', 'Shiv'];
      const querySet = ['Logan', '$1', '$2'];

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.maskMatches.values).toMatchObject({
        $1: 'Kendall',
        $2: 'Shiv',
      });
    });

    test('should return repeating values', () => {
      const valueSet = ['Host', 'Dolores', 'Host', 'Shiv', 'Shiv'];
      const querySet = ['$1', 'Dolores', '$1', '$2', '$2'];

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.maskMatches.values).toMatchObject({
        $1: 'Host',
        $2: 'Shiv',
      });
    });

    test('should return first and third values', () => {
      const valueSet = ['Shiv', 'Dolores', 'Host'];
      const querySet = ['$1', 'Dolores', '$2'];

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.maskMatches.values).toMatchObject({
        $1: 'Shiv',
        $2: 'Host',
      });
    });

    test('should return all values', () => {
      const valueSet = ['Shiv', 'Dolores', 'Host'];
      const querySet = ['$1', '$2', '$3'];

      const result = FactService.matchValueSet(valueSet, querySet);

      expect(result.maskMatches.values).toMatchObject({
        $1: 'Shiv',
        $2: 'Dolores',
        $3: 'Host',
      });
    });
  });
});
