class LawsuitTypesDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lawsuitTypes: [],
      selectedLawsuitType: '',
    };
    this.fetchLawsuitTypes = this.fetchLawsuitTypes.bind(this);
    // his.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.fetchLawsuitTypes();
  }

  // handleSelectChange(e) {
  //   this.setState({ selectedLawsuitType: e.target.value });
  // }

  // handleOnSubmit(e) {
  //   e.preventDefault();
  //   makePutRequest(Routes.client_path(this.state.selectedLawsuitType),
  //     { client: { lawsuit_id: this.props.lawsuitId } }, 'clientListUpdated');
  // }

  // dismissBtnClicked(e) {
  //   e.preventDefault();
  //   PubSub.publish('dismissEdit');
  // }

  fetchLawsuitTypes() {
    const url = Routes.lawsuit_types_path();
    makeGetRequest(url)
      .success(response => {
        this.setState({ lawsuitTypes: response.lawsuit_types });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <select
        className="form-control form-control-sm"
        onChange={this.props.changeEvent}
        name="lawsuitTypes"
        value={this.props.selectedId}
        required
      >
        <option value="" disabled>Välj en ärendetyp</option>
        {this.state.lawsuitTypes.map(type =>
          <option
            key={type.id}
            value={type.id}
          >{type.name}</option>
        )}
      </select>
    );
  }
}

LawsuitTypesDropdown.propTypes = {
  changeEvent: React.PropTypes.func.isRequired,
  selectedId: React.PropTypes.number.isRequired,
};
