class FormGroup extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          className="form-control"
          type={this.props.type}
          name={this.props.name}
          defaultValue={this.props.value}
          autoFocus={this.props.autoFocus ? this.props.autoFocus : false}
          onChange={this.props.changeEvent}/>
      </div>
    );
  }
}
