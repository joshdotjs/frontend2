import { Player, Controls } from '@lottiefiles/react-lottie-player';
import img from './assets/adobe-loading-animation--rounded-7dot-5px--dark.json';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default () => {
  return (
    <div>
      Loading...
      <Player
        autoplay
        loop
        src={img}
        style={{
          height: '300px',
          width: '300px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>
    </div>
  );
};