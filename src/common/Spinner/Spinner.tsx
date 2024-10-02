import "./Spinner.scss";

const Spinner = ({ shouldSpin }) => {
  return (
    <>
      {shouldSpin && <span className="loader"></span>}
    </>
  );
};

export default Spinner;