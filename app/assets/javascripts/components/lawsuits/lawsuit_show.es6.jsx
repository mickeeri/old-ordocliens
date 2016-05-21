class LawsuitShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: props.lawsuit.closed,
      page: 'time',
      message: '',
      tasks: this.props.tasks,
    };

    this.togglePage = this.togglePage.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.toggleClosed = this.toggleClosed.bind(this);
    this.displayUpdateMessage = this.displayUpdateMessage.bind(this);
    this.refreshTasks = this.refreshTasks.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('lawsuitUpdated', this.displayUpdateMessage);
    PubSub.subscribe('lawsuitClosedOpened', this.toggleClosed);
    PubSub.subscribe('tasksTouched', this.refreshTasks);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('lawsuitUpdated');
    PubSub.unsubscribe('lawsuitClosedOpened');
    PubSub.unsubscribe('tasksTouched');
  }

  setMessage() { // Show success message.
    $('#updatedLawsuitMessage').fadeIn();
    $('#updatedLawsuitMessage').fadeOut(2000);
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
            <h5>{this.props.lawsuit.primaryClient}</h5>
          </div>
          <div className="col-md-6 content-right lawsuit-menu">
            <a
              className={this.state.page === 'time' ? 'active' : ''}
              href="#"
              name="time"
              onClick={this.togglePage}
            >Tidrapportering</a>
            <span className="divider">|</span>
            <a
              className={this.state.page === 'info' ? 'active' : ''}
              href="#" name="info"
              onClick={this.togglePage}
            >Info</a>
          </div>
        </div>
        <p id="updatedLawsuitMessage" className="text-success">{this.state.message}</p>
        {this.state.page === 'info' ?
          <LawsuitInfo initialLawsuit={this.props.lawsuit} closed={this.state.closed} /> :
          <TasksIndex
            tasks={this.state.tasks}
            initialExpenses={this.props.expenses}
            lawsuitId={this.props.lawsuit.id}
          />}
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  clientId: React.PropTypes.number,
  lawsuit: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array,
  expenses: React.PropTypes.array,
};
