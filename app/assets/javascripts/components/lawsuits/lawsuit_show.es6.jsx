class LawsuitShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lawsuit: props.initialLawsuit,
      editMode: false,
      links: props.links,
      page: 'info',
      message: 'Ärende uppdaterat!',
    };

    this.togglePage = this.togglePage.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('lawsuitUpdated', this.setMessage);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('lawsuitUpdated');
  }

  setMessage() { // Show success message.
    $('#updatedLawsuitMessage').fadeIn();
    $('#updatedLawsuitMessage').fadeOut(2000);
  }

  togglePage(e) {
    e.preventDefault();
    this.setState({ page: e.target.name });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h2 className="lawsuit-header">Ärende nr {this.props.initialLawsuit.id}</h2>
            <p
              id="updatedLawsuitMessage"
              className="text-success"
            >{this.state.message}</p>
          </div>
          <div className="col-md-8 content-right lawsuit-menu">
            <a
              className={this.state.page === 'info' ? 'active' : ''}
              href="#" name="info"
              onClick={this.togglePage}
            >Info</a>
            <span className="divider">|</span>
            <a
              className={this.state.page === 'time' ? 'active' : ''}
              href="#"
              name="time"
              onClick={this.togglePage}
            >Tidrapportering</a>
          </div>
        </div>
        {this.state.page === 'info' ?
          <LawsuitInfo initialLawsuit={this.props.initialLawsuit} /> :
          <TasksIndex
            initialTasks={this.props.tasks}
            lawsuitId={this.props.initialLawsuit.id}
            priceCategories={this.props.priceCategories}
          />}
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  clientId: React.PropTypes.number,
  initialLawsuit: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array,
  priceCategories: React.PropTypes.array.isRequired,
  links: React.PropTypes.array.isRequired,
};
