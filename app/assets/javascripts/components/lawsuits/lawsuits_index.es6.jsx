class LawsuitsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lawsuits: props.initialLawsuits,
      meta: props.meta,
      fetchData: {
        search: '',
        page: 1,
        fetchAll: false,
      },
    };
    // Binding functions.
    this.fetchLawsuits = this.fetchLawsuits.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnPaginate = this.handleOnPaginate.bind(this);
    this.handleOnCheckboxChange = this.handleOnCheckboxChange.bind(this);
  }

  handleOnSearch() {
    this.state.fetchData.search = this.refs.search.value;
    this.fetchLawsuits();
  }

  handleTableRowClick(row, e) {
    window.location = Routes.lawsuit_path(row);
  }

  handleOnPaginate(pageNumber) {
    this.state.fetchData.page = pageNumber;
    this.fetchLawsuits();
  }

  handleOnCheckboxChange(e) {
    this.state.fetchData.fetchAll = e.target.checked;
    this.fetchLawsuits();
  }

  fetchLawsuits() {
    const data = this.state.fetchData;

    // Building uri:s with query string parameters.
    const url = data.search
      ? `${Routes.lawsuits_path()}?search=${data.search}&page=1&all=${data.fetchAll}`
      : `${Routes.lawsuits_path()}?page=${data.page}&all=${data.fetchAll}`;

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
          <div className="col-md-4 index-header">
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
          <div className="checkbox">
            <label><input type="checkbox" onChange={this.handleOnCheckboxChange}/> Visa ej aktiva ärenden
            </label>
          </div>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="first">#</th>
                <th className="long">Uppdrag</th>
                <th className="long">Huvudklient</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.lawsuits.map(lawsuit =>
                <tr key={lawsuit.id} onClick={this.handleTableRowClick.bind(this, lawsuit.id)}>
                  <td><a href={Routes.lawsuit_path(lawsuit.id)}>{lawsuit.slug}</a></td>
                  <td>{lawsuit.lawsuitType.name}</td>
                  <td>{lawsuit.primaryClient}</td>
                  <td
                    className={lawsuit.closed ? 'text-danger' : 'text-success'}
                  >{lawsuit.closed ? 'Arkiverat' : 'Aktivt'}</td>
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
