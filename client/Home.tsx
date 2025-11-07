import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Clock, ArrowRight, Leaf, Heart, Apple, Syringe, Ear, Pill, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MapLocations } from "@/components/MapLocations";

export default function Home() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  // Effet parallax au scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détection de la section active pour la navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "endobiogenie", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section === "home" ? "hero" : section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validation en temps réel
    if (name === "email" && value) {
      if (!validateEmail(value)) {
        setFormErrors((prev) => ({ ...prev, email: "Email invalide" }));
      } else {
        setFormErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "phone" && value) {
      if (!validatePhone(value)) {
        setFormErrors((prev) => ({ ...prev, phone: "Numéro invalide" }));
      } else {
        setFormErrors((prev) => ({ ...prev, phone: "" }));
      }
    }

    if (name === "name" && value) {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }

    if (name === "message" && value) {
      setFormErrors((prev) => ({ ...prev, message: "" }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation finale
    const errors = {
      name: !contactForm.name ? "Le nom est requis" : "",
      email: !contactForm.email ? "L'email est requis" : !validateEmail(contactForm.email) ? "Email invalide" : "",
      phone: contactForm.phone && !validatePhone(contactForm.phone) ? "Numéro invalide" : "",
      message: !contactForm.message ? "Le message est requis" : "",
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    setIsSubmitting(true);

    // Envoi via Formspree (service gratuit d'envoi d'emails)
    fetch("https://formspree.io/f/xanyqeqb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message,
        _replyto: contactForm.email,
        _subject: `Demande de contact de ${contactForm.name}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
          setContactForm({ name: "", email: "", phone: "", message: "" });
        } else {
          alert("❌ Une erreur s'est produite. Veuillez réessayer ou nous contacter par téléphone.");
        }
      })
      .catch(() => {
        alert("❌ Une erreur s'est produite. Veuillez réessayer ou nous contacter par téléphone.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    {
      icon: Leaf,
      title: "Phytothérapie",
      description: "Utilisation des plantes sous toutes les formes : extraits secs, gemmothérapie, huiles essentielles et tisanes. La phytothérapie est au cœur de ma pratique et permet une prise en charge naturelle et efficace de nombreuses conditions.",
    },
    {
      icon: Heart,
      title: "Endobiogénie",
      description: "Phytothérapie axée principalement sur le système endocrinien et neurovégétatif. Une prise de sang bien spécifique (Biologie des Fonctions, BDF) peut être demandée si nécessaire.",
      note: "* Un supplément sera facturé pour l'utilisation d'un logiciel spécifique et l'interprétation des résultats.",
    },
    {
      icon: Apple,
      title: "Nutrition et Micronutrition",
      description: "Conseils sur les habitudes alimentaires, propositions de cures et de compléments alimentaires ciblés. Une prise de sang en micronutrition peut être demandée selon la prise en charge. Le laboratoire facture des suppléments d'honoraire pour ce type d'analyse.",
    },
    {
      icon: Syringe,
      title: "Mésothérapie",
      description: "Mini injections sur les trigger points de médicaments homéo-phyto pour traiter essentiellement les douleurs musculo-articulaires. Une approche douce et ciblée pour soulager les douleurs localisées.",
    },
    {
      icon: Ear,
      title: "Auriculothérapie",
      description: "Points traités au niveau de l'oreille avec des aiguilles semi-permanentes (ASP) pour soulager certaines douleurs, le stress, les troubles du sommeil, la péri-ménopause ou contribuer à l'arrêt du tabac.",
    },
    {
      icon: Pill,
      title: "Allopathie",
      description: "Réflexion clinique, prescription de médicaments et/ou examens complémentaires, référence chez médecins spécialistes. L'allopathie reste un outil important quand elle est nécessaire.",
    },
  ];

  const indications = [
    "Troubles du sommeil, anxiété, dépression",
    "Troubles digestifs chroniques (côlon irritable, intolérances)",
    "Infections respiratoires aigües, chroniques ou allergiques",
    "Douleurs diverses (articulaires, etc.)",
    "Symptômes féminins (douleurs menstruelles, péri-ménopause)",
    "Problèmes dermatologiques (peau sèche, acnée, eczéma)",
    "Nettoyage et drainage de l'organisme",
    "Soutien du système immunitaire",
    "Soutien lors d'un traitement de cancer",
    "Conseils alimentaires personnalisés",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <ScrollToTop />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-accent-foreground font-bold text-lg">ST</span>
            </div>
            <span className="font-semibold text-lg hidden md:inline">
              Dr. Tenreira
            </span>
          </button>
          <div className="flex gap-6 text-sm md:text-base">
            <a
              href="#services"
              className={`hover:text-accent transition-colors relative ${
                activeSection === "services" ? "text-accent font-semibold" : ""
              }`}
            >
              Services
              {activeSection === "services" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
              )}
            </a>
            <a
              href="#endobiogenie"
              className={`hover:text-accent transition-colors relative ${
                activeSection === "endobiogenie" ? "text-accent font-semibold" : ""
              }`}
            >
              Endobiogénie
              {activeSection === "endobiogenie" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
              )}
            </a>
            <a
              href="#contact"
              className={`hover:text-accent transition-colors relative ${
                activeSection === "contact" ? "text-accent font-semibold" : ""
              }`}
            >
              Contact
              {activeSection === "contact" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
              )}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
        {/* Effet parallax visible */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,113,108,0.15),transparent_60%)]"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,113,108,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0}>
              <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight" style={{ lineHeight: "1.3" }}>
                <span className="block">Dr. Tenreira</span>
                <span className="block">Médecine générale et endobiogénie</span>
              </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-4" style={{ lineHeight: "1.7" }}>
                  Une approche médicale globale, personnalisée et naturelle pour
                  votre bien-être
                </p>
                <p className="text-base md:text-lg text-muted-foreground mb-8" style={{ lineHeight: "1.8" }}>
                  Bienvenue chez le Dr. Suzanne Tenreira Martins, médecin
                  généraliste spécialisée en phytothérapie, endobiogénie,
                  nutrition, mésothérapie et auriculothérapie. Je vous propose une
                  médecine de confiance qui combine l'expertise médicale
                  conventionnelle avec les meilleures pratiques des médecines
                  naturelles.
                </p>
                <div className="flex gap-4">
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                    onClick={() =>
                      window.open(
                        "https://www.rdvmedical.be/doctor/belgium/ophain-bois-seigneur-isaac-1421/medecine-generale/martins-suzanne-dr-tenreira",
                        "_blank"
                      )
                    }
                  >
                    Prendre rendez-vous
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-accent/10 transition-all hover:scale-105 active:scale-95"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Me contacter
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm">
                  <img
                    src="/dr-tenreira.webp"
                    alt="Dr. Suzanne Tenreira Martins, médecin généraliste spécialisée en endobiogénie, phytothérapie et nutrition à Bruxelles et Ophain"
                    className="w-full h-auto rounded-2xl object-cover hover:scale-105 transition-transform duration-500"
                    style={{
                      boxShadow:
                        "0 20px 40px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.08)",
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Qui suis-je ?
              </h2>
            </ScrollReveal>
            <div className="space-y-6 text-muted-foreground" style={{ lineHeight: "1.8" }}>
              <ScrollReveal delay={100}>
                <p>
                  Je suis médecin généraliste spécialisée en phytothérapie,
                  endobiogénie et nutrition. Ma prise en charge est basée sur la
                  prévention médicale et nutritionnelle, ainsi que des traitements
                  peu invasifs, personnalisés et les plus naturels possibles.
                  J'utilise l'allopathie si cela est nécessaire.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p>
                  Je propose à mes patients une vision globale, bien au-delà du
                  symptôme, bénéfique pour la santé sur le long terme. Depuis plus
                  de 20 ans, j'ai acquis une expérience variée en Belgique et à
                  l'international, notamment en missions humanitaires en Thaïlande
                  et en projets de développement sanitaire au Mozambique.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <p>
                  Je prends en charge tout type de patients : enfants, adolescents,
                  adultes et personnes âgées. Chaque consultation débute par une
                  anamnèse approfondie, un examen clinique complet et, si
                  nécessaire, une analyse des prises de sang spécifiques (Biologie
                  des Fonctions, micronutrition) pour établir un plan de prise en
                  charge personnalisé.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="flex items-center justify-center gap-2 mt-6 p-4 bg-accent/10 rounded-lg">
                  <span className="font-semibold text-accent">Langues parlées :</span>
                  <span className="text-foreground">Français, Anglais, Espagnol et Portugais</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Mes services
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-card rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-accent group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-2" style={{ lineHeight: "1.7" }}>
                          {service.description}
                        </p>
                        {service.note && (
                          <p className="text-sm text-muted-foreground italic mt-3">
                            {service.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {/* Indications thérapeutiques */}
            <ScrollReveal delay={600}>
              <div className="bg-card rounded-lg p-8 border-2 border-accent/30 shadow-sm mt-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Indications thérapeutiques
                </h3>
                <p className="text-muted-foreground mb-6" style={{ lineHeight: "1.7" }}>
                  Les indications thérapeutiques de la phytothérapie/endobiogénie
                  en complément avec la micro-nutrition et l'auriculothérapie sont
                  très variables :
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {indications.map((indication, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-start group"
                    >
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                      <span className="text-muted-foreground" style={{ lineHeight: "1.6" }}>{indication}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Endobiogénie */}
      <section id="endobiogenie" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                L'endobiogénie : une médecine du terrain
              </h2>
            </ScrollReveal>

            <div className="space-y-8 text-muted-foreground" style={{ lineHeight: "1.8" }}>
              <ScrollReveal delay={100}>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Qu'est-ce que l'endobiogénie ?
                  </h3>
                  <p>
                    L'endobiogénie est une approche médicale <strong>globale et personnalisée</strong> qui
                    s'appuie sur la théorie des systèmes et les principes de la
                    physiologie intégrative. Le terme signifie littéralement
                    l'étude du fonctionnement de la vie intérieure (Endo =
                    intérieur, Bio = vie, Génie = capacité du corps à
                    s'autogérer).
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Le concept du "terrain"
                  </h3>
                  <p>
                    Le fondement de l'endobiogénie repose sur la notion de
                    <strong> terrain</strong>. Le terrain se définit comme
                    l'ensemble des facteurs génétiques, physiologiques,
                    neurologiques et endocriniens qui sont propres à chaque
                    individu. Il représente la capacité du corps à s'adapter aux
                    situations, environnements et agressions, qu'elles soient
                    physiques ou psychiques. Chaque terrain est singulier et
                    évolue au cours de la vie.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    L'approche neuro-endocrinienne
                  </h3>
                  <p>
                    L'endobiogénie postule que l'équilibre global de l'organisme
                    nécessite un système dynamique d'intégration. Le
                    <strong> système neuroendocrinien</strong> (le système hormonal
                    associé au système nerveux) est le seul mécanisme
                    physiologique capable de répondre aux exigences d'une
                    véritable intégration, essentielle pour gérer une structure
                    vivante complexe comme le corps humain.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Principes clés de l'endobiogénie
                  </h3>
                  <p>
                    L'endobiogénie propose une approche médicale à la fois
                    préventive et curative. Elle respecte la singularité de chaque
                    individu et l'implique de façon active dans la prise en charge
                    de sa propre santé. Elle encourage également l'apprentissage
                    et l'utilisation d'alternatives thérapeutiques raisonnées pour
                    lutter contre le développement des résistances aux
                    antibiotiques et pour préserver leur efficacité en cas de
                    besoin.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Objectif thérapeutique
                  </h3>
                  <p>
                    En endobiogénie, j'identifie les déséquilibres
                    neuro-végétatifs et endocriniens ainsi que leurs causes pour
                    adapter le traitement et aider votre terrain à se réguler
                    efficacement. L'objectif est de soutenir les capacités de
                    restauration naturelle de votre organisme et de vous impliquer
                    activement dans votre prise en charge.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <div className="mt-8 p-6 bg-accent/10 rounded-lg border-l-4 border-accent">
                  <p className="text-muted-foreground mb-3">
                    Pour en savoir plus sur l'endobiogénie et ses fondements scientifiques :
                  </p>
                  <a
                    href="https://endobiogenie.eu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
                  >
                    Visitez endobiogenie.eu
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact et Informations pratiques */}
      <section id="contact" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Informations pratiques et contact
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Colonne gauche : Informations pratiques */}
            <div>
              <ScrollReveal delay={100}>
                <h3 className="text-2xl font-semibold text-foreground mb-8">
                  Lieux de consultation
                </h3>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <MapLocations />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-2xl font-semibold text-foreground mb-8">
                    Horaires et contact
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" />
                        Secrétariat
                      </h4>
                      <p className="text-muted-foreground text-sm" style={{ lineHeight: "1.7" }}>
                        Lundi à vendredi : 8h00 - 19h00<br />
                        Samedi : 9h00 - 12h00<br />
                        Dimanche et jours fériés : fermé
                      </p>
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-accent" />
                        Téléphone
                      </h4>
                      <a
                        href="tel:+3202888524"
                        className="text-accent hover:underline font-semibold text-lg hover:scale-105 inline-block transition-transform"
                      >
                        +32 (0)2 888 52 48
                      </a>
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-accent" />
                        Email
                      </h4>
                      <a
                        href="mailto:contact@drtenreira.be"
                        className="text-accent hover:underline hover:scale-105 inline-block transition-transform"
                      >
                        contact@drtenreira.be
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Prendre rendez-vous
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6" style={{ lineHeight: "1.7" }}>
                    Les consultations se font uniquement sur rendez-vous. Vous
                    pouvez réserver directement en ligne ou par téléphone.
                  </p>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                    onClick={() =>
                      window.open(
                        "https://www.rdvmedical.be/doctor/belgium/ophain-bois-seigneur-isaac-1421/medecine-generale/martins-suzanne-dr-tenreira",
                        "_blank"
                      )
                    }
                  >
                    Réserver en ligne
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            {/* Colonne droite : Formulaire de contact */}
            <ScrollReveal delay={200}>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-8">
                  Formulaire de contact
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${
                        formErrors.name ? "border-red-500" : "border-border"
                      } bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all`}
                      placeholder="Votre nom"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${
                        formErrors.email ? "border-red-500" : "border-border"
                      } bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all`}
                      placeholder="votre@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        formErrors.phone ? "border-red-500" : "border-border"
                      } bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all`}
                      placeholder="+32 (0)2 123 45 67"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleFormChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        formErrors.message ? "border-red-500" : "border-border"
                      } bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none shadow-sm transition-all`}
                      placeholder="Votre message..."
                    />
                    {formErrors.message && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Dr. Tenreira</h4>
                  <p className="text-sm text-muted-foreground" style={{ lineHeight: "1.6" }}>
                    Médecin généraliste spécialisée en endobiogénie,
                    phytothérapie clinique intégrative et nutrition.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Contact</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>
                      <a href="tel:+3202888524" className="hover:text-accent transition-colors">
                        +32 (0)2 888 52 48
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:contact@drtenreira.be"
                        className="hover:text-accent transition-colors"
                      >
                        contact@drtenreira.be
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Horaires</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>Lun-Ven: 8h00 - 19h00</li>
                    <li>Sam: 9h00 - 12h00</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                <p>
                  © 2025 Dr. Suzanne Tenreira Martins. Tous droits réservés.
                </p>
                <p className="mt-2">
                  Ordre des médecins de Belgique
                </p>
                <div className="mt-4 flex justify-center gap-6 text-xs">
                  <button className="hover:text-accent transition-colors">
                    Mentions légales
                  </button>
                  <button className="hover:text-accent transition-colors">
                    Politique de confidentialité
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </footer>
    </div>
  );
}
