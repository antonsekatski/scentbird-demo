import React, { Component } from 'react';

// Styles
import s from './styles.module.scss';

// Component
class Product extends Component {
  render() {
    return (
      <div className={s.root}>

        <div className={s.image}>
          <img src={`${process.env.PUBLIC_URL}/product.png`} alt=""/>
        </div>

        <div className={s.block}>
          <div className={s.feature}>
            Monthly subscription
            <span>$14.95</span>
          </div>

          <div className={s.feature}>
            Shipping
            <span>FREE</span>
          </div>

          <div className={s.feature}>
            Tax
            <span>$2.35</span>
          </div>

          <div className={s.feature}>
            Tax
            <span>-$5</span>
          </div>

          <div className={s.feature}>
            Credit (Balance $100)
            <span>
               <label className={s.checkbox}>
                $50
                <input type="checkbox" />
                <span></span>
              </label>
            </span>
          </div>
        </div>

        <div className={s.feature}>
          TOTAL
          <span>$25</span>
        </div>

        <div className={s.coupon}>
          Have a <a href="#">coupon code</a>?
        </div>
      </div>
    );
  }
}

export default Product;
