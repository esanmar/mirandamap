# Guía de Despliegue - Miranda Map

## Problema Identificado

La aplicación no se muestra correctamente (pantalla en blanco) porque falta la configuración de la variable de entorno `GEMINI_API_KEY` en el entorno de despliegue.

## Solución

### 1. Obtener una API Key de Gemini

1. Visita [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva API key o copia una existente
4. Guarda la API key de forma segura

### 2. Configurar la Variable de Entorno en Google Cloud Run

Dado que tu aplicación está desplegada en Google Cloud Run (según la URL), necesitas configurar la variable de entorno en el servicio:

#### Opción A: Usando la Consola de Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Navega a **Cloud Run**
3. Selecciona tu servicio: `gu-a-miranda-de-ebro-accesible`
4. Haz clic en **EDIT & DEPLOY NEW REVISION** (Editar e implementar nueva revisión)
5. Ve a la pestaña **Variables & Secrets** (Variables y secretos)
6. En la sección **Environment variables** (Variables de entorno), haz clic en **ADD VARIABLE** (Agregar variable)
7. Añade:
   - **Name (Nombre)**: `GEMINI_API_KEY`
   - **Value (Valor)**: Tu API key de Gemini
8. Haz clic en **DEPLOY** (Implementar)

#### Opción B: Usando gcloud CLI

```bash
gcloud run services update gu-a-miranda-de-ebro-accesible \
  --update-env-vars GEMINI_API_KEY=tu_api_key_aqui \
  --region us-west1
```

### 3. Desarrollo Local

Para ejecutar la aplicación localmente:

1. Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y añade tu API key:
   ```
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. Instala las dependencias:
   ```bash
   npm install
   # o
   pnpm install
   ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

5. Abre tu navegador en `http://localhost:3000`

### 4. Construir para Producción

```bash
npm run build
# o
pnpm build
```

Los archivos de producción se generarán en el directorio `dist/`.

## Verificación

Después de configurar la variable de entorno en Cloud Run:

1. Espera a que se complete el despliegue (puede tomar 1-2 minutos)
2. Visita tu URL: https://gu-a-miranda-de-ebro-accesible-69877116433.us-west1.run.app
3. La aplicación debería cargar correctamente mostrando el mapa 3D de Miranda de Ebro

## Notas Adicionales

### API Key de Google Maps

La aplicación también utiliza una API key de Google Maps que está actualmente hardcodeada en el código (`App.tsx`, línea 251). Para mayor seguridad y flexibilidad, considera:

1. Mover esta API key a una variable de entorno también
2. Habilitar las APIs necesarias en tu proyecto de Google Cloud:
   - Geocoding API
   - Places API (New)
   - Maps Elevation API
   - Maps Grounding API
   - Maps JavaScript API

### Seguridad

- **NUNCA** commits archivos `.env` al repositorio
- El archivo `.gitignore` ya está configurado para excluir archivos `.env`
- Considera usar Google Secret Manager para almacenar las API keys de forma más segura en producción

## Soporte

Si encuentras problemas adicionales, verifica:

1. Los logs de Cloud Run para errores específicos
2. La consola del navegador (F12) para mensajes de error
3. Que todas las APIs necesarias estén habilitadas en tu proyecto de Google Cloud
