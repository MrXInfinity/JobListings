"use client"

import { create } from "zustand";

type modalContent = "" | "displayInfo" | "updateInfo" | "addInfo"

interface ModalState {
    isModalOpen: boolean;
    modalContent: modalContent
    modalID: string
    openModal: (val: modalContent, id?: string) => void
    closeModal: () => void
}

const useModalState = create<ModalState>()((set) => ({
    isModalOpen: false,
    modalContent: "",
    modalID: "",
    openModal: (val, id) => {
        set({ isModalOpen: true, modalContent: val, modalID: id })
    },
    closeModal: () => {

        set({ modalID: "", isModalOpen: false, modalContent: "" })
    }
}))

export default useModalState