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
        user: props.currentUserId,
      },
    };
    // Binding functions.
    this.fetchLawsuits = this.fetchLawsuits.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnPaginate = this.handleOnPaginate.bind(this);
    this.handleOnCheckboxChange = this.handleOnCheckboxChange.bind(this);
    // this.handleUsersDropDownChange = this.handleUsersDropDownChange.bind(this);
    this.setSelectedUser = this.setSelectedUser.bind(this);
  }

  // Select user in dropdown to only show that users lawsuits.
  setSelectedUser(e) {
    this.state.fetchData.user = parseInt(e.target.value, 10);
    this.state.fetchData.page = 1;
    this.fetchLawsuits();
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
      ? `${Routes.lawsuits_path()}?search=${data.search}&page=1&all=${data.fetchAll}&user=${data.user}`
      : `${Routes.lawsuits_path()}?page=${data.page}&all=${data.fetchAll}&user=${data.user}`;

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
                placeholder="Sök på ärendenummer, uppdrag, klient, målnummer"
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
          <div className="checkbox col-md-3">
            <label>
              <input
                type="checkbox"
                onChange={this.handleOnCheckboxChange}
              /> Visa arkiverade ärenden
            </label>
          </div>
          <div className="col-md-6">
            <UsersDropdown
              changeEvent={this.setSelectedUser}
              selectedUser={this.state.fetchData.user}
            />
          </div>
        </div>
        <div className="row">
          <table className="table table-hover table-bordered">
            <thead className="thead-inverse">
              <tr>
                <th>Huvudklient</th>
                <th>Uppdrag</th>
                <th>Ärendenummer</th>
                <th>Upplagt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.lawsuits.map(lawsuit =>
                <tr key={lawsuit.id} onClick={this.handleTableRowClick.bind(this, lawsuit.id)}>
                  <td>{lawsuit.primaryClient}</td>
                  <td>{lawsuit.lawsuitType.name}</td>
                  <td>{lawsuit.slug}</td>
                  <td>{lawsuit.createdAt = new Date().yyyymmdd()}</td>
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
  currentUserId: React.PropTypes.number.isRequired,
};
