import { Loader2Icon } from "lucide-react";
import type React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner">
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
