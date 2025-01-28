import Link from 'next/link';
import { Container } from '@/components/common/container';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

export function Footer({ className, isCandidatePage = false }) {
  return (
    <footer className={`py-2 ${isCandidatePage ? "bg-[#24EEA0]" : "bg-primary"} ${className}`}>
      <Container>
        <div className={`grid grid-cols-1 py-4 ${!isCandidatePage && "text-white"} sm:grid-cols-3`}>
          <div className="flex justify-center mb-2 sm:justify-start gap-x-3 sm:mb-0">
            <span>&copy;Mavielo RH</span>
            <span> {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-center sm:items-start sm:text-left">
            <Link
              href="https://www.linkedin.com/company/avancy-co/about"
              target="_blank"
              aria-label="AgroVagas on LinkedIn"
            >
              <LinkedInIcon className="transition-transform transform cursor-pointer hover:scale-110" />
            </Link>
            <Link
              href="https://www.instagram.com/mavielorh"
              target="_blank"
              aria-label="AgroVagas on Instagram"
            >
              <InstagramIcon className="transition-transform transform cursor-pointer hover:scale-110" />
            </Link>
            <Link href="https://mavielorh.com.br/" target="_blank" aria-label="AgroVagas Website">
              <LanguageIcon className="transition-transform transform cursor-pointer hover:scale-110" />
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center text-sm text-center sm:items-end sm:text-right">
            <span>Todos os direitos reservados.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
