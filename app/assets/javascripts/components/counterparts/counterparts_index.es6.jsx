class CounterpartsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counterparts: props.initialCounterparts,
      meta: props.meta,
      fetchData: {
        search: '',
        page: 1,
      },
    };
    // Binding functions.
    this.fetchCounterparts = this.fetchCounterparts.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnPaginate = this.handleOnPaginate.bind(this);
  }

  handleOnSearch() {
    this.state.fetchData.search = this.refs.search.value;
    this.fetchCounterparts();
  }

  handleOnPaginate(pageNumber) {
    this.state.fetchData.page = pageNumber;
    this.fetchCounterparts();
  }

  fetchCounterparts() {
    const data = this.state.fetchData;

    // Building uri:s with query string parameters.
    const url = data.search
      ? `${Routes.counterparts_path()}?search=${data.search}&page=1`
      : `${Routes.counterparts_path()}?page=${data.page}`;

    makeGetRequest(url)
      .success(response => {
        this.setState({ counterparts: response.counterparts, meta: response.meta });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 index-header">
            <h1>Motparter</h1>
          </div>
          <div className="col-md-8">
            <form>
              <input
                className="form-control"
                placeholder="Sök på namn eller personnummer"
                autoFocus="true"
                onChange={this.handleOnSearch}
                ref="search"
              />
            </form>
            {this.state.meta.totalPages === 1 ? '' :
              <Paginator
                totalPages={this.state.meta.totalPages}
                currentPage={this.state.meta.currentPage}
                nextPage={this.state.meta.nextPage}
                prevPage={this.state.meta.previousPage}
                onPaginate={this.handleOnPaginate}
              />
            }
          </div>
        </div>
        <div className="row">
          <table className="table table-bordered col-md-12">
            <thead className="thead-inverse">
              <tr>
                <th>Namn</th>
                <th>Personnummer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.counterparts.map(counterpart =>
                <tr key={counterpart.id}>
                  <td><a href={Routes.counterpart_path(counterpart.id)}>{counterpart.name}</a></td>
                  <td>{counterpart.personalNumber}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

CounterpartsIndex.propTypes = {
  initialCounterparts: React.PropTypes.array.isRequired,
  meta: React.PropTypes.object.isRequired,
};
