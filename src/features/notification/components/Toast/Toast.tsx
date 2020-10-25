import { Toast as BootstrapToast } from 'bootstrap';
import React from 'react';
import AnimateHeight from 'react-animate-height';

export class Toast extends React.Component<{
  message: string;
  clear: () => void;
}, {
  height: string | number;
}> {
  private toastRef = React.createRef<HTMLDivElement>();

  state = {
    height: 'auto'
  };

  componentDidMount(): void {
    const toastEl = this.toastRef.current;
    if (toastEl) {
      const toast = new BootstrapToast(toastEl) as BootstrapToast & { show: () => void };
      toast.show();
      toastEl.addEventListener('hidden.bs.toast', () => this.setState({ height: 0 }));
    }
  }

  render(): JSX.Element {
    return (
      <AnimateHeight
        height={this.state.height}
        duration={300}
        easing="ease-out"
        onAnimationEnd={(): void => this.props.clear()}
      >
        <div className="toast d-flex align-items-center bg-primary text-white"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={this.toastRef}
        >
          <div className="toast-body">
            {this.props.message}
          </div>
          <button type="button"
            className="btn-close ml-auto mr-2"
            data-dismiss="toast"
            aria-label="Schließen"
          ></button>
        </div>
      </AnimateHeight>
    );
  }
}
