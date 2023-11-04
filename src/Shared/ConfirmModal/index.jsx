/* eslint-disable react/prop-types */

const ConfirmModal = ({
  title,
  message,
  closeModal,
  successButtonName,
  modalData,
  successAction,
}) => {
  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-black">{title}</h3>
          <p className="py-4 text-black">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirmation-modal"
              className="btn btn-primary btn-sm"
            >
              {successButtonName}
            </label>
            <button onClick={closeModal} className="btn btn-outline btn-sm">
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
