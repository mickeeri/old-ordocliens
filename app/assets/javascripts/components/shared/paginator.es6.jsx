class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
  }

  componentDidUpdate() {
    // Make sure number in input field is updated.
    paginationInput.value = this.props.currentPage;
  }

  handleNextClick(e) {
    e.preventDefault();
    if (this.props.nextPage) {
      $('.page-number').focus();
      paginationInput.value = this.props.nextPage;
      this.props.onPaginate(this.props.nextPage);
    }

    return false;
  }

  handlePrevClick(e) {
    e.preventDefault();
    if (this.props.prevPage) {
      $('.page-number').focus();
      paginationInput.value = this.props.prevPage;
      this.props.onPaginate(this.props.prevPage);
    }

    return false;
  }

  handleNumChange(e) { // If page number is changed by input.
    if (e.target.value <= this.props.totalPages || e.target.value === '') {
      if (e.target.value !== '') {
        this.props.onPaginate(parseInt(e.target.value, 10));
      }
    }

    return false;
  }

  handleOnFocus(e) { // Select text on focus.
    const target = e.target;
    setTimeout(() => {
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
          onClick={this.handlePrevClick}
        >
          <span aria-hidden="true">« Föregående</span>
        </button>
        <div className="hidden-sm-down">
          <p>Sida: </p>
          <input
            className="form-control form-control-sm page-number"
            onChange={this.handleNumChange}
            type="text"
            defaultValue={this.props.currentPage}
            onFocus={this.handleOnFocus}
            ref={node => { paginationInput = node; }}
          >
          </input>
          <p>av {this.props.totalPages}</p>
        </div>
        <button
          className={
            this.props.nextPage ?
            'btn btn-secondary btn-sm' :
            'btn btn-secondary btn-sm disabled'
          }
          onClick={this.handleNextClick}
        >
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
