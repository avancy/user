import { Container } from '@/components/common/container';

export function Footer({ className, isCandidatePage = false }) {
  return (
    <footer className={`${isCandidatePage ? 'bg-[#24EEA0]' : 'bg-primary'} ${className}`}>
      <Container>
        <div
          className={`flex text-sm sm:text-lg items-center justify-center gap-3 py-4 ${!isCandidatePage && 'text-white'}`}
        >
          <div className="flex items-center justify-center">
            <span>&copy;Mavielo RH {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center sm:items-end">
            <span>Todos os direitos reservados.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
