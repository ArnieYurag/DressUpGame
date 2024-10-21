import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import html2canvas from 'html2canvas';
import Avatar from './Avatar';
import '../styles/DressUp.css';
import AvatarBackground from '../components/Background';

const DressUp = () => {
  const [state, setState] = useState('Idle');
  const [skin, setSkin] = useState(null);
  const [eyes, setEyes] = useState(null);
  const [hair, setHair] = useState(null);
  const [clothes, setClothes] = useState(null);
  const [accessories, setAccessories] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const avatarRef = useRef(null);

  // State transition function to manage FSM logic
  const transition = (nextState) => {
    setState(nextState);
  };

  const selectSkin = (item) => {
    setSkin(item);
    transition('SkinSelected');
  };

  const selectEyes = (item) => {
    setEyes(item);
    transition('EyesSelected');
  };

  const selectHair = (item) => {
    setHair(item);
    transition('HairSelected');
  };

  const selectClothes = (item) => {
    setClothes(item);
    transition('ClothesSelected');
  };

  const selectAccessories = (item) => {
    setAccessories(item);
    transition('AccessoriesSelected');
  };

  // Only show the finish button when one or more components are selected
  const canTransitionToFinished = () => {
    return state !== 'Idle';
  };

  // Show the preview modal when finished
  const handleFinish = () => {
    transition('Finished');
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    const avatarElement = avatarRef.current;
    if (avatarElement) {
      html2canvas(avatarElement).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'avatar.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="dress-up-container">
      <div className="button-section-left">
        <h3>Select Skin</h3>
        <button onClick={() => selectSkin('skin1.png')}>Skin Tone 1</button>
        <button onClick={() => selectSkin('skin2.png')}>Skin Tone 2</button>
        <button onClick={() => selectSkin('skin3.png')}>Skin Tone 3</button>

        <h3>Select Eyes</h3>
        <button onClick={() => selectEyes('eyes1.png')}>Eyes 1</button>
        <button onClick={() => selectEyes('eyes2.png')}>Eyes 2</button>
        <button onClick={() => selectEyes('eyes3.png')}>Eyes 3</button>
        <button onClick={() => selectEyes('eyes4.png')}>Eyes 4</button>

        <h3>Select Hair</h3>
        <button onClick={() => selectHair('hair1.png')}>Hair Style 1</button>
        <button onClick={() => selectHair('hair2.png')}>Hair Style 2</button>
        <button onClick={() => selectHair('hair3.png')}>Hair Style 3</button>
        <button onClick={() => selectHair('hair4.png')}>Hair Style 4</button>
      </div>
      
      <AvatarBackground>
        <div className="avatar-section" ref={avatarRef}>
          <Avatar 
            idle={'idle.png'}
            skin={skin}
            eyes={eyes}
            hair={hair}
            clothes={clothes} 
            accessories={accessories}
          />
        </div>
      </AvatarBackground>

      <div className="button-section-right">
        <h3>Select Clothes</h3>
        <button onClick={() => selectClothes('clothes1.png')}>Clothes 1</button>
        <button onClick={() => selectClothes('clothes2.png')}>Clothes 2</button>
        <button onClick={() => selectClothes('clothes3.png')}>Clothes 3</button>

        <h3>Select Accessories</h3>
        <button onClick={() => selectAccessories('accessories1.png')}>Accessories 1</button>
        <button onClick={() => selectAccessories('accessories2.png')}>Accessories 2</button>
        <button onClick={() => selectAccessories('accessories3.png')}>Accessories 3</button>

        {canTransitionToFinished() && (
          <button onClick={handleFinish}>Finish</button>
        )}
      </div>

      <Modal
        title="Avatar Preview"
        visible={isModalVisible}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Close
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save Avatar
          </Button>,
        ]}
      >
        <div className="avatar-preview" ref={avatarRef}>
          <Avatar 
            idle={'idle.png'}
            skin={skin}
            eyes={eyes}
            hair={hair}
            clothes={clothes} 
            accessories={accessories}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DressUp;
