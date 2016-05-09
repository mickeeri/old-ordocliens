class LawsuitShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lawsuit: props.initialLawsuit,
      editMode: false,
      links: props.links,
      page: 'info',
    };

    this.togglePage = this.togglePage.bind(this);
  }

  togglePage(e) {
    e.preventDefault();
    this.setState({ page: e.target.name });
  }

  // componentDidMount() {
  //   PubSub.subscribe('lawsuitTouched', this.refreshLawsuit);
  // }
  //
  // componentWillUnmount() {
  //   PubSub.unsubscribe('lawsuitTouched');
  // }
  //
  // refreshLawsuit() { // Refresh legal case from server.
  //   const url = Routes.lawsuit_path(this.props.initialLawsuit.id);
  //   makeGetRequest(url)
  //     .success(response => {
  //       this.setState({ lawsuit: response.lawsuit });
  //     })
  //     .error(xhr => {
  //       console.error(url, xhr.status, xhr.statusText);
  //     });
  // }

  render() {
    return (
      <div>
        <BreadCrumb active={this.state.lawsuit.name} links={this.state.links} />
        <div className="row">
          <div className="col-md-4">
            <h2>Ärende nr {this.props.initialLawsuit.id}</h2>
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
