import { useState } from "react";

export const usePrompt = () => {
  const [promptName, setPromptName] = useState<string | null>(null);
  const [promptClass, setPromptClass] = useState<string | null>(null);

  const handleShowPrompt = (name: string) => {
    setPromptName(name);
    setPromptClass(`${name}_prompt`);
    document.body.style.overflow = "hidden";
  };

  const handleHidePrompt = () => {
    setPromptName(null);
    setPromptClass(null);
    document.body.style.overflow = "scroll";
  };

  return {
    promptName,
    promptClass,
    handleShowPrompt,
    handleHidePrompt,
  };
};
