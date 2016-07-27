class LawsuitsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lawsuits: props.initialLawsuits,
      meta: props.meta,
    };
  }

  handleTableRowClick(row, e) {
    window.location = Routes.lawsuit_path(row);
  }

  fetchLawsuits(pageNumber) {
    // Building url with paramaters based on input.
    let url = `${Routes.lawsuits_path()}?page=${pageNumber}&status=${statusCheckbox.checked ? 'all' : 'active'}&user=${usersDropdown.value}`;

    // Add search parameter if provided.
    if (searchInput.value.trim) {
      url += `&search=${searchInput.value}`;
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
                placeholder="Sök på klient, uppdrag eller ärendenummer"
                autoFocus="true"
                onChange={() => this.fetchLawsuits(1)}
                ref={node => { searchInput = node; }}
              />
            </form>
          </div>
        </div>
        <div className="row paginator-row">
          <fieldset className="checkbox col-lg-3">
            <label>
              <input
                type="checkbox"
                onChange={() => this.fetchLawsuits(1)}
                ref={node => { statusCheckbox = node; }}
              /> Visa arkiverade ärenden
            </label>
          </fieldset>
          <fieldset className="col-lg-5">
            <UsersDropdown
              changeEvent={() => this.fetchLawsuits(1)}
              selectedUser={this.props.currentUserId}
            />
          </fieldset>
          <div className="col-lg-4">
            {state.meta.totalPages === 0 ? '' :
              <Paginator
                totalPages={state.meta.totalPages}
                currentPage={state.meta.currentPage}
                nextPage={state.meta.nextPage}
                prevPage={state.meta.previousPage}
                onPaginate={(pageNumber) => this.fetchLawsuits(pageNumber)}
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
