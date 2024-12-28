/* eslint-disable react/prop-types */
import Modal from "../../../../Ui/Modal";
import toast from "react-hot-toast";
import SubmitButton from "../../../../components/Submit Button/SubmitButton";
import Cancelbtn from "../../../../components/Cancel Button/Cancelbtn";
import UseDeleteDoctor from "../../../../hooks/HDoctors/UseDelDoctor";
// eslint-disable-next-line react/prop-types
const DelDoctor = ({ isOpen, closeModal, editDoctor }) => {
  const { deleteDoctorData, loading } = UseDeleteDoctor(); // Use the custom hook
  const storageKey = "logged";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const onsubmitDeleteHandeler = async (e) => {
    e.preventDefault();
    const result = await deleteDoctorData(editDoctor.id, userData);
    if (result.success) {
      closeModal();
      toast.success("Success Deleted!", {
        duration: 1000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error(result.error, {
        duration: 1000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  return (
    <div>
      <Modal
        title={`Are You Sure You Want To Delete Dr -  ${editDoctor.name}`}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <form onSubmit={onsubmitDeleteHandeler}>
          <div className="flex justify-center items-center space-x-3 ">
            <SubmitButton loading={loading}>Delete</SubmitButton>
            <Cancelbtn onClick={closeModal}>Cancel</Cancelbtn>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default DelDoctor;