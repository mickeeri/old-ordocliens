class LawsuitShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legal_case: props.initialLawsuit,
      editMode: false,
      links: props.links
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
    const url = Routes.lawsuit_path(this.props.initialLawsuit.id);
    makeGetRequest(url)
      .success(response => {
        this.setState({ legal_case: response.legal_case });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <BreadCrumb active={this.state.legal_case.name} links={this.state.links} />
        <div className="row">
          <div className="col-md-4">
            <h2>Ärende nr {this.props.initialLawsuit.id}</h2>
          </div>
          <div className="col-md-8 content-right">
            <a href="#">Info</a>
            <a href="#">Tidrapportering</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="card card-block">
              <LawsuitForm
                initialLawsuit={this.state.legal_case}
                clientId={this.props.clientId}
              />
            </div>
          </div>
          <div className="col-md-3">
            <DeleteLawsuitButton
              lawsuitId={this.props.initialLawsuit.id}
              clientId={this.props.clientId}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <LawsuitClientList
              clients={this.props.initialLawsuit.clients}
              lawsuitId={this.props.initialLawsuit.id}
            />
          </div>
          <div className="col-md-6">
            <LawsuitCounterpartList
              counterparts={this.props.initialLawsuit.counterparts}
              lawsuitId={this.props.initialLawsuit.id}
            />
          </div>
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
