import { connect } from "react-redux";
import { remove } from "../modules/questions";

const LoginContainer = ({ user }) => {
  return;
};

export default connect(({ login }) => ({}), {
  remove,
})(LoginContainer);
