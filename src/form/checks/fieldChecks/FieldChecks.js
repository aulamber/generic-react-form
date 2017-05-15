export default class FieldChecks {
  constructor() {
    this.error = {
      type: this.getName(),
      bool: false,
      // message: '',
    };
  }

  getName() {
    return this.constructor.name;
  }

  check() {
    return this.error;
  }
}
