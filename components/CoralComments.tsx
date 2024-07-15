import { FunctionComponent, useRef } from "react";

interface Props {
  storyMode?: string;
  token?: string;
}

const CORAL_DOMAIN = process.env.NEXT_PUBLIC_CORAL_DOMAIN || "localhost:8080";

const CoralComments: FunctionComponent<Props> = ({ storyMode, token }) => {
  const ref = useRef<HTMLDivElement>(null);

  const coralScript = `
      (function() {
          var d = document, s = d.createElement('script');
          s.src = '${CORAL_DOMAIN}/assets/js/embed.js';
          s.async = false;
          s.defer = true;
          s.onload = function() {
              Coral.createStreamEmbed({
                  id: "coral",
                  autoRender: true,
                  rootURL: '${CORAL_DOMAIN}',
                  storyMode: '${storyMode}',
                  accessToken: ${token}
              });
          };
          (d.head || d.body).appendChild(s);
      })();
  `;

  return (
    <div ref={ref} className="">
      <script dangerouslySetInnerHTML={{ __html: coralScript }}></script>
      <div id="coral"></div>
    </div>
  );
};

export default CoralComments;
