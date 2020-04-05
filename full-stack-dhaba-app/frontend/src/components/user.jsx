import React from "react";
import { connect } from "react-redux";

class User extends React.Component {
  state = {
    userName: "",
    userNumber: null,
    paymentMode : "cash"
  };
  render() {
    return (
      <div className="d-flex justify-content-center">
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.userName === "") {
              alert("Enter User name");
            } else if (this.state.userNumber === null) {
              alert("Enter User number");
            } else {
              this.props.dispatch({
                type: "USER_DETAIL",
                payload: this.state
              });
            }
          }}
        >
          <div className="form-inline d-flex justify-content-center mt-2">
            <input
              style={{ width: "30vw" }}
              className="form-control mr-sm-2"
              placeholder=" Enter your Name"
              onChange={e => {
                this.setState({ userName: e.target.value });
              }}
            />
          </div>
          <div className="form-inline d-flex justify-content-center mt-1">
            <input
            minLength="10"
            maxLength="10"
              style={{ width: "30vw" }}
              type="phone"
              className="form-control mb-2 mr-sm-2"
              placeholder=" Enter your Number"
              onChange={e => {
                this.setState({ userNumber: e.target.value });
              }}
            />
          </div>
          <div className="input-group-prepend mb-2 mr-sm-2">
            <label className="input-group-text">Payment Mode</label>
            <select
              className="form-control" //Default Value stored in State
              onChange={e => {
                this.setState({ paymentMode: e.target.value });
              }}
            >
                <option>cash</option>
                <option>card</option>
                <option>paytm</option>
                <option>upi</option>
            </select>
          </div>
          <button className="btn btn-dark pr-5 pl-5 " type="submit">
            Confirm
          </button>
        </form>
      </div>
    );
  }
}

const stateMapper = state => {
  return state;
};

export default connect(stateMapper)(User);
