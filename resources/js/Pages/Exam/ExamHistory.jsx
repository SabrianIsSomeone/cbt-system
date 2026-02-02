import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import no_data from "@/../assets/no_data.svg";
import subject_image from "@/../assets/subject_image.png";
import moment from "moment/min/moment-with-locales";
import { MdOutlineDateRange } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { GrScorecard } from "react-icons/gr";
export default function ExamHistory({ auth, title, riwayat }) {
    const color = ["sky", "yellow", "emerald"]
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Riwayat Pengerjaan" />

            <div className="w-full">
                <div className="flex justify-between ">
                    <h1 className="mb-6 font-bold">Riwayat Pengerjaan</h1>
                    {/* <h1 className="mb-6 font-bold text-primary">{submitted.length ? 'Lihat Semua' : ''}</h1> */}
                </div>

                <div className="grid content-center justify-center grid-cols-3 gap-5">
                    {riwayat.length ? (
                        riwayat.map((data, i) => {
                            let answered = data.answered.answer;
                            let sumAnswered = 0;
                            answered.map((answer) => {
                                if (answer != null && answer != "") {
                                    sumAnswered++;
                                }
                            });
                            let jumlah_soal = answered.length;

                            let value = (sumAnswered / jumlah_soal) * 100;

                            console.log("value soal terjawab : ");
                            console.log(value);

                            var splited_title = data.subject.exam_dir.substring(1).split('/')
                            console.log(splited_title)
                            return (
                                <Link
                                    href={route("exam.result")}
                                    data={{
                                        answer_id: data.id,
                                        participant_id: auth.user.id,
                                        subject: data.subject.name,
                                    }}
                                >
                                    <card className="mb-2 transition-all shadow-md w-fit card hover:scale-105 border-card">
                                        <div className="m-6 my-4 text-xs rounded-md">
                                            <div className="flex items-center justify-start gap-5 w-max ">
                                                <div
                                                    className="w-16 h-16 aspect-square radial-progress text-primary bg-secondary/60"
                                                    style={{
                                                        "--value": value,
                                                        "--size": "3rem",
                                                        "--thickness": "2px",
                                                    }}
                                                    role="progressbar"
                                                >
                                                    <strong className="text-sm">
                                                        {Math.round(value)}%
                                                    </strong>
                                                </div>
                                                <div className="items-center justify-start w-full gap-4 flex-nowrap">
                                                    <div>
                                                        <strong className="text-lg">
                                                            {data.subject.name}
                                                        </strong>
                                                        <div className="flex gap-1 w-fit">
                                                            {splited_title.map((subject_dir, i) => {
                                                                return(
                                                                    <div className={"bg-"+color[(i%3)]+"-500 label"}>
                                                                        {subject_dir}
                                                                    </div>                                                                
                                                                )
                                                            })}
                                                            {/* <div className="bg-sky-500 label">
                                                                {data.subject.exam_dir.substring(1)}
                                                            </div>
                                                            <div className="bg-yellow-500 label">
                                                                PSIKOLOG
                                                            </div>
                                                            <div className="label bg-emerald-500">
                                                                KECERDASAN
                                                            </div> */}
                                                        </div>
                                                        <p className="mt-1 text-sm font-bold">
                                                            {sumAnswered} dari{" "}
                                                            {jumlah_soal}{" "}
                                                            Terjawab
                                                        </p>
                                                    </div>

                                                    <div className="flex items-start gap-4">
                                                        <div>
                                                        <div className="flex items-center gap-1 mt-2">
                                                            <FaRegClock className="w-[18px] h-[18px]" />
                                                            <div>
                                                                <p className="font-semibold">
                                                                    {moment(
                                                                        data.updated_at
                                                                    )
                                                                        .format(
                                                                            "LTS"
                                                                        )
                                                                        .replace(
                                                                            /\./g,
                                                                            ":"
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-1 mt-1">
                                                            <MdOutlineDateRange className="w-[18px] h-[18px]" />
                                                            <div>
                                                                {/* <small className="block text-sm text-slate-500">
                                                            {" "}
                                                            {moment(
                                                                data.updated_at
                                                            ).fromNow()}
                                                        </small> */}
                                                                <p className="font-semibold">
                                                                    {moment(
                                                                        data.updated_at
                                                                    ).format(
                                                                        "L"
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        </div>

                                                        <div className="flex items-center gap-1 mt-2">
                                                            <GrScorecard className="w-[18px] h-[18px]" />
                                                            <div>
                                                                <p className="font-semibold">
                                                                    {data.temporary_mark}/100
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </card>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="my-auto">
                            <img
                                className="w-40 h-32 mx-auto mt-3 pt-7"
                                src={no_data}
                                alt="no data"
                                srcset=""
                            />
                            <p className="mt-3 text-sm text-center text-slate-600">
                                Belum ada Riwayat Selesai Ujian
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
