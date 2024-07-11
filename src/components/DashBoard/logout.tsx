import React from 'react';
import Link from "next/link";

export default function pathLogouts() {
    return (
        <div className="flex flex-col justify-between">
            <div></div>
            <div className="w-full grid gap-3 h-48 items-center">
                <ul className="grid gap-3">
                    <Link className={`p-3 rounded-xl dark:text-white cursor-pointer hover:bg-slate-200 dark:hover:text-black`} href="/" >Logout</Link>
                </ul>


                <ul className="flex gap-3 items-center">
                    <div>
                        <img className="size-[60px] rounded-full" src="https://img.lovepik.com/element/40024/5719.png_1200.png" alt="" />
                    </div>
                    <div>
                        <div className="text-[#374151] dark:text-slate-200">hello</div>
                        <div className="text-[#4B5563] dark:text-[#aba9a9]">hello</div>
                    </div>
                </ul>
            </div>
        </div>
    )
}