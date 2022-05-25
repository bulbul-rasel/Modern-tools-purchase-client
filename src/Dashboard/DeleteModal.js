import React from 'react';

const DeleteModal = ({ deleteModal, products }) => {
    // const { name } = deleteModal
    const { name } = products
    return (
        <div>

            <label htmlFor="my-modal-6" className="btn modal-button">open modal</label>


            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="py-4">Are You Sure For Delete?</p>
                    <div className="modal-action">

                        <label htmlFor="my-modal-6" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;