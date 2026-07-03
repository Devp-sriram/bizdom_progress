import { useState, useEffect } from 'react';

function useDeviceDetect() {
  const [deviceType, setDeviceType] = useState('Desktop Screen');

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      if (isMobileSize && isTouchDevice) {
        setDeviceType('Mobile Screen');
      } else {
        setDeviceType('Desktop Screen');
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}

export default useDeviceDetect;
