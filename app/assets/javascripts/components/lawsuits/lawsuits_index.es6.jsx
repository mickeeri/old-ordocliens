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
    this.fetchLawsuits = this.fetchLawsuits.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnPaginate = this.handleOnPaginate.bind(this);
    this.handleOnCheckboxChange = this.handleOnCheckboxChange.bind(this);
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
    // Building url with paramaters based on input.
    let url = `${Routes.lawsuits_path()}?page=${data.page}&fetch_all=${data.fetchAll ? '1' : '0'}&user=${data.user}`;
    if (data.search) {
      this.state.fetchData.page = 1;
      url += `&search=${data.search}`;
    }

    makeGetRequest(url)
      .success(response => {
        this.setState({ lawsuits: response.lawsuits, meta: response.meta });
      })
      .error(xhr => {
        showErrorText(`Kunde inte hämta ärenden från servern. Status: ${xhr.status}.`,
        '#lawsuit-index-message');
      });
  }

  render() {
    const state = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 index-header">
            <h1>Ärenden</h1>
          </div>
          <div className="col-md-6">
            <form>
              <input
                className="form-control"
                placeholder="Sök på ärende, klient eller motpart"
                autoFocus="true"
                onChange={this.handleOnSearch}
                ref="search"
              />
            </form>
          </div>
        </div>
        <div className="row paginator-row">
          <fieldset
            className="checkbox col-lg-3"
            disabled={state.fetchData.search.length > 0}
          >
            <label>
              <input
                type="checkbox"
                onChange={this.handleOnCheckboxChange}
              /> Visa arkiverade ärenden
            </label>
          </fieldset>
          <fieldset
            className="col-lg-5"
            disabled={state.fetchData.search.length > 0}
          >
            <UsersDropdown
              changeEvent={this.setSelectedUser}
              selectedUser={state.fetchData.user}
            />
          </fieldset>
          <div className="col-lg-4">
            {state.meta.totalPages === 1 ? '' :
              <Paginator
                totalPages={state.meta.totalPages}
                currentPage={state.meta.currentPage}
                nextPage={state.meta.nextPage}
                prevPage={state.meta.previousPage}
                onPaginate={this.handleOnPaginate}
              />
            }
          </div>
        </div>
        <div className="row message" id="lawsuit-index-message"></div>
        <div className="row">
          <div className="table-responsive">
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
                {state.lawsuits.map(lawsuit =>
                  <LawsuitIndexRow key={lawsuit.id} lawsuit={lawsuit} />
                )}
              </tbody>
            </table>
          </div>
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
