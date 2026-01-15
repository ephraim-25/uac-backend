export const UAC_SEED_DATA = {
    categories: [
        {
            name: 'Énergie Solaire',
            description: 'Solutions autonomes et hybrides pour maisons et entreprises',
        },
        {
            name: 'Informatique',
            description: 'Ordinateurs, serveurs et accessoires professionnels',
        },
        {
            name: 'Électronique',
            description: 'TV, Son et divertissement haute définition',
        },
        {
            name: 'Gros Électroménager',
            description: 'Frigos, cuisinières et climatisation',
        },
    ],
    products: [
        // --- ÉNERGIE SOLAIRE ---
        {
            name: 'Kit Solaire UAC Home 5KVA',
            description:
                'Système complet incluant 8 panneaux 450W, onduleur hybride et batteries Lithium. Idéal pour une maison de 4 chambres à Kinshasa. Installation professionnelle incluse.',
            base_price_usd: 4200.0,
            categoryName: 'Énergie Solaire',
            images: [
                'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
                'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
            ],
            specifications: {
                Puissance: '5KVA',
                Panneaux: '8x 450W Monocristallin',
                Batterie: 'Lithium 100Ah',
                Onduleur: 'Hybride MPPT',
                Garantie: '5 ans',
                Installation: 'Incluse',
            },
        },
        {
            name: 'Kit Solaire UAC Business 10KVA',
            description:
                'Solution professionnelle pour bureaux et commerces. Autonomie complète 24h/24. Support technique prioritaire DBH.',
            base_price_usd: 7800.0,
            categoryName: 'Énergie Solaire',
            images: [
                'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800',
            ],
            specifications: {
                Puissance: '10KVA',
                Panneaux: '16x 450W',
                Batterie: 'Lithium 200Ah',
                Onduleur: 'Triphasé MPPT',
                Garantie: '7 ans',
                'Support 24/7': 'Inclus',
            },
        },
        {
            name: 'Projecteur LED Solaire 200W',
            description:
                'Éclairage extérieur haute puissance avec détecteur de mouvement et télécommande. Parfait pour sécuriser votre propriété.',
            base_price_usd: 85.0,
            categoryName: 'Énergie Solaire',
            images: [
                'https://images.unsplash.com/photo-1548611635-b6e78bb0d502?w=800',
            ],
            specifications: {
                Luminosité: '20000 Lumens',
                Autonomie: '12h',
                Étanchéité: 'IP67',
                'Détecteur de mouvement': 'Oui',
                Télécommande: 'Incluse',
            },
        },
        {
            name: 'Panneau Solaire 450W Monocristallin',
            description:
                'Panneau haute efficacité pour extension de système existant. Compatible avec tous les onduleurs.',
            base_price_usd: 280.0,
            categoryName: 'Énergie Solaire',
            images: [
                'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
            ],
            specifications: {
                Puissance: '450W',
                Type: 'Monocristallin',
                Efficacité: '21.5%',
                Dimensions: '2108x1048x40mm',
                Garantie: '25 ans',
            },
        },

        // --- INFORMATIQUE ---
        {
            name: 'MacBook Pro 14" M3 Max',
            description:
                'Le summum de la puissance pour les créatifs et ingénieurs de DBH. Clavier AZERTY français. Garantie internationale Apple.',
            base_price_usd: 3199.0,
            categoryName: 'Informatique',
            images: [
                'https://images.unsplash.com/photo-1517336714460-4c50426dca62?w=800',
            ],
            specifications: {
                Processeur: 'Apple M3 Max',
                RAM: '36GB Unified Memory',
                SSD: '1TB',
                Écran: '14.2" Liquid Retina XDR',
                Clavier: 'AZERTY Français',
                Garantie: '1 an Apple',
            },
        },
        {
            name: 'Dell Precision 5570 Workstation',
            description:
                'Station de travail mobile pour professionnels exigeants. Certifié pour AutoCAD, SolidWorks et Adobe Creative Suite.',
            base_price_usd: 2450.0,
            categoryName: 'Informatique',
            images: [
                'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
            ],
            specifications: {
                Processeur: 'Intel Core i9-12900H',
                RAM: '32GB DDR5',
                SSD: '1TB NVMe',
                GPU: 'NVIDIA RTX A2000',
                Écran: '15.6" 4K OLED',
            },
        },
        {
            name: 'Imprimante HP LaserJet Enterprise M507dn',
            description:
                'Imprimante laser ultra-rapide pour bureaux institutionnels. Recto-verso automatique et sécurité avancée.',
            base_price_usd: 550.0,
            categoryName: 'Informatique',
            images: [
                'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800',
            ],
            specifications: {
                Vitesse: '45 ppm',
                'Recto-Verso': 'Automatique',
                Résolution: '1200 dpi',
                Connectivité: 'Ethernet, USB, WiFi',
                'Capacité papier': '650 feuilles',
            },
        },
        {
            name: 'Serveur Dell PowerEdge T340',
            description:
                'Serveur tour pour PME. Idéal pour hébergement local de données et applications métier.',
            base_price_usd: 1850.0,
            categoryName: 'Informatique',
            images: [
                'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
            ],
            specifications: {
                Processeur: 'Intel Xeon E-2234',
                RAM: '16GB ECC',
                Stockage: '2x 1TB HDD RAID',
                'Baies disques': '8x 3.5"',
                Garantie: '3 ans ProSupport',
            },
        },

        // --- ÉLECTRONIQUE ---
        {
            name: 'Sony 75" BRAVIA XR 4K',
            description:
                "L'expérience cinéma ultime dans votre salon. Processeur cognitif XR et son Dolby Atmos intégré.",
            base_price_usd: 2400.0,
            categoryName: 'Électronique',
            images: [
                'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
            ],
            specifications: {
                Taille: '75 pouces',
                Résolution: '4K Ultra HD',
                HDR: 'Dolby Vision, HDR10',
                'Smart TV': 'Google TV',
                Audio: 'Dolby Atmos',
                Garantie: '2 ans',
            },
        },
        {
            name: 'Samsung 55" QLED Q80C',
            description:
                'Technologie Quantum Dot pour des couleurs éclatantes. Gaming 120Hz et mode ambiant.',
            base_price_usd: 1350.0,
            categoryName: 'Électronique',
            images: [
                'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
            ],
            specifications: {
                Taille: '55 pouces',
                Technologie: 'QLED Quantum Dot',
                Résolution: '4K',
                'Taux de rafraîchissement': '120Hz',
                'Smart TV': 'Tizen OS',
            },
        },
        {
            name: 'Bose SoundLink Revolve+ II',
            description:
                'Enceinte Bluetooth 360° ultra-portable. Autonomie 17h et résistance à l\'eau.',
            base_price_usd: 280.0,
            categoryName: 'Électronique',
            images: [
                'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
            ],
            specifications: {
                Type: 'Enceinte Bluetooth',
                Son: '360 degrés',
                Autonomie: '17 heures',
                Étanchéité: 'IPX4',
                Portée: '9 mètres',
            },
        },

        // --- GROS ÉLECTROMÉNAGER ---
        {
            name: 'Réfrigérateur Side-by-Side LG 600L',
            description:
                "Technologie InstaView et Inverter Linear Compressor pour une économie d'énergie maximale. Distributeur eau/glace intégré.",
            base_price_usd: 1850.0,
            categoryName: 'Gros Électroménager',
            images: [
                'https://images.unsplash.com/photo-1571175432291-6a5f5ad9322b?w=800',
            ],
            specifications: {
                Capacité: '600 Litres',
                Type: 'Side-by-Side',
                Couleur: 'Inox',
                Distributeur: 'Eau/Glace',
                Technologie: 'InstaView Door-in-Door',
                'Classe énergétique': 'A++',
            },
        },
        {
            name: 'Climatiseur Split Inverter Midea 18000 BTU',
            description:
                'Climatisation silencieuse et économique. Fonction chauffage incluse. Idéal pour grandes pièces.',
            base_price_usd: 680.0,
            categoryName: 'Gros Électroménager',
            images: [
                'https://images.unsplash.com/photo-1631545806609-4b0c4c8b6b6e?w=800',
            ],
            specifications: {
                Puissance: '18000 BTU',
                Type: 'Split Inverter',
                Fonction: 'Froid/Chaud',
                'Niveau sonore': '22 dB',
                'Surface couverte': '35-45 m²',
                Installation: 'Incluse',
            },
        },
        {
            name: 'Cuisinière Gaz Beko 5 Feux',
            description:
                'Cuisinière professionnelle avec four électrique ventilé. Grilles en fonte émaillée.',
            base_price_usd: 520.0,
            categoryName: 'Gros Électroménager',
            images: [
                'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800',
            ],
            specifications: {
                Feux: '5 feux gaz',
                Four: 'Électrique ventilé 65L',
                Grilles: 'Fonte émaillée',
                Allumage: 'Automatique',
                Sécurité: 'Thermocouple',
            },
        },
        {
            name: 'Lave-linge Hisense 10kg Inverter',
            description:
                'Machine à laver grande capacité avec moteur Inverter silencieux. 15 programmes de lavage.',
            base_price_usd: 450.0,
            categoryName: 'Gros Électroménager',
            images: [
                'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800',
            ],
            specifications: {
                Capacité: '10 kg',
                Type: 'Hublot frontal',
                Moteur: 'Inverter Direct Drive',
                Programmes: '15',
                Essorage: '1400 tr/min',
                'Classe énergétique': 'A+++',
            },
        },
    ],
};
