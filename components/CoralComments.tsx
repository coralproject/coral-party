import { FunctionComponent, useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

interface Props {
  rootURL: string;
  storyMode?: string;
}

const CoralComments: FunctionComponent<Props> = ({ rootURL, storyMode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let stream: any;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `//${rootURL}/assets/js/embed.js`;
    script.onload = () => {
      stream = (window as any).Coral.createStreamEmbed({
        id: "coral",
        autoRender: true,
        rootURL: `//${rootURL}`,
        storyMode,
      });

      (window as any).Coral.stream = stream;
    };

    ref.current.appendChild(script);

    return () => {
      if (stream) {
        stream.remove();
      }
    };
  }, [rootURL]);

  return (
    <div ref={ref} className="">
      <div id="coral" />
      {/*  */}
    </div>
  );
};

export default CoralComments;
