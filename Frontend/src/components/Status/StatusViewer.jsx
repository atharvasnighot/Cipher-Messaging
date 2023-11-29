import { useEffect, useState } from "react";
import { stories } from "./DummyStory";
import ProgressBar from "./ProgressBar";
const StatusViewer = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex+1);
    } else {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextStory();
    },2000);
    return () => clearInterval(intervalId);
  }, [currentStoryIndex]);

  return (
    <div>
      <div className="flex justify-center items-center h-[100vh] bg-slate-900">
        <div className="relative">
          <img
            className="max-h-[96vh] object-contain"
            src={stories?.[currentStoryIndex].image}
            alt=""
          />
          <div className="absolute top-0 flex w-full">
            {stories.map((item, index) => (
              <ProgressBar
                key={index}
                duration={2000}
                index={index}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusViewer;
