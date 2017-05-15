import { FieldChecks } from './';

export default class IsNotGrenoble extends FieldChecks {
  check() {
    return value => (value !== 'Grenoble'
      ? this.error
      : { ...this.error, bool: true, message: 'You cannot pick Grenoble, sorry!' }
    );
  }
}
