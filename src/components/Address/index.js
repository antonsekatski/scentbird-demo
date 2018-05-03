import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Components
import Input from '../Input';
import Select from '../Select';

// Constants
const states = [{ value: 1, text: 'New York' }]
const cities = [{ value: 1, text: 'New York' }]
const countries = [{ value: 1, text: 'United States' }]

// Component
class Address extends Component {
  render() {
    const { onChange, form, prefix } = this.props;

    return (
      <div>
        <div className={classNames('columns', 'is-variable', 'is-2', 'group')}>
          <div className="column is-8">
            <Input form={form} label="Street address" onChange={onChange} name={`${prefix}_street`} onChange={onChange} />
          </div>
          <div className="column is-4">
            <Input form={form} label="Apt/Suite (Optional)" name={`${prefix}_apt`} onChange={onChange} />
          </div>
        </div>

        <div className={classNames('columns', 'is-variable', 'is-2', 'group')}>
          <div className="column is-4">
            <Input form={form} label="Zip" name={`${prefix}_zip`} onChange={onChange} />
          </div>
          <div className="column is-4">
            <Select form={form} label="City" name={`${prefix}_city`} defaultOption="City" options={cities} onChange={onChange} />
          </div>
          <div className="column is-4">
            <Select form={form} label="State" name={`${prefix}_state`} defaultOption="State" options={states} onChange={onChange} />
          </div>
        </div>

        <div className={classNames('columns', 'is-variable', 'is-2', 'group')}>
          <div className="column">
            <Select form={form} label="State" name={`${prefix}_country`} defaultOption="Country" options={countries} onChange={onChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default Address;