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
        errors: doValidate(state.values, {
          ...constraints,
          ...(state.meta.showBilling ? billingContraints : {})
        }, { format: 'custom' })
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

doValidate.formatters.custom = (errors) => {
  const result = {}

  errors.forEach(element => {
    result[element.attribute] = element.options.message || `Can't be blank`
  });

  return result;
};

const constraints = {
  first_name: {
    presence: { allowEmpty: false },
    length: {
      maximum: 50,
      message: "No more than 50 characters"
    }
  },
  last_name: { 
    presence: { allowEmpty: false },
    length: {
      maximum: 50,
      message: "No more than 50 characters"
    }
  },
  shipping_street: { 
    presence: { allowEmpty: false },
    length: {
      maximum: 50,
      message: "No more than 50 characters"
    }
  },
  shipping_zip: { 
    presence: { allowEmpty: false },
  },
  shipping_city: { 
    presence: { allowEmpty: false },
    length: {
      maximum: 10,
      message: "No more than 10 characters"
    }
  },
  shipping_state: {
    presence: { allowEmpty: false },
    length: {
      maximum: 10,
      message: "No more than 10 characters"
    }
  },
  shipping_country: {
    presence: { allowEmpty: false },
    length: {
      maximum: 10,
      message: "No more than 10 characters"
    }
  },
  cc_year: {
    presence: { allowEmpty: false },
  },
  cc_month: {
    presence: { allowEmpty: false },
  },
  cc_code: {
    presence: { allowEmpty: false },
    format: {
      pattern: /^(?!111).*$/,
      message: `Can't be 111`
    },
  },
  phone: {
    length: { 
      maximum: 10,
      message: "No more than 10 numbers"
    },
  },
  cc_number: { 
    presence: { allowEmpty: false },
    format: {
      pattern: /^(34|37|4|5[1-5]).*$/,
      message: 'Not valid'
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
}

const billingContraints = {
  billing_street: { 
    presence: { allowEmpty: false },
    length: {
      maximum: 50,
      message: "No more than 50 characters"
    }
  },
  billing_zip: { 
    presence: { allowEmpty: false },
  },
  billing_city: { 
    presence: { allowEmpty: false },
    length: {
      maximum: 10,
      message: "No more than 10 characters"
    }
  },
  billing_state: {
    presence: { allowEmpty: false },
    length: {
      maximum: 10,
      message: "No more than 10 characters"
    }
  },
  billing_country: {
    presence: { allowEmpty: false },
    length: {
      maximum: 10,
      message: "No more than 10 characters"
    }
  },
}