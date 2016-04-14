class ClientShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: props.client,
      editMode: false,
      showConfirmDelete: false, };
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.subscribeToEvents = this.subscribeToEvents.bind(this);
    this.unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.refreshClient = this.refreshClient.bind(this);
  }

  componentDidMount() {
    this.subscribeToEvents();
  }

  componentWillUnmount() {
    this.unsubscribeToEvents();
  }

  subscribeToEvents() {
    PubSub.subscribe('editModeButtonClicked', this.toggleEditMode);
    PubSub.subscribe('deleteClientConfirmed', this.deleteClient);
    PubSub.subscribe('clientUpdated', this.refreshClient);
  }

  unsubscribeToEvents() {
    PubSub.unsubscribe('editModeButtonClicked');
    PubSub.unsubscribe('deleteClientConfirmed');
    PubSub.unsubscribe('clientUpdated');
  }

  refreshClient () {
    makeGetRequest(Routes.client_path(this.state.client.id))
      .then(response=> {
        console.log(response);
        this.setState({ client: response.client, editMode: false });
      });
  }

  // Toggle boolean editMode.
  toggleEditMode() {
    if (this.state.editMode) {
      this.setState({ editMode: false });
    } else {
      this.setState({ editMode: true });
    }
  }

  deleteClient() {
    deleteRequest(Routes.client_path(props.client.id))
      .then(response=> {
        if (response.status === 200) {
          window.location = Routes.clients_path();
        }
      });
  }

  render() {
    var content;

    // Showing either form or regular text based on value of boolean editMode.
    if (this.state.editMode) {
      content = <ClientEditForm client={this.state.client} editMode={this.state.editMode} />;
    } else {
      content = <ClientInfo client={this.state.client} />;
    }

    return (
      <div className="row">
        {content}
        <div className="col-md-3">
          <div className="panel panel-default">
            <ClientShowButtons />
          </div>
        </div>
      </div>
    );
  }
}
