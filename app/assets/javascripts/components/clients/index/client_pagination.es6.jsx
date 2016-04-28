'use strict';

class Paginator extends React.Component {
  constructor(props)  {
    super(props);
    this.state = { currentPage: props.currentPage };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
  }

  handleNextClick(e) {
    e.preventDefault();
    if (this.props.nextPage) {
      $('.page-number').focus();
      this.setState({ currentPage: this.props.nextPage });
      return this.props.onPaginate(this.props.nextPage);
    }
  }

  handlePrevClick(e) {
    e.preventDefault();
    if (this.props.prevPage) {
      $('.page-number').focus();
      this.setState({ currentPage: this.props.prevPage });
      return this.props.onPaginate(this.props.prevPage);
    }
  }

  handleNumChange(e) { // If page number is changed by input.
    if (e.target.value <= this.props.totalPages || e.target.value == '') {
      this.setState({ currentPage: e.target.value });
      if (e.target.value !== '') {
        return this.props.onPaginate(parseInt(e.target.value));
      }
    }
  }

  handleOnFocus(e) { // Select text on focus.
    var target = e.target;
    setTimeout(function () {
      target.select();
    }, 0);
  }

  render() {
    return (
      <div className="paginator pull-md-right">
        <button
          className={
            this.props.prevPage ?
            'btn btn-secondary btn-sm' :
            'btn btn-secondary btn-sm disabled'
          }
          onClick={this.handlePrevClick}>
          <span aria-hidden="true">« Föregående</span>
        </button>
        <div>
          <p>Sida: </p>
          <input className="form-control form-control-sm page-number"
            onChange={this.handleNumChange}
            type="text"
            value={this.state.currentPage}
            onFocus={this.handleOnFocus}>
          </input>
          <p>av {this.props.totalPages}</p>
        </div>
        <button className={
            this.props.nextPage ?
            'btn btn-secondary btn-sm' :
            'btn btn-secondary btn-sm disabled'
          }
          onClick={this.handleNextClick}>
          <span aria-hidden="true">Nästa »</span>
        </button>
      </div>
    );
  }
}

Paginator.propTypes = {
  totalPages: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  nextPage: React.PropTypes.number,
  prevPage: React.PropTypes.number,
  onPaginate: React.PropTypes.func.isRequired,
};
