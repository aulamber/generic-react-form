import {
  isTooLong,
  isNumber,
  isDifferentFrom,
  hasEmptyFields,
  isSumWithinRange,
} from './genericChecks'

// Verifications to be done for each field, individually and compared to others
export const fieldChecks = {
  amount1: [ isTooLong(6), isNumber ],
  amount2: [ isTooLong(6), isNumber ],
  amount3: [ isTooLong(6), isNumber ],
  amount4: [ isTooLong(6), isNumber ],

  comparChecks: [
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
}

// Verifications to be done for the whole form
export const formChecks = [ hasEmptyFields, isSumWithinRange(0, 100) ]
