class TasksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: this.props.tasks };
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-inverse">
            <tr>
              <th>Datum</th>
              <th>Notering</th>
              <th className="text-nowrap">Arbetad tid</th>
              <th className="text-nowrap">Priskategori</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map(task =>
              <TaskRow
                key={task.id}
                task={task}
                lawsuitId={this.props.lawsuitId}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

TasksIndex.propTypes = {
  clientId: React.PropTypes.number,
  lawsuitId: React.PropTypes.number.isRequired,
  tasks: React.PropTypes.array.isRequired,
};
