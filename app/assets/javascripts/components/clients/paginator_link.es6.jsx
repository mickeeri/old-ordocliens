class PaginatorLink extends React.Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    return this.props.onPaginatorLinkClick(this.props.pageNumber);
  }

  render() {
    return (<a href="#" onClick={this.handleOnClick}>{this.props.pageNumber}</a>);
  }
}

PaginatorLink.propTypes = {
  onPaginatorLinkClick: React.PropTypes.func.isRequired,
  pageNumber: React.PropTypes.number.isRequired,
};
