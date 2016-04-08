class ClientPagination extends React.Component {
  displayName: 'ClientPagination';

  constructor(props)  {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    return this.props.onPaginate(e)
  }

  render() {
    var e;
    return this.props.totalPages > 1 ? React.DOM.ul({className: "pagination"}, function() {
      var t, n, r;
      for (r = [], e = t = 1, n = this.props.totalPages; n >= 1 ? n >= t : t >= n; e = n >= 1 ? ++t : --t)
        r.push(React.DOM.li({key: e}, e === this.props.currentPage ? React.DOM.span(null, "\xa0") : <PaginatorLink pageNumber={e} onPaginatorLinkClick={this.handleOnClick}/>));
      return r
    }.call(this)) : React.DOM.div(null, "\xa0")
  }
}
