"use client";

import { useEffect } from "react";

const DisableContextMenu = (): null => {
  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return null;
};

export default DisableContextMenu;
