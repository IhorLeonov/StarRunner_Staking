import { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const body = document.querySelector("body") as HTMLBodyElement;

export const usePrompt = () => {
  const [promptName, setPromptName] = useState<string | null>(null);
  const [promptClass, setPromptClass] = useState<string | null>(null);

  const handleShowPrompt = (name: string) => {
    setPromptName(name);
    setPromptClass(`${name}_prompt`);
    disableBodyScroll(body);
  };

  const handleHidePrompt = () => {
    setPromptName(null);
    setPromptClass(null);
    enableBodyScroll(body);
  };

  return {
    promptName,
    promptClass,
    handleShowPrompt,
    handleHidePrompt,
  };
};
