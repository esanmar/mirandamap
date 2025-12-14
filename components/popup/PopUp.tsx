/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// FIX: Added FC to the React import.
import React, { FC } from 'react';
import './PopUp.css';

interface PopUpProps {
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Guía Turístico Accesible - Miranda de Ebro</h2>
        <div className="popup-scrollable-content">
          <p>
            Esta demostración es un agente turístico virtual diseñado para ayudar a personas invidentes o con discapacidad visual a descubrir <strong>Miranda de Ebro</strong> y sus alrededores.
        
          </p>
          <p>Cómo empezar:</p>
          <ol>
            <li>
              <span className="icon">play_circle</span>
              <div>Pulsa el botón <strong>&nbsp; Reproducir &nbsp;</strong> para conectar.</div>
            </li>
            <li>
              <span className="icon">record_voice_over</span>
              <div><strong>Habla naturalmente &nbsp;</strong>. Prueba a decir:
              "Hola, quiero conocer la historia del Puente Carlos III", "¿Qué eventos hay este fin de semana?" o "¿Qué restaurantes accesibles hay cerca?".</div>
            </li>
            <li>
              <span className="icon">hearing</span>
              <div>Escucha las <strong>&nbsp; descripciones detalladas &nbsp;</strong> sobre el entorno, sonidos y ambiente.</div>
            </li>
            <li>
              <span className="icon">keyboard</span>
              <div>También puedes <strong>&nbsp; escribir &nbsp;</strong> tus consultas en el cuadro de texto.</div>
            </li>
          </ol>
        </div>
        <button onClick={onClose}>¡Entendido, vamos a explorar!</button>
      </div>
    </div>
  );
};

export default PopUp;