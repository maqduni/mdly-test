import { QUERY_MASK_REGEXP } from '../common/constants';

// N.B. in-memory fact map due to the absence of persisted storage
const factMap = new Map();

export const FactService = {
  find({ fact: factId, query }) {
    if (!factMap.has(factId)) {
      return {
        hasMatch: false,
      };
    }

    const fact = factMap.get(factId);

    let matchesFound = false;
    const maskMatches = [];

    fact.valueSets.forEach((valueSet) => {
      const result = this.matchValueSet(valueSet, query);
      if (result.setsMatched) {
        matchesFound = true;

        if (result.maskMatches.found) {
          maskMatches.push(result.maskMatches.values);
        }
      }
    }, []);

    if (matchesFound) {
      if (maskMatches.length > 0) {
        return {
          hasMatch: true,
          matches: maskMatches,
        };
      }

      return {
        hasMatch: true,
      };
    }

    return {
      hasMatch: false,
    };
  },

  insert({ fact: factId, values }) {
    if (!factMap.has(factId)) {
      factMap.set(factId, {
        id: factId,
        valueSets: [
          values,
        ],
      });

    } else {
      const fact = factMap.get(factId);
      fact.valueSets.push(values);
    }

    return factMap.get(factId);
  },

  matchValueSet (valueSet, querySet) {
    const maskMatches = {
      found: false,
      count: {},
      values: {},
    };

    // do the set lengths equal?
    if (querySet.length !== valueSet.length) {
      return { setsMatched: false };
    }

    for (let i = 0; i < querySet.length; i++) {
      const queryItem = querySet[i];
      const value = valueSet[i];

      // is the query item a mask?
      if (QUERY_MASK_REGEXP.test(queryItem)) {
        // has this mask already been encountered?
        if (maskMatches.count[queryItem] > 0) {
          // does the previously encountered value match the current value?
          if (maskMatches.values[queryItem] !== value) {
            return { setsMatched: false };
          }

          maskMatches.count[queryItem] += 1;
        } else {
          maskMatches.found = true;
          maskMatches.count[queryItem] = 1;
          maskMatches.values[queryItem] = value;
        }
      } else {
        // does the current value equal the query item?
        if (value !== queryItem) {
          return { setsMatched: false };
        }
      }
    }

    return {
      setsMatched: true,
      maskMatches,
    };
  },
};
