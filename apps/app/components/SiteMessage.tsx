// components/SiteMessage.tsx
import React, { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

const SiteMessage: React.FC = () => {
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage to see if the alert should be hidden
    const siteMessageDismissed = localStorage.getItem("siteMessageDismissed");
    if (siteMessageDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    // Hide the alert
    setIsVisible(false);
    // Store the dismissal in localStorage
    localStorage.setItem("siteMessageDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div role="alert" className="alert alert-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{t("testnet-warning")}</span>
      <div>
        <button className="btn btn-warning btn-sm" onClick={handleDismiss}>
          Dismiss
        </button>
        {/* <button className="btn btn-sm btn-primary">Learn more</button> */}
      </div>
    </div>
  );
};

export default SiteMessage;
