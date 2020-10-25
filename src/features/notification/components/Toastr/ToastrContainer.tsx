import { connect } from 'react-redux';
import { Notification } from '../../model/notification';
import { selectNotifications } from '../../selectors';
import { removeNotification } from '../../slice';
import { Toastr } from './Toastr';

const mapStateToProps = (state: any): any => ({
  notifications: selectNotifications(state),
});

const mapDispatchToProps = {
  clear: removeNotification,
};

export const ToastrContainer =
  connect<{ notifications: Notification[] }, { clear: (id: number) => void }, {}>(mapStateToProps, mapDispatchToProps)(Toastr);
