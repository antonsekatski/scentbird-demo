import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Styles
import s from './styles.module.scss';

// Component
class Input extends Component {
  // Bind function once
  onChange = (ev) => {
    this.props.onChange(this.props.name, ev.target.value)
  }

  render() {
    const { name, label, value, touched, error, className='' } = this.props;

    const hasError = touched && error;

    return (
      <div className={classNames(s.root, { [s.error]: hasError })}>
        <div className={s.container}>
          <input name={name} className={classNames(s.input, className)} value={value} onChange={this.onChange} placeholder=" " />
          <label className={s.label}>{label}</label>
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

export default connect(mapStateToProps)(Input);
