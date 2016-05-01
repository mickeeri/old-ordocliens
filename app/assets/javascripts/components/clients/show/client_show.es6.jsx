class ClientShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: props.initial_client,
      editMode: false,
      links: props.links,
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
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

  refreshClient () {
    makeGetRequest(Routes.client_path(this.state.client.id))
      .success(response=> {
        this.toggleEditMode();
        this.setState({ client: response.client });
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  // Toggle boolean editMode.
  toggleEditMode() {
    if (this.state.editMode) {
      this.setState({ editMode: false });
      $('.edit-client-button').removeClass('active');
    } else {
      this.setState({ editMode: true });
      $('.edit-client-button').addClass('active');
    }
  }

  render() {
    var content;

    // Showing either form or regular text based on value of boolean editMode.
    if (!this.state.editMode) {
      content = <ClientEditForm client={this.state.client} header="" />;
    } else {
      content = <ClientInfo client={this.state.client} />;
    }

    return (
      <div>
        <BreadCrumb
          active={this.state.client.first_name + ' ' + this.state.client.last_name}
          links={this.state.links}
        />
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                {content}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ClientDeleteButton clientId={this.props.initial_client.id} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <LegalCasesIndex legalCases={this.props.initial_client.legal_cases}
                  clientId={this.props.initial_client.id} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <CounterpartsIndex
                  initialCounterparts={this.props.initial_client.counterparts}
                  clientId={this.props.initial_client.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClientShow.PropTypes = {
  initial_client: React.PropTypes.object.isRequired,
  legal_cases: React.PropTypes.array,
  links: React.PropTypes.array.isRequired,
};
