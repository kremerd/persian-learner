import { connect } from 'react-redux';
import { selectNotifications } from '../../selectors';
import { Toastr } from './Toastr';

const mapStateToProps = (state: any): any => ({
  notifications: selectNotifications(state),
});

export const ToastrContainer =
  connect<{ notifications: string[] }, {}, {}>(mapStateToProps)(Toastr);
