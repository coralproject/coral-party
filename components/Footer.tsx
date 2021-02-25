import { FunctionComponent } from "react";

interface Props {}

const Footer: FunctionComponent<Props> = ({}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="ad">ad</div>
        <div className="ad">ad</div>
        <div className="ad">ad</div>
      </div>
      <div className="footer">Coral Party</div>
    </>
  );
};

export default Footer;
