import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Styles
import s from "./styles.module.scss";

// Components
import Input from '../Input';
import Select from '../Select';
import Product from '../Product';
import CardForm from '../CardForm';

// Actions
import { onChange, onSubmit, validate } from '../../redux/subscriptionForm';

// Constants
const FORM_NAME = 'subscriptionForm'

const states = [{ value: 1, text: 'New York' }]
const cities = [{ value: 1, text: 'New York' }]
const countries = [{ value: 1, text: 'United States' }]

// Component
class SubscriptionForm extends Component {
  render() {
    const { onChange, onSubmit } = this.props;

    return (
      <form className={s.wrapper} onSubmit={onSubmit}>
        <div className={s.header}>
          <h2 className={s.title}>
            <div className="is-hidden-tablet">MONTHLY SUBSCRIPTION</div>
            <div className="is-hidden-mobile">MONTH-TO-MONTH SUBSCRIPTION</div>
          </h2>
          <div className={s.subtitle}>Billed monthly. Renews automatically, cancel any time. Free shipping.</div>

          <div className={s.gap}></div>
        </div>

        <div className={s.product}><Product /></div>

        <div className={classNames(s.main)}>
            <h3 className={s.sectionTitle}>Shipping address</h3>

            <div className={classNames('columns', 'is-variable', 'is-2', s.group)}>
              <div className="column is-6">
                <Input form={FORM_NAME} label="First name" name="first_name" onChange={onChange} />
              </div>

              <div className="column is-6">
                <Input form={FORM_NAME} label="Last name" name="last_name" onChange={onChange} />
              </div>
            </div>

            <div className={classNames('columns', 'is-variable', 'is-2', s.group)}>
              <div className="column is-8">
                <Input form={FORM_NAME} label="Street address" onChange={onChange} name="street" onChange={onChange} />
              </div>
              <div className="column is-4">
                <Input form={FORM_NAME} label="Apt/Suite (Optional)" name="apt" onChange={onChange} />
              </div>
            </div>

            <div className={classNames('columns', 'is-variable', 'is-2', s.group)}>
              <div className="column is-4">
                <Input form={FORM_NAME} label="Zip" name="zip" onChange={onChange} />
              </div>
              <div className="column is-4">
                <Select form={FORM_NAME} label="City" name="city" defaultOption="City" options={cities} onChange={onChange} />
              </div>
              <div className="column is-4">
                <Select form={FORM_NAME} label="State" name="state" defaultOption="State" options={states} onChange={onChange} />
              </div>
            </div>

            <div className={classNames('columns', 'is-variable', 'is-2', s.group)}>
              <div className="column">
                <Select form={FORM_NAME} label="State" name="country" defaultOption="Country" options={countries} onChange={onChange} />
              </div>
            </div>

            <div className={classNames('columns', 'is-variable', 'is-2', s.group)}>
              <div className="column is-6">
                <Input form={FORM_NAME} label="Phone number (optional)" />
              </div>
              <div className="column is-6 is-hidden-mobile">
                <div className={s.helper}>We may send you special discounts and offers</div>
              </div>
            </div>

            <div className={s.gap}></div>

            <h3 className={s.sectionTitle}>Secure credit card payment</h3>

            <CardForm form={FORM_NAME} onChange={onChange} />

            <div className={s.bottom}>
              <a href="#" className="is-hidden-mobile">Back</a>

              <button className={s.button}>BUY NOW</button>
            </div>
          </div>

        <div className={classNames(s.description)}>
          <img src={`${process.env.PUBLIC_URL}/bird.png`} alt=""/>
          You will receive an email confirmation when recipient accepts your gift. Scentbird ships between the 15th and the 18th of every month. Recipient will receive an email confirmation of shipment every month. Please allow 5-7 days for delivery.
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChange: (name, value) => {
    dispatch(onChange(name, value))
    dispatch(validate())
  },
  onSubmit: (ev) => {
    ev.preventDefault();

    dispatch(onSubmit())
    dispatch(validate())
    
    return false
  } // for the sake of simplicity in the emulated environment
})

export default connect(() => ({}), mapDispatchToProps)(SubscriptionForm);
