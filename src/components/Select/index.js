import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Styles
import s from './styles.module.scss';

// Component
class Select extends Component {
  // Bind function once
  onChange = (ev) => {
    this.props.onChange(this.props.name, ev.target.value)
  }

  render() {
    const { name, label, value='', touched, error, options=[], defaultOption='', className='' } = this.props;

    const hasError = touched && error;
    const hasValue = value !== ''

    return (
      <div className={classNames(s.root, { [s.error]: hasError, [s.hasValue]: hasValue })}>
        <div className={s.container}>
          <select name={name} className={classNames(s.input, className)} value={value} onChange={this.onChange}>
            <option value="" className={s.placeholder}>{defaultOption}</option>
            {options.map(x => <option key={`${name}-${x.value}`} value={x.value}>{x.text}</option>)}
          </select>
        </div>
        {hasError ? <div className={s.helper}>{error}</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  value: state[ownProps.form].values[ownProps.name],
  error: state[ownProps.form].errors[ownProps.name] || null,
  touched: state[ownProps.form].meta.touched
})

export default connect(mapStateToProps)(Select);
