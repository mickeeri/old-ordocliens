class LegalCaseShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legal_case: props.legal_case,
      links: props.links,
      editMode: false,
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.refreshLegalCase = this.refreshLegalCase.bind(this);
    this.deleteLegalCase = this.deleteLegalCase.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('editModeButtonClicked', this.toggleEditMode);
    PubSub.subscribe('legalCaseUpdated', this.refreshLegalCase);
    PubSub.subscribe('deleteLegalCaseConfirmed', this.deleteLegalCase);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('editModeButtonClicked');
    PubSub.unsubscribe('legalCaseUpdated');
    PubSub.unsubscribe('deleteLegalCaseConfirmed');
  }

  deleteLegalCase() { // Call delete in utils.
    makeDeleteRequest(Routes.client_legal_case_path(this.props.client_id,
                                                    this.props.legal_case.id))
      .success(response=> {
        window.location = Routes.client_path(this.props.client_id);
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  refreshLegalCase () {
    var url = Routes.client_legal_case_path(this.props.client_id, this.state.legal_case.id);
    makeGetRequest(url)
      .success(response=> {
        this.toggleEditMode();
        this.setState({ legal_case: response.legal_case });
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  // Toggle boolean editMode.
  toggleEditMode() {
    if (this.state.editMode) {
      this.setState({ editMode: false });
      $('.edit-button').removeClass('active');
    } else {
      this.setState({ editMode: true });
      $('.edit-button').addClass('active');
    }
  }

  render() {
    var content;
    if (this.state.editMode) {
      content = <LegalCaseEditForm legal_case={this.state.legal_case}
        client_id={this.props.client_id} header="Redigera" />;
    } else {
      content = <LegalCaseInfo legal_case={this.state.legal_case} />;
    }

    return (
      <div>
        <BreadCrumb active={this.state.legal_case.name} links={this.state.links} />
        <div className="row">
          <div className="col-md-9">
            {content}
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <LegalCaseShowMenu />
            </div>
          </div>
        </div>
        <div className="row">
          <TasksIndex initialTasks={this.props.tasks} legalCaseId={this.props.legal_case.id}
            clientId={this.props.client_id}/>
        </div>
      </div>
    );
  }
}

LegalCaseShow.propTypes = {
  client_id: React.PropTypes.number.isRequired,
  legal_case: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array,
  links: React.PropTypes.array.isRequired,
};
