# Solución al Problema de Pantalla en Blanco

## Problema Identificado

La aplicación mostraba una pantalla en blanco porque tenía **rutas de imports incorrectas** que impedían que el proceso de build de Vite funcionara correctamente.

## Errores Corregidos

Se corrigieron los siguientes archivos con rutas de import incorrectas:

### 1. `components/streaming-console/StreamingConsole.tsx`
- **Antes**: `import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';`
- **Después**: `import { useLiveAPIContext } from '../../contexts/LiveAPIContext';`

### 2. `hooks/use-live-api.ts`
Se corrigieron múltiples imports:
- `import { GenAILiveClient } from '../lib/genai-live-client';`
- `import { AudioStreamer } from '../lib/audio-streamer';`
- `import { audioContext } from '../lib/utils';`
- `import VolMeterWorket from '../lib/worklets/vol-meter';`

## Verificación

El build ahora funciona correctamente:
```bash
✓ 539 modules transformed.
✓ built in 4.97s
```

Los archivos compilados se generan en el directorio `dist/`:
- `dist/index.html`
- `dist/assets/index-kj-lMOJh.js` (832.54 kB)
- `dist/assets/index-CeegWIng.css` (19.57 kB)

## Cómo Redesplegar desde AI Studio

### Opción 1: Redesplegar desde AI Studio (Recomendado)

1. Ve a [Google AI Studio](https://aistudio.google.com)
2. Abre tu proyecto "Guía Miranda de Ebro"
3. Haz clic en el botón **"Redeploy app"** que aparece en la captura que compartiste
4. Espera a que se complete el despliegue (1-2 minutos)
5. Verifica que la aplicación funcione en la URL proporcionada

### Opción 2: Desplegar Manualmente desde GitHub

Si AI Studio no detecta automáticamente los cambios, puedes:

1. Asegurarte de que los cambios estén en GitHub (ya están subidos)
2. En AI Studio, busca la opción para "Sync from GitHub" o "Update from repository"
3. Selecciona la rama `main`
4. Haz clic en "Deploy"

### Opción 3: Desplegar con Cloud Build (Avanzado)

Si necesitas más control sobre el proceso de despliegue, puedes crear un `cloudbuild.yaml`:

```yaml
steps:
  # Instalar dependencias
  - name: 'node:22'
    entrypoint: 'npm'
    args: ['install', '-g', 'pnpm']
  
  - name: 'node:22'
    entrypoint: 'pnpm'
    args: ['install']
  
  # Build
  - name: 'node:22'
    entrypoint: 'pnpm'
    args: ['build']
    env:
      - 'GEMINI_API_KEY=${_GEMINI_API_KEY}'
  
  # Desplegar a Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'gu-a-miranda-de-ebro-accesible'
      - '--source=./dist'
      - '--region=us-west1'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--set-env-vars=GEMINI_API_KEY=${_GEMINI_API_KEY}'

substitutions:
  _GEMINI_API_KEY: 'your-api-key-here'
```

## Verificación Post-Despliegue

Después de redesplegar, verifica que:

1. ✅ La página carga correctamente (no pantalla en blanco)
2. ✅ El mapa 3D de Miranda de Ebro se muestra
3. ✅ La consola del navegador no muestra errores
4. ✅ La funcionalidad de chat con Gemini funciona

## Notas Importantes

- Los cambios ya están en el repositorio de GitHub
- El build local funciona correctamente
- AI Studio debería detectar los cambios automáticamente al redesplegar
- Si el problema persiste, puede ser necesario limpiar la caché de Cloud Run

## Soporte

Si después de redesplegar el problema persiste, verifica:

1. Los logs de Cloud Run en la consola de Google Cloud
2. La consola del navegador (F12) para errores JavaScript
3. Que la variable de entorno `GEMINI_API_KEY` esté configurada correctamente
