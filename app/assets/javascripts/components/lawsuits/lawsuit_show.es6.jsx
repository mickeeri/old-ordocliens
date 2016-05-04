class LawsuitShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legal_case: props.initialLawsuit,
      editMode: false,
    };
    this.refreshLawsuit = this.refreshLawsuit.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('legalCaseTouched', this.refreshLawsuit);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('legalCaseTouched');
  }

  refreshLawsuit() { // Refresh legal case from server.
    const url = Routes.client_legal_case_path(
      this.props.clientId,
      this.props.initialLawsuit.id);
    makeGetRequest(url)
      .success(response => {
        this.setState({ legal_case: response.legal_case });
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <BreadCrumb active={this.state.legal_case.name} links={this.props.links} />
        <div className="row">
          <div className="col-md-9">
            <div className="card card-block">
              <LawsuitForm
                initialLawsuit={this.state.legal_case}
                clientId={this.props.clientId} />
            </div>
          </div>
          <div className="col-md-3">
            <DeleteLawsuitButton
              clientId={this.props.clientId}
              legalCaseId={this.props.initialLawsuit.id} />
          </div>
        </div>
        <div className="row">
          <TasksIndex
            initialTasks={this.props.tasks}
            legalCaseId={this.props.initialLawsuit.id}
            clientId={this.props.clientId}
            priceCategories={this.props.priceCategories}
          />
        </div>
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
