import React from "react";

const Modal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Ürünü silmek istediğinize emin misiniz?</h3>
        
        <p className="modal-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book. It has survived not only five centuries...
        </p>

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