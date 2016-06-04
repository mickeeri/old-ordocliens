class LawsuitShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: props.lawsuit.closed,
      expenses: props.expenses,
      primaryClient: props.lawsuit.primaryClient,
      clientFunds: props.clientFunds,
      message: '',
      page: 'time',
      tasks: this.props.tasks };
    this.displayUpdateMessage = this.displayUpdateMessage.bind(this);
    this.refreshExpenses = this.refreshExpenses.bind(this);
    this.refreshTasks = this.refreshTasks.bind(this);
    this.removePrimaryClientHeader = this.removePrimaryClientHeader.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.toggleClosed = this.toggleClosed.bind(this);
    this.togglePage = this.togglePage.bind(this);
    this.refreshClientFunds = this.refreshClientFunds.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('expensesTouched', this.refreshExpenses);
    PubSub.subscribe('clientFundsTouched', this.refreshClientFunds);
    PubSub.subscribe('lawsuitClosedOpened', this.toggleClosed);
    PubSub.subscribe('lawsuitUpdated', this.displayUpdateMessage);
    PubSub.subscribe('noPrimaryClient', this.removePrimaryClientHeader);
    PubSub.subscribe('tasksTouched', this.refreshTasks);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('expensesTouched');
    PubSub.unsubscribe('lawsuitClosedOpened');
    PubSub.unsubscribe('lawsuitUpdated');
    PubSub.unsubscribe('noPrimaryClient');
    PubSub.unsubscribe('tasksTouched');
    PubSub.unsubscribe('clientFundsTouched');
  }

  // Show success message on update.
  setMessage() {
    $('#updatedLawsuitMessage').fadeIn();
    $('#updatedLawsuitMessage').fadeOut(2000);
  }

  removePrimaryClientHeader() {
    this.setState({ primaryClient: '' });
  }

  displayUpdateMessage() {
    this.setState({ message: 'Ärende uppdaterat!' });
    this.setMessage();
  }

  toggleClosed() {
    const updateMessage = this.state.closed ? 'Ärende öppnat!' : 'Ärende arkiverat!';
    this.setState({ message: updateMessage, closed: !this.state.closed });
    this.setMessage();
  }

  togglePage(e) {
    e.preventDefault();
    this.setState({ page: e.target.name });
  }

  refreshTasks() {
    const url = Routes.lawsuit_tasks_path(this.props.lawsuit.id);
    makeGetRequest(url)
      .success(response => {
        this.setState({ tasks: response.tasks });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  refreshExpenses() {
    const url = Routes.lawsuit_expenses_path(this.props.lawsuit.id);
    makeGetRequest(url)
      .success(response => {
        this.setState({ expenses: response.expenses });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        // TODO: Message in dom.
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  refreshClientFunds() {
    const url = Routes.lawsuit_client_funds_path(this.props.lawsuit.id);
    makeGetRequest(url)
      .success(response => {
        this.setState({ clientFunds: response });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        // TODO: Message in dom.
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <div className="row lawsuit-header">
          <div className="col-md-6">
            <h2>Ärende {this.props.lawsuit.slug}
              <span className="text-danger">
                {this.state.closed ? ' (Arkiverat)' : ''}
              </span>
            </h2>
            <h5>
              <a href={this.props.primaryClient.link}>
                {this.props.primaryClient.firstName} {this.props.primaryClient.lastName}
              </a>
            </h5>
          </div>
          <div className="col-md-6 content-right lawsuit-menu">
            <a
              className={this.state.page === 'time' ? 'active' : ''}
              href="#"
              name="time"
              onClick={this.togglePage}
            >Tidrapportering</a>
            <a
              className={this.state.page === 'info' ? 'active' : ''}
              href="#" name="info"
              id="info-link"
              onClick={this.togglePage}
            >Info</a>
          </div>
        </div>
        <p id="updatedLawsuitMessage" className="text-success">{this.state.message}</p>
        {this.state.page === 'info' ?
          <LawsuitInfo
            initialLawsuit={this.props.lawsuit}
            closed={this.state.closed}
            primaryClientId={this.props.primaryClient.id}
          /> :
          <TasksIndex
            clientFunds={this.state.clientFunds}
            expenses={this.state.expenses}
            lawsuitId={this.props.lawsuit.id}
            tasks={this.state.tasks}
          />}
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  clientFunds: React.PropTypes.object,
  clientId: React.PropTypes.number,
  expenses: React.PropTypes.array,
  lawsuit: React.PropTypes.object.isRequired,
  primaryClient: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array,
};
