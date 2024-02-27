'use client';

import { PropsWithChildren } from 'react';

import {
  DelayRenderComponent, GlobalPortal, useIsomorphicLayoutEffect,
} from '@nf-team/react';
import { motion } from 'framer-motion';

import { bottomToUpVariants } from '@/styles/framerVariants';

import styles from './modal.module.scss';

type Props = {
  isOpen: boolean;
};

function Modal({ isOpen, children }: PropsWithChildren<Props>) {
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
  }, [isOpen]);

  return (
    <DelayRenderComponent isVisible={isOpen}>
      <GlobalPortal>
        <motion.div
          animate={isOpen ? 'visible' : 'none'}
          initial="none"
          variants={bottomToUpVariants}
          className={styles.placeDetailWindowWrapper}
        >
          {children}
        </motion.div>
      </GlobalPortal>
    </DelayRenderComponent>
  );
}

export default Modal;
