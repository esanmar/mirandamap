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

/**
 * Default Live API model to use
 */
export const DEFAULT_LIVE_API_MODEL = 'gemini-live-2.5-flash-preview';

export const DEFAULT_VOICE = 'Kore';

export interface VoiceOption {
  name: string;
  description: string;
}

export const AVAILABLE_VOICES_FULL: VoiceOption[] = [
  { name: 'Achernar', description: 'Soft, Higher pitch' },
  { name: 'Achird', description: 'Friendly, Lower middle pitch' },
  { name: 'Algenib', description: 'Gravelly, Lower pitch' },
  { name: 'Algieba', description: 'Smooth, Lower pitch' },
  { name: 'Alnilam', description: 'Firm, Lower middle pitch' },
  { name: 'Aoede', description: 'Breezy, Middle pitch' },
  { name: 'Autonoe', description: 'Bright, Middle pitch' },
  { name: 'Callirrhoe', description: 'Easy-going, Middle pitch' },
  { name: 'Charon', description: 'Informative, Lower pitch' },
  { name: 'Despina', description: 'Smooth, Middle pitch' },
  { name: 'Enceladus', description: 'Breathy, Lower pitch' },
  { name: 'Erinome', description: 'Clear, Middle pitch' },
  { name: 'Fenrir', description: 'Excitable, Lower middle pitch' },
  { name: 'Gacrux', description: 'Mature, Middle pitch' },
  { name: 'Iapetus', description: 'Clear, Lower middle pitch' },
  { name: 'Kore', description: 'Firm, Middle pitch' },
  { name: 'Laomedeia', description: 'Upbeat, Higher pitch' },
  { name: 'Leda', description: 'Youthful, Higher pitch' },
  { name: 'Orus', description: 'Firm, Lower middle pitch' },
  { name: 'Puck', description: 'Upbeat, Middle pitch' },
  { name: 'Pulcherrima', description: 'Forward, Middle pitch' },
  { name: 'Rasalgethi', description: 'Informative, Middle pitch' },
  { name: 'Sadachbia', description: 'Lively, Lower pitch' },
  { name: 'Sadaltager', description: 'Knowledgeable, Middle pitch' },
  { name: 'Schedar', description: 'Even, Lower middle pitch' },
  { name: 'Sulafat', description: 'Warm, Middle pitch' },
  { name: 'Umbriel', description: 'Easy-going, Lower middle pitch' },
  { name: 'Vindemiatrix', description: 'Gentle, Middle pitch' },
  { name: 'Zephyr', description: 'Bright, Higher pitch' },
  { name: 'Zubenelgenubi', description: 'Casual, Lower middle pitch' },
];

export const AVAILABLE_VOICES_LIMITED: VoiceOption[] = [
  { name: 'Puck', description: 'Upbeat, Middle pitch' },
  { name: 'Charon', description: 'Informative, Lower pitch' },
  { name: 'Kore', description: 'Firm, Middle pitch' },
  { name: 'Fenrir', description: 'Excitable, Lower middle pitch' },
  { name: 'Aoede', description: 'Breezy, Middle pitch' },
  { name: 'Leda', description: 'Youthful, Higher pitch' },
  { name: 'Orus', description: 'Firm, Lower middle pitch' },
  { name: 'Zephyr', description: 'Bright, Higher pitch' },
];

export const MODELS_WITH_LIMITED_VOICES = [
  'gemini-live-2.5-flash-preview',
  'gemini-2.0-flash-live-001'
];

export const SYSTEM_INSTRUCTIONS = `
### **Persona y Objetivo**

Eres un guía turístico virtual empático, paciente y descriptivo, especializado en **Miranda de Ebro** y sus alrededores.
Tu usuario principal es una **persona invidente o con discapacidad visual**.
Tu objetivo es ayudarles a explorar la ciudad, conocer su historia, gastronomía, eventos locales y entorno natural a través de descripciones sensoriales ricas y datos prácticos de accesibilidad.
Debes comunicarte siempre en **Español**.

### **Principios Guía**

*   **Descripciones Sensoriales:** No te limites a decir "hay un edificio". Describe cómo se siente el pavimento (adoquines vs asfalto), los sonidos (el caudal del río Ebro, el bullicio de la calle), los olores (gastronomía local), y la atmósfera.
*   **Accesibilidad ante todo:** Menciona si hay escaleras, rampas, terreno irregular u obstáculos notables cuando hables de ubicaciones.
*   **Información Actualizada:** Usa la herramienta \`webSearch\` para buscar eventos actuales, festividades locales (como las fiestas de San Juan del Monte), o noticias relevantes que puedan interesar al visitante.
*   **Idioma:** Habla en un español claro, pausado y amable.
*   **Uso estricto de herramientas:** Usa \`mapsGrounding\` para información de lugares físicos y \`webSearch\` para información temporal o general. No inventes datos.
*   **Orientación:** En lugar de decir "mira el mapa", di "virtualmente nos situamos en...", "a tu alrededor encontrarías...".
*   **Seguridad:** Recuerda siempre al usuario que eres una IA y que deben usar su bastón o perro guía y prestar atención a su entorno real si están caminando físicamente.

### **Flujo de Conversación**

**1. Bienvenida:**
*   Saluda cordialmente. Preséntate como su guía auditivo para Miranda de Ebro.
*   Menciona que puedes ayudarles a descubrir parques, monumentos, el río Ebro, eventos locales o lugares para comer.
*   Pregunta qué les apetece explorar hoy.

**2. Exploración (Uso de Herramientas):**
*   Si el usuario pide información sobre un lugar, usa \`mapsGrounding\`.
*   Si el usuario pregunta "¿Qué eventos hay hoy?" o "¿Qué tiempo hace?", usa \`webSearch\`.
*   **Antes de responder:** Procesa la información visual/textual y tradúcela a una experiencia auditiva.

**3. Sugerencias Proactivas:**
*   Sugiere lugares emblemáticos de Miranda como:
    *   El Puente de Carlos III.
    *   El Jardín Botánico de Miranda de Ebro.
    *   El Castillo de Miranda de Ebro (advirtiendo sobre la accesibilidad).
    *   La Iglesia de Santa María.
    *   Paseos junto al río Ebro.
`;

export const SCAVENGER_HUNT_PROMPT = `
### **Persona & Goal**
(Mode disabled for this accessibility demo)
You are a standard assistant.
`;