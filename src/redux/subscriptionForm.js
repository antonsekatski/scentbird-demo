import { default as doValidate } from 'validate.js'

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
export const TOGGLE_BILLING = `${PREFIX}_TOGGLE_BILLING`

/*
 * action creators
 */

export function onChange(name, value) {
  return { type: ON_CHANGE, name, value }
}

export function validate() {
  return { type: VALIDATE }
}

export function toggleBilling() {
  return { type: TOGGLE_BILLING }
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
    valid: false,
    showBilling: false,
  },
  values: {
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
      return {
        ...state,
        errors: doValidate(state.values, constraints)
      }
    case ON_SUBMIT:
      return {
        ...state,
        meta: {
          ...state.meta,
          touched: true,
        },
      }
    case TOGGLE_BILLING:
      return {
        ...state,
        meta: {
          ...state.meta,
          showBilling: !state.meta.showBilling,
        },
      }
  }

  return state
}

/*
 * validators
 */

// validate.validators.custom = function(value, options, key, attributes) {
//   console.log(value);
//   console.log(options);
//   console.log(key);
//   console.log(attributes);
//   return "is totally wrong";
// };

const constraints = {
  first_name: { 
    presence: true,
    length: {
      maximum: 50,
      message: "must be no more than 50 characters"
    }
  },
  last_name: { 
    presence: true,
    length: {
      maximum: 50,
      message: "must be no more than 50 characters"
    }
  },
  shipping_street: { 
    presence: true,
    length: {
      maximum: 50,
      message: "must be no more than 50 characters"
    }
  },
  shipping_zip: { 
    presence: true,
  },
  shipping_city: { 
    presence: true,
    length: {
      maximum: 10,
      message: "must be no more than 10 characters"
    }
  },
  shipping_state: { 
    presence: true,
    length: {
      maximum: 10,
      message: "must be no more than 10 characters"
    }
  },
  shipping_country: { 
    presence: true,
    length: {
      maximum: 10,
      message: "must be no more than 10 characters"
    }
  },
  cc_number: { 
    presence: true,
    format: {
      pattern: /^(34|37|4|5[1-5]).*$/,
      message: 'is not valid'
    },
    length: function(value, attributes, attributeName, options, constraints) {
      if (value) {
        // Amex
        if ((/^(34|37).*$/).test(value)) return {is: 15};
        // Visa, Mastercard
        if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
      }
      // Unknown card, don't validate length
      return false;
    }
  },
  // cc_code: function(value, attributes, attributeName, options, constraints) {
  //   if (value === x) return 'is not valid';
  //   return null;
  // }
};