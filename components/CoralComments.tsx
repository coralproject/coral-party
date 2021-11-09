import { FunctionComponent, useRef, useState } from "react";
import clsx from "clsx";
import { useIsomorphicLayoutEffect } from "react-use";

interface Props {
  storyMode?: string;
  storyID?: string;
}

const CORAL_DOMAIN = process.env.NEXT_PUBLIC_CORAL_DOMAIN || "localhost:8080";

const CoralComments: FunctionComponent<Props> = ({ storyMode, storyID }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const embedProps: any = {
    id: "coral",
    autoRender: true,
    rootURL: `//${CORAL_DOMAIN}`,
    storyMode,
  };

  if (storyID) {
    embedProps.storyID = storyID;
  }

  useIsomorphicLayoutEffect(() => {
    let stream: any;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `//${CORAL_DOMAIN}/assets/js/embed.js`;
    script.onload = () => {
      stream = (window as any).Coral.createStreamEmbed(embedProps);

      (window as any).Coral.stream = stream;

      setLoaded(true);
    };
    script.onerror = () => {
      setError(true);
    };

    ref.current.appendChild(script);

    return () => {
      if (stream) {
        stream.remove();
      }

      setError(false);
      setLoaded(false);
    };
  }, []);

  return (
    <div ref={ref} className="">
      <div
        id="coral"
        className={clsx({
          "text-center bg-gradient-to-br p-4": !loaded,
          "text-red-500 from-red-100 to-red-200": error,
          "from-blue-100 to-purple-100": !error,
        })}
      >
        {error
          ? "Could not load comments, consult the console for details"
          : "Loading embed"}
      </div>
    </div>
  );
};

export default CoralComments;
