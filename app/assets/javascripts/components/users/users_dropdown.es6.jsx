class UsersDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: props.selectedUser,
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  onSelectChange(e) {
    this.setState({ selectedUser: parseInt(e.target.value, 10) });
    this.props.changeEvent();
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
          onChange={this.onSelectChange}
          ref={node => { usersDropdown = node; }}
          name="users"
          value={this.state.selectedUser}
          required
        >
          <option value="0">Visa alla</option>
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
