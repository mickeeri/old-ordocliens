class UsersDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: '',
    };
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    const url = Routes.users_path();
    makeGetRequest(url)
      .success(response => {
        this.setState({ users: response.users });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div className="form-group form-inline user-select">
        <label>Handläggare: </label>
        <select
          className="form-control form-control-sm"
          onChange={this.props.changeEvent}
          name="users"
          value={this.props.selectedUser}
          required
        >
          {this.state.users.map(user =>
            <option
              key={user.id}
              value={user.id}
            >{user.fullName}</option>
          )}
        </select>
      </div>
    );
  }
}

UsersDropdown.propTypes = {
  changeEvent: React.PropTypes.func.isRequired,
  selectedUser: React.PropTypes.number.isRequired,
};
