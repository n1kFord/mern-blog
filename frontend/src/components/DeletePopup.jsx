import React from 'react';

const DeletePopup = ({isOpen, onClose, onDelete}) => {

    let toggleClass = isOpen ? "opacity-100 z-10" : "opacity-0 z-[-1]";

    return (
        <div
            className={`${toggleClass} modal fade fixed flex bg-gray-700/50 top-0 left-0 m-auto w-full h-full outline-none overflow-x-hidden overflow-y-auto transition duration-200`}
            aria-hidden="true">
            <div className="w-[500px] m-auto modal-dialog relative pointer-events-none">
                <div
                    className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div
                        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                            Delete post
                        </h5>
                        <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"
                                onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body relative p-4">
                        Are you sure you want to delete the post?
                    </div>
                    <div
                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">

                        <button type="button" className="px-6
                          py-2.5
                          bg-red-500
                          text-white
                          font-medium
                          text-xs
                          leading-tight
                          uppercase
                          rounded
                          shadow-md
                          hover:bg-red-700 hover:shadow-lg
                          focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                          active:bg-red-800 active:shadow-lg
                          transition
                          duration-200
                          ease-in-out"
                                onClick={() => {
                                    onDelete();
                                    onClose();
                                }}
                        >
                            Delete
                        </button>
                        <button type="button" className="px-6
                              ml-2
                              py-2.5
                              bg-gray-600
                              text-white
                              font-medium
                              text-xs
                              leading-tight
                              uppercase
                              rounded
                              shadow-md
                              hover:bg-gray-700 hover:shadow-lg
                              focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
                              active:bg-gray-800 active:shadow-lg
                              transition
                              duration-200
                              ease-in-out" data-bs-dismiss="modal" onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;