import validator from 'validator';

/*
 * Prefix of a module
 */

const PREFIX = "SUBSCRIPTION_FORM_"

/*
 * action types
 */

export const ON_CHANGE = `${PREFIX}_ON_CHANGE`
export const VALIDATE = `${PREFIX}_VALIDATE`
export const ON_SUBMIT = `${PREFIX}_ON_SUBMIT`

/*
 * action creators
 */

export function onChange(name, value) {
  return { type: ON_CHANGE, name, value }
}

export function validate() {
  return { type: VALIDATE }
}

// For the sake of simplicity
export function onSubmit() {
  return { type: ON_SUBMIT }
}

/*
 * reducers
 */

const initialState = {
  meta: {
    touched: false,
    valid: false
  },
  values: {
    first_name: '',
  },
  errors: {

  },
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value
        }
      }
    case VALIDATE:
      const result = doValidation(state.values)

      return {
        ...state,
        meta: {
          ...state.meta,
          valid: result.valid,
        },
        errors: result.errors
      }
    case ON_SUBMIT:
      return {
        ...state,
        meta: {
          ...state.meta,
          touched: true,
        },
      }
  }

  return state
}

/*
 * reducers
 */

// Could be more declarative
function doValidation(values) {
  const errors = {}
  let valid = false

  if (validator.isEmpty(values.first_name || '')) {
    errors.first_name = 'This field is required'
    valid = false
  }

  if (validator.isEmpty(values.last_name || '')) {
    errors.last_name = 'This field is required'
    valid = false
  }

  if (validator.isEmpty(values.street || '')) {
    errors.street = 'This field is required'
    valid = false
  }

  if (validator.isEmpty(values.country || '')) {
    errors.country = 'This field is required'
    valid = false
  }

  if (validator.isEmpty(values.city || '')) {
    errors.city = 'This field is required'
    valid = false
  }

  if (validator.isEmpty(values.state || '')) {
    errors.state = 'This field is required'
    valid = false
  }

  if (validator.isEmpty(values.zip || '')) {
    errors.zip = 'This field is required'
    valid = false
  }

  if (validator.isEmpty(values.cc_number || '')) {
    errors.cc_number = 'This field is required'
    valid = false
  } else if (!validator.isCreditCard(values.cc_number || '')) {
    errors.cc_number = 'Incorrect Credit Card Number'
    valid = false
  }

  if (validator.isEmpty(values.cc_code || '')) {
    errors.cc_code = 'This field is required'
    valid = false
  } else if (values.cc_code === '111') {
    errors.cc_code = 'Against the rules...'
    valid = false
  }

  if (validator.isEmpty(values.cc_month || '')) {
    errors.cc_month = 'This field is r6quired'
    valid = false
  }

  if (validator.isEmpty(values.cc_year || '')) {
    errors.cc_year = 'This field is r6quired'
    valid = false
  }

  return { valid, errors }
}