import { BounceLoader, PulseLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <PulseLoader
        color="#3321C8"
        // size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
        override={override}
      />
    </div>
  );
}

export default Loader;
