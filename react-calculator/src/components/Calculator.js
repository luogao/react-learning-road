import React, { Component } from 'react';
import './Calculator.css'

class Calculator extends Component {
  render() {
    document.body.addEventListener('touchstart', function () { });
    return (
      <div className="calculator">
        <header className="calculator-result-block">
          <div className="result-txt">0</div>
        </header>
        <section className="calculator-control">
          <div className="calc-btn-wrapper">
            <div className="calc-btn-num-wrapper">
              <button className="calc-btn-num large">0</button>
              <button className="calc-btn-num">.</button>
              <button className="calc-btn-num">1</button>
              <button className="calc-btn-num">2</button>
              <button className="calc-btn-num">3</button>
              <button className="calc-btn-num">4</button>
              <button className="calc-btn-num">5</button>
              <button className="calc-btn-num">6</button>
              <button className="calc-btn-num">7</button>
              <button className="calc-btn-num">8</button>
              <button className="calc-btn-num">9</button>
              <div className="sub-action-btn-wrapper">
                <button className="calc-btn-sub-action">C</button>
                <button className="calc-btn-sub-action">-/+</button>
                <button className="calc-btn-sub-action">%</button>
              </div>

            </div>
            <div className="calc-btn-rule-wrapper">
              <button className="calc-btn-rule">/</button>
              <button className="calc-btn-rule">*</button>
              <button className="calc-btn-rule">-</button>
              <button className="calc-btn-rule">+</button>
              <button className="calc-btn-rule">=</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Calculator;
