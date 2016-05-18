class LawsuitShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: props.lawsuit.closed,
      page: 'time',
      message: '',
    };

    this.togglePage = this.togglePage.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.toggleClosed = this.toggleClosed.bind(this);
    this.displayUpdateMessage = this.displayUpdateMessage.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('lawsuitUpdated', this.displayUpdateMessage);
    PubSub.subscribe('lawsuitClosedOpened', this.toggleClosed);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('lawsuitUpdated');
    PubSub.unsubscribe('lawsuitClosedOpened');
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="lawsuit-header">Ärende {this.props.lawsuit.slug}
              <span className="text-danger">
                {this.state.closed ? ' (Arkiverat)' : ''}
              </span>
            </h2>
            <h5>{this.props.lawsuit.primaryClient}</h5>
            <p
              id="updatedLawsuitMessage"
              className="text-success"
            >{this.state.message}</p>
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
        <hr />
        {this.state.page === 'info' ?
          <LawsuitInfo initialLawsuit={this.props.lawsuit} closed={this.state.closed} /> :
          <TasksIndex
            initialTasks={this.props.tasks}
            lawsuitId={this.props.lawsuit.id}
            priceCategories={this.props.priceCategories}
          />}
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  clientId: React.PropTypes.number,
  lawsuit: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array,
  priceCategories: React.PropTypes.array.isRequired,
};
