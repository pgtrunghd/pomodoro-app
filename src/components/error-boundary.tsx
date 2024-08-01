import { ServerCrash } from "lucide-react";
import { Component } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col gap-5 items-center justify-center mt-10">
          <ServerCrash className="text-white size-10" />
          <p>{this.state.error.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
