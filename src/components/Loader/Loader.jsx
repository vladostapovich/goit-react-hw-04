import ReactModal from "react-modal";

const Loader = () => {
  return (
    <div>
      <ReactModal
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Loader;
