import React, { Component } from 'react';

// Components
import Input from '../Input';
import Select from '../Select';

// Styles
import s from './styles.module.scss';

const months = Array.from({length: 12}, (v, k) => k).map(x => ({ value: x, text: (x + 1).toString() }))
const years = Array.from({length: 5}, (v, k) => 2018 + k).map(x => ({ value: x, text: x.toString() }))

// Component
class CardForm extends Component {
  render() {
    const { form, onChange } = this.props;

    return (
      <div className={s.root}>
        <div className={s.top}>
          <div className={s.protected}>
            <img src={`${process.env.PUBLIC_URL}/protected.png`} alt=""/>
            128-BIT ENCRYPTION. YOU’RE SAFE
          </div>
          
          <div>
            <img src={`${process.env.PUBLIC_URL}/cards.png`} alt=""/>
          </div>
        </div>

        <div className="columns is-variable is-2">
          <div className="column is-8">
            <div className="columns">
              <div className="column">
                <Input form={form} label="Credit card number" name="cc_number" onChange={onChange} className={s.whiteInput} />
              </div>
            </div>
      
            <div className="columns is-variable is-2">
              <div className="column is-3">
                <Select form={form} name="cc_month" defaultOption="Month" options={months} onChange={onChange} className={s.whiteInput} />
              </div>
              <div className="column is-3">
                <Select form={form} name="cc_year" defaultOption="Year" options={years} onChange={onChange} className={s.whiteInput} />
              </div>
            </div>
          </div>
          <div className="column is-4">
            <Input form={form} label="Security Code" name="cc_code" onChange={onChange} className={s.whiteInput} />
          </div>
        </div>
      </div>
    );
  }
}

export default CardForm;
