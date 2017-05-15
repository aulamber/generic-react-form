import { FieldChecks } from './';

export default class IsNumber extends FieldChecks {
  check() {
    return value => (
      value && !/^[0-9]+$/.test(value)
      ? { ...this.error, bool: true, message: 'Should be a number.' }
      : this.error
    );
  }
}
