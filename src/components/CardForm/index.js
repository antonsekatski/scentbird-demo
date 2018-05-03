import React, { Component } from 'react';
import classNames from 'classnames';

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
          <div className="column is-8 is-12-mobile">
            <div className="columns is-variable is-2">
              <div className="column">
                <Input form={form} label="Credit card number" name="cc_number" help={true} onChange={onChange} className={s.whiteInput} />
              </div>
            </div>
      
            <div className="columns is-variable is-2 is-mobile">
              <div className={classNames('column', 'is-4', s.mobile6)}>
                <Select form={form} name="cc_month" defaultOption="Month" options={months} onChange={onChange} className={s.whiteInput} />
              </div>
              <div className={classNames('column', 'is-4', s.mobile6)}>
                <Select form={form} name="cc_year" defaultOption="Year" options={years} onChange={onChange} className={s.whiteInput} />
              </div>
              <div className="column is-4 is-hidden-mobile">
                <div className={s.exp}>Exp.</div>
              </div>
            </div>
          </div>
          <div className="column is-4 is-8-mobile">
            <div className={s.question}>
              <Input form={form} label="Security Code" name="cc_code" maxLength={3} onChange={onChange} className={s.whiteInput} />

              <span className={s.questionMark}></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardForm;
