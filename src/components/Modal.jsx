import React from "react";

const Modal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Ürünü silmek istediğinize emin misiniz?</h3>
        <p className="modal-text"></p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>
            EVET
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            HAYIR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
