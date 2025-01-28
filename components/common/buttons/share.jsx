import { DuplicateDocumentIcon } from '@/images/icons/DuplicateDocument';
import { WhatsApp } from '@mui/icons-material';
import { Notify } from '../notification';

export function BtnShare() {
  return (
    <div className="flex flex-col gap-5 md:flex-row sm:flex-row ">
      <ShareWhatsapp />
      <ShareCopy />
    </div>
  );
}

export function ShareWhatsapp() {
  const shareOnWhatsApp = () => {
    const currentURL = window.location.href;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentURL)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={shareOnWhatsApp}
      className="flex items-center justify-center gap-1 px-4 py-2 font-bold text-white transition-all duration-300 rounded-full hover:scale-105 active:scale-95 hover:bg-secundary bg-primary sm:px-8 lg:px-10"
    >
      <WhatsApp /> WhatsApp
    </button>
  );
}

export function ShareCopy() {
  const copyLinkToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    Notify.success('Link copiado com sucesso!');
  };

  return (
    <button
      onClick={copyLinkToClipboard}
      className="flex items-center justify-center gap-1 px-4 py-2 font-bold text-black transition-all duration-300 bg-white border rounded-full hover:scale-105 active:scale-95 hover:text-white text-primary hover:bg-primary border-primary sm:px-8 lg:px-10 "
    >
      <DuplicateDocumentIcon className="w-5 h-5" aria-hidden="true" />
      Copiar Link
    </button>
  );
}
