class CounterpartLawsuitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lawsuits: props.lawsuits };
  }

  // componentDidMount() {
  //   PubSub.subscribe('counterpartListUpdated', this.refreshCounterParts.bind(this));
  // }
  //
  // componentWillUnmount() {
  //   PubSub.unsubscribe('counterpartListUpdated');
  // }
  //
  // refreshCounterParts() {
  //   const url = `/lawsuits/${this.props.lawsuitId}/counterparts`;
  //   makeGetRequest(url)
  //     .success(res => {
  //       this.setState({ counterparts: res.counterparts });
  //       PubSub.publish('dismissEdit');
  //     })
  //     .error(xhr => {
  //       console.error(url, xhr.status, xhr.statusText);
  //     });
  // }

  render() {
    return (
      <div className="row counterpart-client-card">
        {this.state.lawsuits.map(lawsuit =>
          <div className="col-md-12" key={lawsuit.id}>
            <div>
              <div>
                <a className="card-title" href={Routes.lawsuit_path(lawsuit.id)}>
                  {lawsuit.name}
                </a>
                <span> ({lawsuit.createdAt = new Date().yyyymmdd()})</span>
              </div>
              <div>

                <strong> mot</strong>
                <ul>
                  {lawsuit.clients.map(client =>
                    <li key={lawsuit.id + client.id}>
                      <a href={Routes.client_path(client.id)}>{client.lastName} {client.firstName}</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <hr />
          </div>

        )}
      </div>
    );
  }
}

CounterpartLawsuitList.propTypes = {
  lawsuits: React.PropTypes.array.isRequired,
};
