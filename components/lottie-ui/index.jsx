import LottieImage from 'components/lottie-ui/animation_1697824537000.json';
import { Player } from '@lottiefiles/react-lottie-player';

export function Lottie404() {
  return (
    <>
      <Player autoplay loop src={LottieImage} className="max-w-full h-auto"></Player>
    </>
  );
}
