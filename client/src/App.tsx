import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Landing } from './components/Landing/Landing';

export function App() {
  const [showLanding, setShowLanding] = useState(false);

  const fadeInAnimation = useSpring({
    opacity: showLanding ? 1 : 0,
    from: { opacity: 0 },
    config: { tension: 200, friction: 25 },
  });

  useEffect(() => {
    // Set showLanding to true after component mount
    setShowLanding(true);
  }, []);

  return (
      <>
      <animated.div style={fadeInAnimation}><Landing /></animated.div>
      </>
  );
}
