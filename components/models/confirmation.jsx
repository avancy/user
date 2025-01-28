const ModalConfirmation = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-sm mx-auto my-6">
        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t"></div>
          <div className="relative flex-auto p-6">
            <p className="my-4 text-lg leading-relaxed text-gray-600">
              Você tem certeza de que deseja cancelar sua candidatura? Se você clicar em 'Sim,
              cancelar', sua inscrição será anulada e não será considerada.
            </p>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
            <button
              className="px-6 py-2 mr-2 text-gray-500 rounded-md hover:bg-gray-300 focus:outline-none"
              onClick={onCancel}
            >
              Não, candidatar
            </button>
            <button
              className="px-6 py-2 font-bold text-white bg-red-400 rounded-md focus:outline-none"
              onClick={onConfirm}
            >
              Sim, cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
