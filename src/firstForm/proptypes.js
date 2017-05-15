import PropTypes from 'prop-types';

export default {
  formProps: PropTypes.shape({
    disabled: PropTypes.bool,

    fields: PropTypes.shape({
      amount1: PropTypes.shape({
        errors: PropTypes.shape().isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string.isRequired,
      }).isRequired,

      amount2: PropTypes.shape({
        errors: PropTypes.shape().isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string.isRequired,
      }).isRequired,

      amount3: PropTypes.shape({
        errors: PropTypes.shape().isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string.isRequired,
      }).isRequired,

      amount4: PropTypes.shape({
        errors: PropTypes.shape().isRequired,
        isRequired: PropTypes.bool,
        pristine: PropTypes.bool,
        value: PropTypes.string.isRequired,
      }).isRequired,
    }),

    formErrors: PropTypes.shape(),
    handleChange: PropTypes.func.isRequired,
    handleField: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
  }).isRequired,
};
