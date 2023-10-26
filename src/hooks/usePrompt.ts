import { useState } from "react";
// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const body = document.querySelector("body") as HTMLBodyElement;

export const usePrompt = () => {
  const [promptName, setPromptName] = useState<string | null>(null);
  const [promptClass, setPromptClass] = useState<string | null>(null);
  const [scroll, setScroll] = useState<boolean>(true);

  body.style.overflowY = scroll ? "scroll" : "hidden";

  const handleShowPrompt = (name: string) => {
    setPromptName(name);
    setPromptClass(`${name}_prompt`);
    // disableBodyScroll(body);
    setScroll(false);
  };

  const handleHidePrompt = () => {
    setPromptName(null);
    setPromptClass(null);
    // enableBodyScroll(body);
    setScroll(true);
  };

  return {
    promptName,
    promptClass,
    handleShowPrompt,
    handleHidePrompt,
  };
};
