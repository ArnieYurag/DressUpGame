import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import html2canvas from 'html2canvas';
import Avatar from './Avatar';
import '../styles/DressUp.css';
import AvatarBackground from '../components/Background';

import skinFolder from '../assets/folders/skinFolder.png'
import eyesFolder from '../assets/folders/eyesFolder.png';
import hairFolder from '../assets/folders/hairFolder.png';
import clothesFolder from '../assets/folders/clothesFolder.png';
import accessoriesFolder from '../assets/folders/accessoriesFolder.png';

const DressUp = () => {
  const [state, setState] = useState('Idle');
  const [skin, setSkin] = useState(null);
  const [eyes, setEyes] = useState(null);
  const [hair, setHair] = useState(null);
  const [clothes, setClothes] = useState(null);
  const [accessories, setAccessories] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  
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

//   // Only show finish button when one/more components are selected
//   const canTransitionToFinished = () => {
//     return state !== 'Idle';
//   };
  const canTransitionToFinished = () => {
    return skin !== null && eyes !== null && hair !== null && clothes !== null && accessories !== null;
  };

  const handleFinish = () => {
    transition('Finished');
    setIsModalVisible(true);
  };

  // Function to handle folder clicks and toggle the active folder
  const toggleFolder = (folderName) => {
    // If the folder clicked is already active, close it, otherwise open it
    setActiveFolder((prevFolder) => (prevFolder === folderName ? null : folderName));
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
        {/* <h3>Select Skin</h3> */}
        <img
          src={skinFolder}
          alt="Skin Options"
          className="folderImage"
          onClick={() => toggleFolder('skin')}
        />
        {activeFolder === 'skin' && (
          <div className="skin-tone-options">
            <button
              onClick={() => selectSkin('skin1.png')}
              className={skin === 'skin1.png' ? 'selected' : ''}
            >
              Skin Tone 1
            </button>
            <button
              onClick={() => selectSkin('skin2.png')}
              className={skin === 'skin2.png' ? 'selected' : ''}
            >
              Skin Tone 2
            </button>
            <button
              onClick={() => selectSkin('skin3.png')}
              className={skin === 'skin3.png' ? 'selected' : ''}
            >
              Skin Tone 3
            </button>
          </div>
        )}

        {/* <h3>Select Eyes</h3> */}
        <img
          src={eyesFolder}
          alt="Eyes Options"
          className="folderImage"
          onClick={() => toggleFolder('eyes')}
        />
        {activeFolder === 'eyes' && (
          <div className="eyes-options">
            <button
              onClick={() => selectEyes('eyes1.png')}
              className={eyes === 'eyes1.png' ? 'selected' : ''}
            >
              Eyes 1
            </button>
            <button
              onClick={() => selectEyes('eyes2.png')}
              className={eyes === 'eyes2.png' ? 'selected' : ''}
            >
              Eyes 2
            </button>
            <button
              onClick={() => selectEyes('eyes3.png')}
              className={eyes === 'eyes3.png' ? 'selected' : ''}
            >
              Eyes 3
            </button>
            <button
              onClick={() => selectEyes('eyes4.png')}
              className={eyes === 'eyes4.png' ? 'selected' : ''}
            >
              Eyes 4
            </button>
          </div>
        )}

        {/* <h3>Select Hair</h3> */}
        <img
          src={hairFolder}
          alt="Hair Options"
          className="folderImage"
          onClick={() => toggleFolder('hair')}
        />
        {activeFolder === 'hair' && (
          <div className="hair-options">
            <button
              onClick={() => selectHair('hair1.png')}
              className={hair === 'hair1.png' ? 'selected' : ''}
            >
              Hair 1
            </button>
            <button
              onClick={() => selectHair('hair2.png')}
              className={hair === 'hair2.png' ? 'selected' : ''}
            >
              Hair 2
            </button>
            <button
              onClick={() => selectHair('hair3.png')}
              className={hair === 'hair3.png' ? 'selected' : ''}
            >
              Hair 3
            </button>
            <button
              onClick={() => selectHair('hair4.png')}
              className={hair === 'hair4.png' ? 'selected' : ''}
            >
              Hair 4
            </button>
          </div>
        )}
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
        {/* <h3>Select Clothes</h3> */}
        <img
          src={clothesFolder}
          alt="Clothes Options"
          className="folderImage"
          onClick={() => toggleFolder('clothes')}
        />
        {activeFolder === 'clothes' && (
          <div className="clothes-options">
            <button
              onClick={() => selectClothes('clothes1.png')}
              className={clothes === 'clothes1.png' ? 'selected' : ''}
            >
              Clothes 1
            </button>
            <button
              onClick={() => selectClothes('clothes2.png')}
              className={clothes === 'clothes2.png' ? 'selected' : ''}
            >
              Clothes 2
            </button>
            <button
              onClick={() => selectClothes('clothes3.png')}
              className={clothes === 'clothes3.png' ? 'selected' : ''}
            >
              Clothes 3
            </button>
          </div>
        )}

        {/* <h3>Select Accessories</h3> */}
        <img
          src={accessoriesFolder}
          alt="Accessories Options"
          className="folderImage"
          onClick={() => toggleFolder('accessories')}
        />
        {activeFolder === 'accessories' && (
          <div className="accessories-options">
            <button
              onClick={() => selectAccessories('accessories1.png')}
              className={accessories === 'accessories1.png' ? 'selected' : ''}
            >
              Accessories 1
            </button>
            <button
              onClick={() => selectAccessories('accessories2.png')}
              className={accessories === 'accessories2.png' ? 'selected' : ''}
            >
              Accessories 2
            </button>
            <button
              onClick={() => selectAccessories('accessories3.png')}
              className={accessories === 'accessories3.png' ? 'selected' : ''}
            >
              Accessories 3
            </button>
          </div>
        )}

        {canTransitionToFinished() && (
        <button className="finishBtn" onClick={handleFinish}>Finish</button>
        )}
      </div>

      <Modal
        title="Avatar Preview"
        visible={isModalVisible}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Back
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
