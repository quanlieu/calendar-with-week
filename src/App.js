import React from 'react';
import Calendar from './components/Calendar';

const INCLUSIVE = 'Inclusive';
const EXCLUSIVE = 'Exclusive';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      mode: EXCLUSIVE
    };

    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleGoNextClick = this.handleGoNextClick.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
  }

  handleGoBackClick(e) {
    this.setState({ year: this.state.year - 1 });
  }

  handleGoNextClick(e) {
    this.setState({ year: this.state.year + 1 });
  }

  handleChangeMode(e) {
    this.setState({ mode: e.currentTarget.value });
  }

  render() {
    const { year, mode } = this.state;
    return (
      <div>
        <button onClick={this.handleGoBackClick}>Previous</button>
        <span id="year"> {year} </span>
        <button onClick={this.handleGoNextClick}>Next</button>
        <div className="mode">
          <span>Week numbering mode: </span>
          <input
            type="radio"
            name="mode"
            id="inclusive"
            value={INCLUSIVE}
            onChange={this.handleChangeMode}
            checked={mode === INCLUSIVE}
          />
          <label htmlFor="inclusive">{INCLUSIVE}</label>
          <input
            type="radio"
            name="mode"
            id="exclusive"
            value={EXCLUSIVE}
            onChange={this.handleChangeMode}
            checked={mode === EXCLUSIVE}
          />
          <label htmlFor="exclusive">{EXCLUSIVE}</label>
        </div>
        <Calendar year={year} mode={mode} />
      </div>
    );
  }
}
