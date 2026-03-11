import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../utils/cropImage'
import ModalShell from '../dashboard/ModalShell'
import { Check, X, RotateCw, ZoomIn } from 'lucide-react'

export default function ImageCropperModal({ 
  image, 
  isOpen, 
  onClose, 
  onCropComplete, 
  aspect = 1, 
  title = "Ajustar Imagen" 
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropChange = (crop) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom) => {
    setZoom(zoom)
  }

  const onRotationChange = (rotation) => {
    setRotation(rotation)
  }

  const onCropCompleteInternal = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      )
      onCropComplete(croppedImage)
      onClose()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle="Ajustá tu foto para que quede perfecta"
      footer={
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
          >
            Cancelar
          </button>
          <button
            onClick={handleDone}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold bg-gray-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Aplicar
          </button>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        {/* Contenedor del Cropper */}
        <div className="relative w-full h-[350px] sm:h-[400px] bg-gray-100 dark:bg-black rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteInternal}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
          />
        </div>

        {/* Controles */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <ZoomIn size={14} /> Zoom
              </label>
              <span className="text-xs font-mono font-bold text-orange-600">{Math.round(zoom * 100)}%</span>
            </div>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <RotateCw size={14} /> Rotación
              </label>
              <span className="text-xs font-mono font-bold text-orange-600">{rotation}°</span>
            </div>
            <input
              type="range"
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-500/10 p-4 rounded-xl border border-orange-100 dark:border-orange-500/20">
          <p className="text-xs text-orange-700 dark:text-orange-400 leading-relaxed font-medium">
            <strong>Tip:</strong> Podes arrastrar la imagen para centrarla exactamente donde quieras.
          </p>
        </div>
      </div>
    </ModalShell>
  )
}
