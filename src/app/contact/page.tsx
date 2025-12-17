'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

// --- TYPES ---
interface FormData {
  services: string[]
  budget: string
  timeline: string
  name: string
  email: string
  company: string
  website: string
  message: string
  howFound: string
}

// --- DONNÉES ---
const services = [
  { 
    id: 'branding', 
    label: 'Brand Identity', 
    description: 'Logo, charte graphique, direction artistique' 
  },
  { 
    id: 'webdesign', 
    label: 'Web Design', 
    description: 'UX/UI, maquettes, prototypes interactifs' 
  },
  { 
    id: 'webdev', 
    label: 'Développement Web', 
    description: 'Site vitrine, e-commerce, application sur-mesure' 
  },
  { 
    id: 'social', 
    label: 'Social Media', 
    description: 'Stratégie, création de contenu, community management' 
  },
  { 
    id: 'marketing', 
    label: 'Webmarketing', 
    description: 'SEO, SEA, emailing, analytics & reporting' 
  },
  { 
    id: 'photo', 
    label: 'Shooting Photo & Vidéo', 
    description: 'Packshot produit, lifestyle, motion design' 
  },
]

const budgets = [
  { id: 'small', label: 'Moins de 3 000 €', hint: 'Projet simple' },
  { id: 'medium', label: '3 000 € — 8 000 €', hint: 'Projet standard' },
  { id: 'large', label: '8 000 € — 15 000 €', hint: 'Projet complet' },
  { id: 'enterprise', label: 'Plus de 15 000 €', hint: 'Projet d\'envergure' },
  { id: 'unknown', label: 'À définir ensemble', hint: 'Discutons-en' },
]

const timelines = [
  { id: 'urgent', label: 'Moins d\'un mois' },
  { id: 'normal', label: '1 à 3 mois' },
  { id: 'relaxed', label: '3 à 6 mois' },
  { id: 'flexible', label: 'Pas de contrainte' },
]

const sources = [
  'Google',
  'Instagram',
  'LinkedIn',
  'Recommandation',
  'Autre',
]

// --- COMPOSANTS UI ---

const SelectCard = ({ 
  selected, 
  onClick, 
  children, 
  className = '' 
}: { 
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string 
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    className={`
      group relative text-left rounded-2xl border transition-all duration-500
      ${selected 
        ? 'border-arti-black bg-arti-black text-white' 
        : 'border-black/10 bg-transparent hover:border-black/30 text-arti-black'
      }
      ${className}
    `}
  >
    {/* Indicateur de sélection */}
    <div className={`
      absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center
      transition-all duration-300
      ${selected ? 'border-white bg-white' : 'border-black/20 bg-transparent'}
    `}>
      <motion.div 
        initial={false}
        animate={{ scale: selected ? 1 : 0 }}
        className="w-2.5 h-2.5 rounded-full bg-arti-black"
      />
    </div>
    {children}
  </motion.button>
)

const Input = ({ 
  label, 
  error,
  ...props 
}: { 
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-medium text-arti-black/50 uppercase tracking-wider">
      {label}
    </label>
    <input
      {...props}
      className={`
        w-full px-0 py-4 bg-transparent
        text-arti-black text-lg
        border-b-2 transition-all duration-300
        focus:outline-none focus:border-arti-black
        placeholder:text-black/25
        ${error ? 'border-red-500' : 'border-black/10 hover:border-black/20'}
      `}
    />
    {error && (
      <span className="text-red-500 text-sm">{error}</span>
    )}
  </div>
)

const Textarea = ({ 
  label, 
  error,
  ...props 
}: { 
  label: string
  error?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-medium text-arti-black/50 uppercase tracking-wider">
      {label}
    </label>
    <textarea
      {...props}
      className={`
        w-full px-0 py-4 bg-transparent
        text-arti-black text-lg min-h-[180px] resize-none
        border-b-2 transition-all duration-300
        focus:outline-none focus:border-arti-black
        placeholder:text-black/25
        ${error ? 'border-red-500' : 'border-black/10 hover:border-black/20'}
      `}
    />
    {error && (
      <span className="text-red-500 text-sm">{error}</span>
    )}
  </div>
)

// Progress bar minimaliste
const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="flex items-center gap-6">
    <div className="flex-1 h-[2px] bg-black/10 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-arti-black"
        initial={{ width: 0 }}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      />
    </div>
    <span className="text-sm text-arti-black/40 font-medium tabular-nums">
      {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  </div>
)

// --- ÉTAPES ---

const Step1Services = ({ 
  formData, 
  setFormData 
}: { 
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>> 
}) => {
  const toggleService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id]
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-4 max-w-xl">
        <span className="text-sm font-medium text-arti-black/40 uppercase tracking-wider">
          Étape 01
        </span>
        <h2 className="text-[32px] md:text-[42px] font-normal text-arti-black leading-[1.1]">
          De quoi avez-vous besoin ?
        </h2>
        <p className="text-lg text-arti-black/50 font-light">
          Sélectionnez un ou plusieurs services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <SelectCard
            key={service.id}
            selected={formData.services.includes(service.id)}
            onClick={() => toggleService(service.id)}
            className="p-6 md:p-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col gap-3 pr-8"
            >
              <span className="text-xl font-medium">{service.label}</span>
              <p className={`text-sm font-light transition-colors duration-300 ${
                formData.services.includes(service.id) ? 'text-white/60' : 'text-arti-black/40'
              }`}>
                {service.description}
              </p>
            </motion.div>
          </SelectCard>
        ))}
      </div>
    </motion.div>
  )
}

