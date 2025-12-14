/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import cn from 'classnames';
// FIX: Added missing React imports.
import React, { memo, useEffect, useRef, useState, FormEvent, Ref } from 'react';
import { AudioRecorder } from '../lib/audio-recorder';
import { useLogStore, useUI, useSettings } from '@/lib/state';

import { useLiveAPIContext } from '../contexts/LiveAPIContext';

// Hook to detect screen size for responsive component rendering
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export type ControlTrayProps = {
  trayRef?: Ref<HTMLElement>;
};

function ControlTray({trayRef}: ControlTrayProps) {
  const [speakerMuted, setSpeakerMuted] = useState(false);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(true);
  const [textPrompt, setTextPrompt] = useState('');
  const connectButtonRef = useRef<HTMLButtonElement>(null);
  const { toggleSidebar } = useUI();
  const { activateEasterEggMode } = useSettings();
  const settingsClickTimestamps = useRef<number[]>([]);
  const isMobile = useMediaQuery('(max-width: 768px), (orientation: landscape) and (max-height: 768px)');
  const [isTextEntryVisible, setIsTextEntryVisible] = useState(false);
  const isLandscape = useMediaQuery('(orientation: landscape) and (max-height: 768px)');


  const { client, connected, connect, disconnect, audioStreamer } =
    useLiveAPIContext();

  useEffect(() => {
    if (audioStreamer.current) {
      audioStreamer.current.gainNode.gain.value = speakerMuted ? 0 : 1;
    }
  }, [speakerMuted, audioStreamer]);

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: 'audio/pcm;rate=16000',
          data: base64,
        },
      ]);
    };
    
    if (connected && !muted && audioRecorder) {
      audioRecorder.on('data', onData);
      audioRecorder.start();
    } else {
      audioRecorder.stop();
    }
    return () => {
      audioRecorder.off('data', onData);
    };
  }, [connected, client, muted, audioRecorder]);

  const handleMicClick = () => {
    setMuted(!muted);
  };

  const handleTextSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textPrompt.trim()) return;

    useLogStore.getState().addTurn({
      role: 'user',
      text: textPrompt,
      isFinal: true,
    });
    const currentPrompt = textPrompt;
    setTextPrompt(''); // Clear input immediately

    if (!connected) {
      console.warn("Cannot send text message: not connected to live stream.");
      useLogStore.getState().addTurn({
        role: 'system',
        text: `No se puede enviar el mensaje. Conéctate primero.`,
        isFinal: true,
      });
      return;
    }
    client.sendRealtimeText(currentPrompt);
  };

  const handleSettingsClick = () => {
    toggleSidebar();
  };

  const micButtonTitle = muted ? 'Activar micrófono' : 'Silenciar micrófono';

  const connectButtonTitle = connected ? 'Detener transmisión' : 'Iniciar transmisión';

  return (
    <section className="control-tray" ref={trayRef}>
      <nav className={cn('actions-nav', { 'text-entry-visible-landscape': isLandscape && isTextEntryVisible })}>
        <button
          ref={connectButtonRef}
          className={cn('action-button connect-toggle', { connected })}
          onClick={connected ? disconnect : connect}
          title={connectButtonTitle}
        >
          <span className="material-symbols-outlined filled">
            {connected ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <button
          type="button"
          aria-label={
            !speakerMuted ? 'Audio activado' : 'Audio desactivado'
          }
          className={cn('action-button', {
            'speaker-on': !speakerMuted,
            'speaker-off': speakerMuted,
          })}
          onClick={() => setSpeakerMuted(!speakerMuted)}
          title={!speakerMuted ? 'Silenciar audio' : 'Activar audio'}
        >
          <span className="material-symbols-outlined">
            {!speakerMuted ? 'volume_up' : 'volume_off'}
          </span>
        </button>
        <button
          className={cn('action-button mic-button', {
            'mic-on': !muted,
            'mic-off': muted,
          })}
          onClick={handleMicClick}
          title={micButtonTitle}
        >
          {!muted ? (
            <span className="material-symbols-outlined filled">mic</span>
          ) : (
            <span className="material-symbols-outlined filled">mic_off</span>
          )}
        </button>
        <button
          className={cn('action-button keyboard-toggle-button')}
          onClick={() => setIsTextEntryVisible(!isTextEntryVisible)}
          title="Mostrar/Ocultar texto"
        >
          <span className="icon">
            {isTextEntryVisible ? 'keyboard_hide' : 'keyboard'}
          </span>
        </button>
        {(!isMobile || isTextEntryVisible) && (
          <form className="prompt-form" onSubmit={handleTextSubmit}>
            <input
              type="text"
              className="prompt-input"
              placeholder={
                connected ? 'Escribe un mensaje...' : 'Conecta para escribir...'
              }
              value={textPrompt}
              onChange={e => setTextPrompt(e.target.value)}
              aria-label="Entrada de texto"
              disabled={!connected}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!textPrompt.trim() || !connected}
              aria-label="Enviar mensaje"
            >
              <span className="icon">send</span>
            </button>
          </form>
        )}
        <button
          className={cn('action-button')}
          onClick={handleSettingsClick}
          title="Ajustes"
          aria-label="Ajustes"
        >
          <span className="icon">tune</span>
        </button>
      </nav>
    </section>
  );
}

export default memo(ControlTray);