import { Toast as BootstrapToast } from 'bootstrap';
import React from 'react';

export class Toast extends React.Component<{ notification: string }> {
  private toastRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    if (this.toastRef.current) {
      const toast = new (BootstrapToast as any)(this.toastRef.current, { autohide: false }) as BootstrapToast & { show: () => void };
      toast.show();
    }
  }

  render(): JSX.Element {
    return (
      <div className="toast d-flex align-items-center bg-primary text-white"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={this.toastRef}
      >
        <div className="toast-body">
          {this.props.notification}
        </div>
        <button type="button"
          className="btn-close ml-auto mr-2"
          data-dismiss="toast"
          aria-label="Schließen"
        ></button>
      </div>
    );
  }
}
