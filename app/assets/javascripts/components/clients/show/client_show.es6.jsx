class ClientShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: props.initialClient,
      editMode: false,
      links: props.links,
    };

    this.refreshClient = this.refreshClient.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('editModeButtonClicked', this.toggleEditMode);
    PubSub.subscribe('deleteClientConfirmed', this.deleteClient);
    PubSub.subscribe('clientUpdated', this.refreshClient);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('editModeButtonClicked');
    PubSub.unsubscribe('deleteClientConfirmed');
    PubSub.unsubscribe('clientUpdated');
  }

  refreshClient() {
    makeGetRequest(Routes.client_path(this.state.client.id))
      .success(response => {
        this.setState({ client: response.client });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <BreadCrumb
          active={`${this.state.client.firstName} ${this.state.client.lastName}`}
          links={this.state.links}
        />
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-block">
                  <ClientForm client={this.state.client} header="" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ClientDeleteButton clientId={this.props.initialClient.id} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <LawsuitIndex
                  lawsuits={this.props.initialClient.lawsuits}
                  clientId={this.props.initialClient.id}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <CounterpartsIndex
                  lawsuits={this.props.initialClient.lawsuits}
                  initialCounterparts={this.props.counterparts}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClientShow.propTypes = {
  initialClient: React.PropTypes.object.isRequired,
  links: React.PropTypes.array.isRequired,
  counterparts: React.PropTypes.array.isRequired,
};
