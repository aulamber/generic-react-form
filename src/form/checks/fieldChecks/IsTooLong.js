import { FieldChecks } from './';

export default class IsTooLong extends FieldChecks {
  check(length) {
    return (value) => {
      const message = `Should be 1-${length} characters.`;

      return value && value.length <= length ? this.error : { ...this.error, bool: true, message };
    };
  }
}
