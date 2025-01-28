import Link from 'next/link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import { Tooltip } from '@material-tailwind/react';
import { Facebook } from '@mui/icons-material';

const socialMediaIcons = {
  instagram: <InstagramIcon className="w-6 h-6 md:w-10 md:h-10 " />,
  linkedin: <LinkedInIcon className="w-6 h-6 md:w-10 md:h-10" />,
  whatsapp: <WhatsAppIcon className="w-6 h-6 md:w-10 md:h-10" />,
  website: <LanguageIcon className="w-6 h-6 md:w-10 md:h-10" />,
  facebook: <Facebook className="w-6 h-6 md:w-10 md:h-10" />,
};

export function SocialJob({ social_medias = {} }) {
  return (
    <div className="flex flex-col items-center justify-center m-10 text-center">
      <h2 className="relative text-2xl font-medium text-center text-black md:text-3xl lg:text-4xl">
        Nossas redes:
      </h2>
      <div className="flex flex-wrap justify-center gap-4 p-4 ">
        {Object.keys(social_medias)?.map((key, i) => (
          <Link key={i} target="_blank" href={social_medias[key]} className="hover:underline">
            <Tooltip
              className="text-gray-500 bg-white rounded-md shadow-md"
              placement="bottom"
              content={key}
            >
              <div className="flex items-center transition-all text-primary hover:scale-105 ">
                {socialMediaIcons[key]}
              </div>
            </Tooltip>
          </Link>
        ))}
      </div>
    </div>
  );
}
