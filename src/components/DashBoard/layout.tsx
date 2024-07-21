// import MenuLink from "@/components/DashBoard/menu";
// import MenuLogout from "@/components/DashBoard/logout";
// import { ThemesModeToggle } from "../darkmode-switcher/ThemesSwitcher";
// import logo from "@/assets/logo.jpg";
// import Image from "next/image";

// export default function DashBoardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html>
//       <body className="h-screen overflow-hidden">
//         <div className="grid grid-cols-[300px_minmax(0,_1fr)_0px] h-full">
//           <div className="bg-white h-full dark:bg-black dark:text-white text-black px-4 py-10">
//             <div className="grid h-full">
//               <MenuLink />
//               <MenuLogout />
//             </div>
//           </div>
//           <div className="w-full bg-slate-200 dark:bg-slate-900 dark:text-white h-full text-black">
//             <div className="flex justify-between p-4 text-center bg-white dark:bg-black">
//               <div>
//                 <Image
//                   priority
//                   src={logo}
//                   alt="your-perspective - logo"
//                   className="rounded-full size-[40px]"
//                 />
//               </div>
//               <div>
//                 <ThemesModeToggle />
//               </div>
//             </div>
//             <div className="p-4">{children}</div>
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

import Menus from "@/components/DashBoard/menu";
import MenuPhone from "@/components/DashBoard/menuPhone";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Menus />
          <div className="flex flex-col">
            <MenuPhone />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
