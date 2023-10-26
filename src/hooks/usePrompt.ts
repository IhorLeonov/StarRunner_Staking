import { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

// const body = document.querySelector("body") as HTMLBodyElement;
const main = document.querySelector("main") as HTMLBodyElement;
const header = document.querySelector("header") as HTMLBodyElement;

export const usePrompt = () => {
  const [promptName, setPromptName] = useState<string | null>(null);
  const [promptClass, setPromptClass] = useState<string | null>(null);

  const handleShowPrompt = (name: string) => {
    setPromptName(name);
    setPromptClass(`${name}_prompt`);
    disableBodyScroll(main);
    disableBodyScroll(header);
  };

  const handleHidePrompt = () => {
    setPromptName(null);
    setPromptClass(null);
    enableBodyScroll(main);
    enableBodyScroll(header);
  };

  return {
    promptName,
    promptClass,
    handleShowPrompt,
    handleHidePrompt,
  };
};
