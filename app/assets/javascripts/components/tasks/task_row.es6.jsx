class TaskRow extends React.Component {
  handleClickOnTableRow(e) {
    //window.location = Routes.client_legal_case_path(this.props.clientId, this.props.legalCase.id);
  }

  render() {
    var task = this.props.task;
    return (
      <tr onClick={this.handleClickOnTableRow.bind(this)}>
        <td className="nowrap">{task.date}</td>
        <td>{task.entry}</td>
        <td>{task.worked_hours}</td>
        <td className="nowrap">{task.price_category.name}</td>
      </tr>
    );
  }
}

TaskRow.propTypes = {
  task: React.PropTypes.object.isRequired,
  legalCaseId: React.PropTypes.number.isRequired,
};
