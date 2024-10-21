import React from 'react';
import '../styles/Avatar.css';
import idleImage from '../assets/idle.png'

const Avatar = ({ idle, clothes, accessories, eyes, skin, hair }) => {
  return (
    <div className="avatar-container">
        
    <img src={idleImage} alt="Idle" className="avatar-item idle-layer" />
      {/* Import images dynamically */}
      {skin && <img src={require(`../assets/skin/${skin}`)} alt="Skin" className="avatar-item skin-layer" />}
      {eyes && <img src={require(`../assets/eyes/${eyes}`)} alt="Eyes" className="avatar-item eyes-layer" />}
      {hair && <img src={require(`../assets/hair/${hair}`)} alt="Hair" className="avatar-item hair-layer" />}
      {clothes && <img src={require(`../assets/clothes/${clothes}`)} alt="Clothes" className="avatar-item clothes-layer" />}
      {/* {shoes && <img src={require(`./assets/${shoes}`)} alt="Shoes" className="avatar-item shoes-layer" />} */}
      {accessories && <img src={require(`../assets/accessories/${accessories}`)} alt="Accessories" className="avatar-item accessories-layer" />}

    </div>
  );
};

export default Avatar;


