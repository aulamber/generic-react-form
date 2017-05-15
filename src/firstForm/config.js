import { hasEmptyFields, isSumOutOfRange } from '../form/checks';

import { IsNotGrenoble, IsNumber, IsTooLong } from '../form/checks/fieldChecks/index';

const isNotGrenoble = new IsNotGrenoble();
const isNumber = new IsNumber();
const isTooLong = new IsTooLong();

export default {
  formName: 'FirstForm',

  fieldConfig: {
    amount1: { checks: [isTooLong.check(6), isNumber.check()], value: '1' },
    amount2: { checks: [isTooLong.check(6), isNumber.check()], value: '2' },
    amount3: { checks: [isTooLong.check(6), isNumber.check()], value: '2' },
    amount4: { checks: [isTooLong.check(6), isNumber.check()], isRequired: false, value: '4' },
    select: { checks: [isNotGrenoble.check()], value: 'Paris' },
  },

  formChecks: [
    {
      args: ['amount1', 'amount2', 'amount3'],
      func: (amount1, amount2, amount3) => {
        if (amount1 === amount2 && amount1 !== amount3) {
          return { amount1: 'Amount1 must be different from amount2.' };
        } else if (amount1 === amount3 && amount1 !== amount2) {
          return { amount1: 'Amount1 must be different from amount3.' };
        } else if (amount1 === amount2 && amount1 === amount3) {
          return { amount1: 'Amount1 must be different from amount2 and amount3.' };
        }

        return null;
      },
    },

    {
      args: ['amount2', 'amount3'],
      func: (amount2, amount3) => (amount2 !== amount3 ? { amount2: 'Amount2 must match amount3.' } : null),
    },

    {
      args: ['amount1', 'amount2', 'amount3', 'amount4'],
      func: (...args) => (isSumOutOfRange(0, 100)(args) ? { form: 'The sum must be between 0 and 100' } : null),
    },

    {
      args: ['amount1', 'amount2', 'amount3', 'amount4'],
      func: (...args) => {
        const missingFields = hasEmptyFields(args);

        return (missingFields
          ? { form: `Some fields are missing: ${missingFields}` }
          : null
        );
      },
    },
  ],
};
