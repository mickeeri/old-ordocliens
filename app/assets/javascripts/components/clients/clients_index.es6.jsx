class ClientsIndex extends React.Component {
  constructor(props) {
    super(props);

    // Initializing state.
    this.state = {
      clients: props.clients,
      meta: props.meta,
    };

    this.fetchClients = this.fetchClients.bind(this);
  }

  fetchClients(pageNumber) {
    // Building url with query string parameters.
    let url = `${Routes.clients_path()}?page=${pageNumber}`;
    url += `&filter=${filterCheckbox.checked ? 'all' : 'users'}`;

    if (searchInput.value.trim) {
      url += `&search=${searchInput.value}`;
    }

    makeGetRequest(url)
      .success(response => {
        this.setState({ clients: response.clients, meta: response.meta });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  addClientClick() {
    window.location = Routes.new_client_path();
  }

  render() {
    const state = this.state;
    return (
      <div>
        <div className="row index-header">
          <div className="col-md-6">
            <h1>Klientregister</h1>
          </div>
          <div className="col-md-6">
            <form>
              <input
                autoFocus="true"
                className="form-control"
                onChange={() => this.fetchClients(1)}
                placeholder="Sök på namn eller personnummer"
                ref={node => { searchInput = node; }}
              />
            </form>
          </div>
        </div>
        <div className="row paginator-row">
          <fieldset className="checkbox col-md-6">
            <label>
              <input
                type="checkbox"
                ref={node => { filterCheckbox = node; }}
                onChange={() => this.fetchClients(1)}
              /> Visa alla klienter
            </label>
          </fieldset>
          <div className="col-md-6">
            {this.state.meta.totalPages === 0 ? '' :
              <Paginator
                totalPages={state.meta.totalPages}
                currentPage={state.meta.currentPage}
                nextPage={state.meta.nextPage}
                prevPage={state.meta.previousPage}
                onPaginate={(pageNumber) => this.fetchClients(pageNumber)}
              />}
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-bordered col-md-12">
              <thead className="thead-inverse">
                <tr>
                  <th>Namn</th>
                  <th>Personnummer</th>
                  <th>Handläggare</th>
                </tr>
              </thead>
              <tbody>
                {state.clients.map(client =>
                  <ClientRow key={client.id} client={client} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ClientsIndex.propTypes = {
  clients: React.PropTypes.array.isRequired,
  meta: React.PropTypes.object.isRequired,
};
