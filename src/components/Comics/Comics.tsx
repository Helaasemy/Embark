import React, { useState } from 'react';

import StackGrid from "react-stack-grid";
import Modal from 'react-modal';

import styles from './Comics.module.scss';

interface Props { data: Data[] }
interface Data {
  img: string;
  alt: string;
}
const Comics = ({ data }: Props) => {
  const [modalData, setModalData] = useState<any>({})
  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      zIndex: 1000,
      backgroundColor: 'rgba(52, 52, 52, 0.9)'
    },
  };

  return (
    <>
      <div className={styles.wrapper}>
        <StackGrid
          columnWidth={300}
          gutterWidth={5}
          gutterHeight={5}
        >
          {data.map((comic: any) =>
            <div
              onClick={() => { setModalData(comic); setIsOpen(true) }}
              key={comic.num} className={styles.image}>
              <img src={comic.img} alt={comic.alt} />
            </div>
          )}
        </StackGrid>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img src={modalData.img} alt={modalData.alt} />
      </Modal>
    </>
  );
}

export default Comics;