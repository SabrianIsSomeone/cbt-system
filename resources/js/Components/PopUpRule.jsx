import React from "react";
import { useState } from "react";
import img1 from "@/../assets/rule_test.svg";
import { HashLink as Link } from 'react-router-hash-link';

export default function Modal({ openModal, setOpenModal, }) {
    const [input, setInput] = useState("");
    const [emailSend, setEmailSend] = useState(false);

    const sendEmail = () => {
        setEmailSend(true);
        setTimeout(() => {
            setOpenModal(false);
        }, 2000);
    };
    return (
        <>
            {!emailSend && (
                <div className="bg-white absolute z-50 rounded-2xl ">
                    <div className="modal-container overflow-scroll">
                        <h3 className="text-primary text-3xl text-center mx-auto mt-3 ">Tata Tertib Ujian </h3>
                        <img className="w-48 h-36 mx-auto " src={img1} />
                        <div>
                            <div className="modal-text whitespace-pre-wrap ">

                                <strong>Persiapan Peserta: </strong>
                                <br />
                                1. Pastikan perangkat dan koneksi internet stabil.
                                <br />
                                2. Gunakan hanya peralatan yang diizinkan.
                                <br />
                                3. Mulai dan selesaikan ujian sesuai waktu yang ditentukan. Submit jawaban sebelum batas waktu berakhir.
                                <br />
                                4. Hubungi panitia untuk pertanyaan atau bantuan.
                                <br />
                                Pelanggaran tata tertib dapat mengakibatkan anda didiskualifikasi.

                                <br />
                            </div>
                        </div>

                        {/* <Link to="/home#subject"> */}
                        <button
                            className="large-primary-button font-bold text-lg"
                            to
                            onClick={() => {
                                setOpenModal(false);

                            }}
                        >
                            Saya Mengerti
                        </button>
                        {/* </Link> */}
                    </div>
                </div>
            )}
            {emailSend && (
                <div className="modal-container-sent">
                    {/* <img className="modal-image" src={img2} /> */}
                    <div className="modal-text">Email sent!</div>
                </div>
            )}
        </>
    );
};
