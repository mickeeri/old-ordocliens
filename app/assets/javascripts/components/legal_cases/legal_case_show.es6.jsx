class LegalCaseShow extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.state = {
      legal_case: props.legal_case,
      links: props.links,
      editMode: false,
    };

    // this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('toggleEditMode', this.toggleEditMode);
    PubSub.subscribe('legalCaseUpdated', this.toggleEditMode);
    PubSub.subscribe('deleteLegalCaseConfirmed', this.toggleEditMode);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('toggleEditMode');
    PubSub.unsubscribe('legalCaseUpdated');
    PubSub.unsubscribe('deleteLegalCaseConfirmed');
  }

  render() {
    if (this.state.editMode) {
      content = <LegalCaseEditForm legal_case={this.state.legal_case} header="Redigera" />;
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
      </div>
    );
  }
}
