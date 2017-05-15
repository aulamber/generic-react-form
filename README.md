# Generic form HOC

## HOC Initialization

Initialize the HOC with two parameters: config and content.
Then you can use it normally in your JSX.

```javascript
const MockForm = createForm({ config, content });
...
return <MockForm />
```

## HOC parameters

### 1) Config is your form config

Config is an object, made of the props:

#### -> formName (string, optional): the name you want to give to your form

#### -> fieldConfig (object of fields): data and metadata related to each of your fields

Each field is made of the props:
- checks (array, optional): validation functions to apply to a specific field
- isRequired (bool, optional): is this field required to submit the form ; by default is set to true
- value (any type, mandatory): value of the field (or '', {}, [] etc.)

#### -> comparChecks (array of objects, optional): if you need to compare a field to other fields

Each object is made of:
- func (func, mandatory): validation functions
// TODO: add empty function as default parameter when using func
- fieldsToCompare (array of strings, mandatory)
// TODO: if fieldsToCompare is empty don't compare it, return true
- comparedField (string, mandatory)
// TODO: if comparedField is empty don't compare it, return true

#### -> formChecks (array of functions, optional): validation functions for the entire form

Here is an example of formParams:

```javascript
const config = {
  formName: 'NameOfYourForm',

  fieldConfig: {
    amount1: { checks: [isTooLong(6), isNumber], value: '1' },
    amount2: { checks: [isTooLong(6)], value: '2' },
    amount3: { isRequired: false, value: '3' },
  },

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

  formChecks: [hasEmptyFields, isSumWithinRange(0, 100)],
}
```

### 2) Content is your form presentational component

You can put anything in your form, you are not limited to HOC-specific field components.

The props injected in your presentational component by the HOC are:

#### -> disabled (bool): gives the disable status of your submit button

#### -> fields (object of field objects): each field gives you all the data/metadata related to itself. I.e.:

```javascript
fields = {
  amount1: { errors (object), isRequired (bool), pristine (bool), value (any type) },
  amount2 : { ... },
}
```

#### -> formErrors (object of error strings): value is an empty object until clicking on submit button

#### -> handleChange (function): HOC method to be called when changing a field. First param is the name of the field, second is an optional onChange, i.e.:

```javascript
handleChange(
  name,
  () => console.log('Gives you room to do additional stuff when changing a field value')
)
```

#### -> handleSubmit (function): HOC method to be called when submitting the form. You can add an optional onChange param when calling handleChange, i.e.:

```javascript
handleSubmit(() => console.log('Gives you room to do additional stuff during submit'))
```

#### -> pristine (bool): tells you if the form is untouched or not

## Validation

As seen before, three types of validation functions are available: fieldChecks, comparChecks and formChecks.

You create your own checks functions (before injecting them in the createForm config param).

Each check function receives params from the form HOC, and needs to return an object with mandatory properties.

### Params received from the HOC

- for fieldChecks: (value: any type)
- for comparChecks: (fields: obj, fieldsToCompare: array, comparedField: string)
- for formChecks: (fields: obj)

### Return value

Each check function needs to return an obj with two mandatory props, 'type' and 'bool'.
Except for comparCheck functions, which needs a third mandatory prop, 'fieldWithError'.
The rest is optional, depending on the need of the user.


```javascript
return {
  type: 'isNumber', // mandatory--key for the check
  bool: true or false, // mandatory--if error or not
  fieldWithError: 'Field1', // mandatory--for comparChecks only--field you want to give the error to
  message: 'Should be a number.', // optional--if you wish to inject a message error in your presentational component
  ... // you can add additional props, i.e. 'messages: {...}' if you need multiple messages in the case of a checkbox select
}
```

### Check function examples

#### Field checks

```javascript
export function isNumber(value) {
  const error = {
    type: 'isNumber',
    bool: false,
    message: 'Should be a number.',
  };

  return (value && !/^[0-9]+$/.test(value) ? { ...error, bool: true } : error);
}
```

#### Compar checks

```javascript
export function isDifferentFrom(fields, fieldsToCompare, comparedField) {
  const error = {
    bool: false,
    fieldWithError: comparedField,
    message: `Fields should be different.`,
    type: 'isDifferentFrom',
  };

  fieldsToCompare.forEach((field) => {
    if (fields[comparedField].value === fields[field].value) {
      error.bool = true;
    }
  });

  return error;
}
```

#### Form checks

```javascript
export function isSumWithinRange(min, max) {
  return (fields) => {
    const error = {
      type: 'isSumWithinRange',
      bool: false,
      message: `The sum must be between ${min} and ${max}`,
    };
    let sum = 0;

    Object.keys(fields).forEach((field) => {
      sum += Number(fields[field].value);
    });

    if (isNaN(sum) || sum < min || sum > max) { error.bool = true; }

    return error;
  };
}
```
