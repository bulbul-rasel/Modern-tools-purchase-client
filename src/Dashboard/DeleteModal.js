import React from 'react';

const DeleteModal = ({ deleteModal, products }) => {
    // const { name } = deleteModal
    const { name } = products
    return (
        <div>

            <label for="my-modal-6" class="btn modal-button">open modal</label>


            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">{name}</h3>
                    <p class="py-4">Are You Sure For Delete?</p>
                    <div class="modal-action">

                        <label for="my-modal-6" class="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;