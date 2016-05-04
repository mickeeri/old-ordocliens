class LawsuitShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legal_case: props.init_legal_case,
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

  refreshLawsuit () { // Refresh legal case from server.
    var url = Routes.client_legal_case_path(
      this.props.client_id,
      this.props.init_legal_case.id);
    makeGetRequest(url)
      .success(response=> {
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
              <LawsuitEditForm
                initialLawsuit={this.state.legal_case}
                clientId={this.props.client_id} />
            </div>
          </div>
          <div className="col-md-3">
            <DeleteLawsuitButton
              clientId={this.props.client_id}
              legalCaseId={this.props.init_legal_case.id} />
          </div>
        </div>
        <div className="row">
          <TasksIndex
            initialTasks={this.props.tasks}
            legalCaseId={this.props.init_legal_case.id}
            clientId={this.props.client_id}
            priceCategories={this.props.price_categories} />
        </div>
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  client_id: React.PropTypes.number.isRequired,
  init_legal_case: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array,
  price_categories: React.PropTypes.array.isRequired,
  links: React.PropTypes.array.isRequired,
};
