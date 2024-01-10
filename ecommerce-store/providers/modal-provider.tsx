"use client";

import PreviewModal from "@/components/preview-modal";
import { useEffect, useState } from "react";

interface ModaleProviderProps {
  storeId: string;
}

const ModaleProvider:React.FC<ModaleProviderProps> = ({storeId}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal storeId={storeId}/>
    </>
  );
};

export default ModaleProvider;
