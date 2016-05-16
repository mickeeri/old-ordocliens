class LawsuitsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lawsuits: props.initialLawsuits,
      meta: props.meta,
      fetchData: {
        search: '',
        page: 1,
      },
    };
    // Binding functions.
    this.fetchLawsuits = this.fetchLawsuits.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnPaginate = this.handleOnPaginate.bind(this);
  }

  handleOnSearch() {
    this.state.fetchData.search = this.refs.search.value;
    this.fetchLawsuits();
  }

  handleOnPaginate(pageNumber) {
    this.state.fetchData.page = pageNumber;
    this.fetchLawsuits();
  }

  fetchLawsuits() {
    const data = this.state.fetchData;

    // Building uri:s with query string parameters.
    const url = data.search
      ? `${Routes.lawsuits_path()}?search=${data.search}&page=1`
      : `${Routes.lawsuits_path()}?page=${data.page}`;

    makeGetRequest(url)
      .success(response => {
        this.setState({ lawsuits: response.lawsuits, meta: response.meta });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h1>Ärenden</h1>
          </div>
          <div className="col-md-8">
            <form>
              <input
                className="form-control"
                placeholder="Sök på uppdrag, domstol, målnummer eller ärendenummer"
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
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="col-sm-2">Ärendenummer</th>
                <th className="col-sm-5">Uppdrag</th>
                <th className="col-sm-5">Huvudklient</th>
              </tr>
            </thead>
            <tbody>
              {this.state.lawsuits.map(lawsuit =>
                <tr key={lawsuit.id}>
                  <td><a href={Routes.lawsuit_path(lawsuit.id)}>{lawsuit.slug}</a></td>
                  <td>{lawsuit.name}</td>
                  <td>{lawsuit.primaryClient}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

LawsuitsIndex.propTypes = {
  initialLawsuits: React.PropTypes.array.isRequired,
  meta: React.PropTypes.object.isRequired,
};