const Step2Budget = ({ 
  formData, 
  setFormData 
}: { 
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>> 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-4 max-w-xl">
        <span className="text-sm font-medium text-arti-black/40 uppercase tracking-wider">
          Étape 02
        </span>
        <h2 className="text-[32px] md:text-[42px] font-normal text-arti-black leading-[1.1]">
          Quel est votre budget ?
        </h2>
        <p className="text-lg text-arti-black/50 font-light">
          Cette indication nous aide à vous proposer des solutions adaptées.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((budget, index) => (
          <SelectCard
            key={budget.id}
            selected={formData.budget === budget.id}
            onClick={() => setFormData(prev => ({ ...prev, budget: budget.id }))}
            className="p-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col gap-2 pr-8"
            >
              <span className="text-lg font-medium">{budget.label}</span>
              <span className={`text-sm font-light transition-colors duration-300 ${
                formData.budget === budget.id ? 'text-white/60' : 'text-arti-black/40'
              }`}>
                {budget.hint}
              </span>
            </motion.div>
          </SelectCard>
        ))}
      </div>

      {/* Délai */}
      <div className="flex flex-col gap-6 pt-8 border-t border-black/5">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-medium text-arti-black">
            Et côté délai ?
          </h3>
          <p className="text-arti-black/50 font-light">
            Quand souhaitez-vous lancer le projet ?
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {timelines.map((timeline) => (
            <button
              key={timeline.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, timeline: timeline.id }))}
              className={`
                px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${formData.timeline === timeline.id 
                  ? 'bg-arti-black text-white' 
                  : 'bg-black/5 text-arti-black/60 hover:bg-black/10'
                }
              `}
            >
              {timeline.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Step3Contact = ({ 
  formData, 
  setFormData,
  errors 
}: { 
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: Record<string, string>
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-4 max-w-xl">
        <span className="text-sm font-medium text-arti-black/40 uppercase tracking-wider">
          Étape 03
        </span>
        <h2 className="text-[32px] md:text-[42px] font-normal text-arti-black leading-[1.1]">
          Comment vous contacter ?
        </h2>
        <p className="text-lg text-arti-black/50 font-light">
          Dernière étape, promis. On reviendra vers vous rapidement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <Input
          label="Votre nom *"
          placeholder="Jean Dupont"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          error={errors.name}
        />
        <Input
          label="Email *"
          type="email"
          placeholder="jean@entreprise.com"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <Input
          label="Entreprise"
          placeholder="Nom de votre entreprise"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
        />
        <Input
          label="Site web actuel"
          placeholder="https://votresite.com"
          value={formData.website}
          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
        />
      </div>

      <Textarea
        label="Décrivez votre projet *"
        placeholder="Parlez-nous de votre projet, vos objectifs, vos contraintes éventuelles..."
        value={formData.message}
        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        error={errors.message}
      />

      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-arti-black/50 uppercase tracking-wider">
          Comment nous avez-vous connu ?
        </label>
        <div className="flex flex-wrap gap-3">
          {sources.map((source) => (
            <button
              key={source}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, howFound: source }))}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${formData.howFound === source 
                  ? 'bg-arti-black text-white' 
                  : 'bg-black/5 text-arti-black/60 hover:bg-black/10'
                }
              `}
            >
              {source}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const StepConfirmation = ({ formData }: { formData: FormData }) => {
  const selectedServices = services.filter(s => formData.services.includes(s.id))
  const selectedBudget = budgets.find(b => b.id === formData.budget)
  const selectedTimeline = timelines.find(t => t.id === formData.timeline)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className="flex flex-col items-center text-center gap-12 py-12 md:py-24"
    >
      {/* Checkmark animé */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
          className="w-24 h-24 bg-arti-black rounded-full flex items-center justify-center"
        >
          <motion.svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.path
              d="M10 20 L17 27 L30 14"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            />
          </motion.svg>
        </motion.div>
        
        {/* Cercle décoratif */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 border-2 border-arti-black rounded-full"
        />
      </div>

      <div className="flex flex-col gap-4 max-w-lg">
        <h2 className="text-[32px] md:text-[42px] font-normal text-arti-black leading-[1.1]">
          Demande envoyée
        </h2>
        <p className="text-lg text-arti-black/50 font-light">
          Merci {formData.name.split(' ')[0]}. Nous avons bien reçu votre demande 
          et reviendrons vers vous sous 24 à 48 heures.
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="w-full max-w-md border border-black/10 rounded-2xl p-8 text-left">
        <span className="text-xs font-medium text-arti-black/40 uppercase tracking-wider">
          Récapitulatif
        </span>
        
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
            <span className="text-arti-black/50 text-sm">Services</span>
            <span className="text-arti-black text-sm text-right font-medium">
              {selectedServices.map(s => s.label).join(', ')}
            </span>
          </div>
          <div className="w-full h-px bg-black/5" />
          
          <div className="flex justify-between">
            <span className="text-arti-black/50 text-sm">Budget</span>
            <span className="text-arti-black text-sm font-medium">
              {selectedBudget?.label || 'Non spécifié'}
            </span>
          </div>
          <div className="w-full h-px bg-black/5" />
          
          <div className="flex justify-between">
            <span className="text-arti-black/50 text-sm">Délai</span>
            <span className="text-arti-black text-sm font-medium">
              {selectedTimeline?.label || 'Non spécifié'}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="group inline-flex items-center gap-3 px-8 py-4 bg-arti-black text-white rounded-full font-medium 
                   hover:bg-black transition-colors duration-300"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
        <span>Retour à l'accueil</span>
      </Link>
    </motion.div>
  )
}

// --- PAGE PRINCIPALE ---
export default function ContactPage() {
  const containerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    services: [],
    budget: '',
    timeline: '',
    name: '',
    email: '',
    company: '',
    website: '',
    message: '',
    howFound: '',
  })

  const totalSteps = 3
  const prevStepRef = useRef<number | null>(null)

  // Scroll vers le haut du formulaire uniquement lors des vrais changements d'étape
  useEffect(() => {
    // Ne pas scroller si c'est le montage initial (prevStep est null)
    // ou si on vient de soumettre le formulaire
    if (prevStepRef.current === null) {
      prevStepRef.current = currentStep
      return
    }
    
    // Ne scroller que si l'étape a vraiment changé
    if (prevStepRef.current !== currentStep && formRef.current && !isSubmitted) {
      const offsetTop = formRef.current.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
    
    prevStepRef.current = currentStep
  }, [currentStep, isSubmitted])

  // Animation d'entrée GSAP
  useGSAP(() => {
    const tl = gsap.timeline()
    
    tl.from(".contact-header-line", {
      y: 120,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.1
    })
    .from(".contact-intro", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    
  }, { scope: containerRef })

  // Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 0 && formData.services.length === 0) {
      return false
    }

    if (step === 2) {
      if (!formData.name.trim()) newErrors.name = 'Champ requis'
      if (!formData.email.trim()) {
        newErrors.email = 'Champ requis'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide'
      }
      if (!formData.message.trim()) newErrors.message = 'Champ requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setErrors({})
    }
  }

  // Soumission avec Brevo
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi')
      }

      setIsSubmitted(true)
      // Scroll vers le haut pour la confirmation
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    if (currentStep === 0) return formData.services.length > 0
    if (currentStep === 1) return formData.budget !== ''
    if (currentStep === 2) return formData.name && formData.email && formData.message
    return true
  }

  return (
    <main ref={containerRef} className="w-full bg-white min-h-screen pt-32 md:pt-40 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        {!isSubmitted && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="overflow-hidden mb-6">
              <h1 className="contact-header-line text-[40px] md:text-[56px] lg:text-[72px] font-normal text-arti-black leading-[1] tracking-tight">
                Démarrons un projet
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="contact-intro text-lg md:text-xl text-arti-black/50 font-light max-w-xl">
                Quelques questions pour cerner votre besoin. Nous reviendrons vers vous sous 24 à 48h.
              </p>
            </div>
          </div>
        )}

        {/* Conteneur principal centré */}
        <div ref={formRef} className="max-w-4xl mx-auto">
          {/* Progress */}
          {!isSubmitted && (
            <div className="mb-12">
              <ProgressBar current={currentStep} total={totalSteps} />
            </div>
          )}

          {/* Étapes */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <StepConfirmation key="confirmation" formData={formData} />
            ) : (
              <>
                {currentStep === 0 && (
                  <Step1Services 
                    key="step1" 
                    formData={formData} 
                    setFormData={setFormData} 
                  />
                )}
                {currentStep === 1 && (
                  <Step2Budget 
                    key="step2" 
                    formData={formData} 
                    setFormData={setFormData} 
                  />
                )}
                {currentStep === 2 && (
                  <Step3Contact 
                    key="step3" 
                    formData={formData} 
                    setFormData={setFormData}
                    errors={errors}
                  />
                )}
              </>
            )}
          </AnimatePresence>

          {/* Erreur de soumission */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
            >
              {submitError}
            </motion.div>
          )}

          {/* Navigation */}
          {!isSubmitted && (
            <div className="mt-16 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                className={`
                  group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                  ${currentStep === 0 
                    ? 'opacity-0 pointer-events-none' 
                    : 'text-arti-black/50 hover:text-arti-black'
                  }
                `}
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                <span>Retour</span>
              </button>

              <motion.button
                type="button"
                onClick={nextStep}
                disabled={!canProceed() || isSubmitting}
                whileHover={canProceed() && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={canProceed() && !isSubmitting ? { scale: 0.98 } : {}}
                className={`
                  group relative flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300
                  ${canProceed() && !isSubmitting
                    ? 'bg-arti-black text-white hover:bg-black' 
                    : 'bg-black/10 text-black/30 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Envoi...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === totalSteps - 1 ? 'Envoyer' : 'Continuer'}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>

        {/* Contact alternatif */}
        {!isSubmitted && (
          <div className="max-w-4xl mx-auto mt-24 pt-12 border-t border-black/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-medium text-arti-black">
                  Vous préférez échanger directement ?
                </span>
                <span className="text-arti-black/50">
                  Parfois un appel vaut mieux qu'un formulaire.
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:artichaud.studio@gmail.com"
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 
                             text-arti-black font-medium hover:border-arti-black transition-all duration-300"
                >
                  <span>artichaud.studio@gmail.com</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </a>
                <a
                  href="tel:0697538017"
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 
                             text-arti-black font-medium hover:border-arti-black transition-all duration-300"
                >
                  <span>06 97 53 80 17</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}