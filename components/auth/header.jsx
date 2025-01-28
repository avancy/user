import MavieloLogo from "@/images/logos/mavielo.svg";
import Image from "next/image";
import Link from "next/link";

export default function AuthHeader() {

    //Mock do redirecionamento, ajustar conforme as regras de negócio:
    const redirectTo = "https://mavielorh.com.br/vagas/";

    return(
        <header className="flex flex-col items-center w-full">
            <div className="py-6">
                <Link href={redirectTo}>
                    <Image priority src={MavieloLogo} alt="Logo MavieloRH" />
                </Link>
            </div>

            <hr className="w-[85%] border-t-2 border-gray-100" />
        </header>
    );
}