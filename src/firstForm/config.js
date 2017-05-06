import { isDifferentFrom, isNumber, isTooLong, hasEmptyFields, isSumWithinRange } from '../form/checks';

export default {
  formName: 'FirstForm',

  fieldConfig: {
    amount1: { checks: [isTooLong(6), isNumber], value: '2' },
    amount2: { checks: [isTooLong(6), isNumber], value: '2' },
    amount3: { checks: [isTooLong(6), isNumber], value: '1' },
    amount4: { checks: [isTooLong(6), isNumber], isRequired: false, value: '4' },
  },

  comparFieldsChecks: [
    {
      func: isDifferentFrom(true),
      fieldsToCompare: ['amount2', 'amount3'],
      comparedField: 'amount1',
    },
    {
      func: isDifferentFrom(false),
      fieldsToCompare: ['amount3'],
      comparedField: 'amount2',
    },
  ],

  formChecks: [hasEmptyFields, isSumWithinRange(0, 100)],
};
