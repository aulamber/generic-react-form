# Generic React Form

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
- value (any type, optional): value of the field

#### -> comparFieldsChecks (array of objects, optional): if you need to compare a field to other fields

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
}
```

### 2) Content is your form presentational component

You can put anything in your form, you are not limited to HOC-specific field components.

The props injected in your presentational component by the HOC are:

#### -> disabled (bool): gives the disable status of your submit button

#### -> fields (object of field objects): each field gives you all the data/metadata related to itself. I.e.:

```javascript
fields = {
  amount1: { checks (obj), errors (TODO type), isRequired (bool), pristine (bool), value (any type) },
  amount2 : { ... },
}
```

#### -> formErrors (object of error strings): value is null until clicking on submit button

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
