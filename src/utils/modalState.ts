"use client"

import { create } from "zustand";

type modalContent = "" | "displayInfo" | "updateInfo" | "addInfo"

interface ModalState {
    isModalOpen: boolean;
    modalContent: modalContent
    openModal: (val: modalContent) => void
    closeModal: () => void
}

const useModalState = create<ModalState>()((set) => ({
    isModalOpen: false,
    modalContent: "",
    openModal: (val) => set(({ isModalOpen: true, modalContent: val })),
    closeModal: () => set(({isModalOpen: false, modalContent: ""}))
}))

export default useModalState