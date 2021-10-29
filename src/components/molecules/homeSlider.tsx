import React, { useState } from 'react';
import SelectControllerSvg from '@assets/Select-Controller.svg';
import SelectConfigurationSvg from '@assets/Select-Configuration.svg';
import SelectZonesSvg from '@assets/Select-Zones.svg';
import DownloadSelectionSvg from '@assets/Download-Selection.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useInterval } from '@hooks/useInterval';

export const HomeSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  const updateIndex = () => {
    setIndex((index + 1) % 4);
  };
  useInterval(updateIndex, 4000);

  const getAnimation = (i: number) => {
    switch (i) {
      case 0:
        return <SelectControllerSvg />;
      case 1:
        return <SelectConfigurationSvg />;
      case 2:
        return <SelectZonesSvg />;
      case 3:
        return <DownloadSelectionSvg />;
      default:
        return null;
    }
  };

  const text = [
    'Select your controller',
    'Select the configuration',
    'Select your zones',
    'Ready for download',
  ];

  return (
    <section className="home-slider">
      <AnimatePresence initial={false} exitBeforeEnter={false}>
        <motion.div
          data-id={index}
          className="slide"
          key={index}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1 },
          }}
        >
          {getAnimation(index)}
        </motion.div>
        <motion.div
          className="slide-text"
          key={`test-${index}`}
          exit={{ x: '100%', opacity: 0, transition: { delay: 0.25 } }}
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: '-100%', opacity: 0 }}
          transition={{
            x: { duration: 0.5, delay: 1 },
            opacity: { duration: 0.55, delay: 1 },
          }}
        >
          <span>
            {text[index]}
          </span>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
