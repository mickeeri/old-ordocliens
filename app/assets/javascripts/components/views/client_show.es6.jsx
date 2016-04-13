class ClientShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: props.client,
      legalCases: props.legalCases,
      contacts: props.contacts,
      editMode: false,
      showConfirmDelete: false }
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.subscribeToEvents = this.subscribeToEvents.bind(this);
    this.unsubscribeToEvents = this.unsubscribeToEvents.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
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
  }

  unsubscribeToEvents() {
    console.log("unsub");
    PubSub.unsubscribe('editModeButtonClicked');
    PubSub.unsubscribe('deleteClientConfirmed');
  }

  // Toggle boolean editMode.
  toggleEditMode() {
    if (this.state.editMode) {
      this.setState({editMode: false});
    } else {
      this.setState({editMode: true});
    }
  }

  deleteClient() {
    var url = Routes.client_path(this.state.client.id);
    deleteRequest(url)
      .then(response=>{
        if (response.status === 200) {
          window.location = Routes.clients_path();
        }
      });
  }

  render(){
    var content;
    // Showing either form or regular text based on value of boolean editMode.
    if (this.state.editMode) {
      content = <ClientEditForm client={this.state.client} contacts={this.state.contacts} editMode={this.state.editMode} />
    } else {
      content = <ClientInfo client={this.state.client} contacts={this.state.contacts} />
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
