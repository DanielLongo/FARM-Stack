import React from "react";

function Modal(props) {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-slate-100/[.5] backdrop-blur-lg bg-opacity-75 transition-opacity"></div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                  {props.children}
            </div>
            </div>
        </div>
    )
    

}

export default Modal;