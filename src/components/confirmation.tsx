import React from "react";

type ConfirmationProps = {
  title: string;
  text: string;
  confirmationCallback: () => void;
  cancelationCallback: () => void;
};

const Confirmation = React.forwardRef<HTMLDialogElement, ConfirmationProps>(
  function Confirmation(props: ConfirmationProps, ref) {
    const handleConfirm = () => {
      props.confirmationCallback();
    };

    const handleCancel = () => {
      props.cancelationCallback();
    };

    return (
      <dialog ref={ref}>
        <section style={{ display: "flex", flexDirection: "column" }}>
          <header>
            <h1>{props.title}</h1>
          </header>

          <p>{props.text}</p>

          <footer style={{ display: "flex", flexDirection: "row" }}>
            <button
              onClick={handleCancel}
              style={{
                flex: 1,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              style={{
                flex: 1,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              Confirmar
            </button>
          </footer>
        </section>
      </dialog>
    );
  }
);

export default Confirmation;
