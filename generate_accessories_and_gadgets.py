import os

acc_dir = r"assets/images/accessories"
gadgets_dir = r"assets/images/gadgets"

os.makedirs(acc_dir, exist_ok=True)
os.makedirs(gadgets_dir, exist_ok=True)

def create_card_svg(filename, folder, title, category, icon_type, color1, color2):
    # Generates a sleek, high-tech product card illustration
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="{color1}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{color1}"/>
      <stop offset="100%" stop-color="{color2}"/>
    </linearGradient>
    <linearGradient id="metallic" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="45%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.45"/>
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="{color1}" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="400" height="400" fill="transparent"/>
  <circle cx="200" cy="190" r="150" fill="url(#bgGlow)"/>

  <!-- Product Illustration -->
  <g filter="url(#shadow)" transform="translate(60, 50)">'''

    if icon_type == "charger":
        svg += f'''
    <!-- Wall Charger Body -->
    <rect x="70" y="70" width="140" height="150" rx="28" fill="url(#mainGrad)" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>
    <rect x="100" y="40" width="16" height="30" rx="4" fill="#cbd5e1"/>
    <rect x="164" y="40" width="16" height="30" rx="4" fill="#cbd5e1"/>
    <!-- Ports -->
    <rect x="105" y="160" width="70" height="14" rx="7" fill="#030712"/>
    <circle cx="140" cy="167" r="3" fill="#0BB8F5"/>
    <rect x="115" y="186" width="50" height="10" rx="5" fill="#030712"/>
    <!-- Wattage Badge -->
    <text x="140" y="125" font-family="Poppins, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">FAST CHARGE</text>
    '''
    elif icon_type == "powerbank":
        svg += f'''
    <!-- Powerbank Body -->
    <rect x="50" y="30" width="180" height="240" rx="24" fill="url(#mainGrad)" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>
    <rect x="65" y="55" width="150" height="45" rx="10" fill="#020617"/>
    <text x="140" y="84" font-family="-apple-system, Montserrat, sans-serif" font-size="18" font-weight="700" fill="#38ef7d" text-anchor="middle">100% ⚡</text>
    <!-- USB Ports -->
    <rect x="90" y="240" width="30" height="10" rx="3" fill="#090d16"/>
    <rect x="160" y="240" width="30" height="10" rx="3" fill="#090d16"/>
    <circle cx="140" cy="160" r="32" fill="none" stroke="#ffffff" stroke-dasharray="6,4" stroke-width="2" opacity="0.4"/>
    <text x="140" y="166" font-family="Poppins, sans-serif" font-size="12" font-weight="600" fill="#ffffff" text-anchor="middle">20000 mAh</text>
    '''
    elif icon_type == "magsafe":
        svg += f'''
    <!-- MagSafe Disc -->
    <circle cx="140" cy="140" r="100" fill="url(#metallic)"/>
    <circle cx="140" cy="140" r="88" fill="url(#mainGrad)"/>
    <circle cx="140" cy="140" r="50" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="14,6" opacity="0.8"/>
    <path d="M 140,110 L 140,170 M 110,140 L 170,140" stroke="#0BB8F5" stroke-width="5" stroke-linecap="round"/>
    <circle cx="140" cy="140" r="15" fill="#0BB8F5"/>
    '''
    elif icon_type == "cable":
        svg += f'''
    <!-- Braided Cable -->
    <path d="M 50,220 C 50,80 230,80 230,220" fill="none" stroke="url(#mainGrad)" stroke-width="22" stroke-linecap="round"/>
    <path d="M 80,220 C 80,120 200,120 200,220" fill="none" stroke="#030712" stroke-width="12" stroke-linecap="round"/>
    <!-- Connector Ends -->
    <rect x="36" y="195" width="28" height="55" rx="8" fill="url(#metallic)"/>
    <rect x="216" y="195" width="28" height="55" rx="8" fill="url(#metallic)"/>
    <rect x="42" y="245" width="16" height="20" rx="3" fill="#94a3b8"/>
    <rect x="222" y="245" width="16" height="20" rx="3" fill="#94a3b8"/>
    '''
    elif icon_type == "case":
        svg += f'''
    <!-- Protective Case -->
    <rect x="65" y="25" width="150" height="250" rx="28" fill="url(#mainGrad)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2"/>
    <rect x="85" y="45" width="45" height="45" rx="12" fill="#030712" stroke="#334155" stroke-width="2"/>
    <circle cx="107" cy="67" r="12" fill="#1e293b"/>
    <circle cx="107" cy="67" r="6" fill="#0BB8F5"/>
    <circle cx="140" cy="155" r="45" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="10,6" opacity="0.7"/>
    <rect x="135" y="205" width="10" height="25" rx="5" fill="#ffffff" opacity="0.6"/>
    '''
    elif icon_type == "speaker":
        svg += f'''
    <!-- Bluetooth Speaker (JBL style cylinder) -->
    <rect x="40" y="90" width="200" height="110" rx="45" fill="url(#mainGrad)" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2"/>
    <circle cx="45" cy="145" r="40" fill="#020617"/>
    <circle cx="235" cy="145" r="40" fill="#020617"/>
    <rect x="85" y="125" width="110" height="40" rx="10" fill="#020617" opacity="0.8"/>
    <text x="140" y="152" font-family="Poppins, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="3">SOUND</text>
    <!-- Passive Radiators -->
    <circle cx="45" cy="145" r="22" fill="{color1}"/>
    <circle cx="235" cy="145" r="22" fill="{color1}"/>
    '''
    elif icon_type == "headphone":
        svg += f'''
    <!-- Over-Ear Headphones -->
    <path d="M 60,160 C 60,60 220,60 220,160" fill="none" stroke="url(#mainGrad)" stroke-width="16" stroke-linecap="round"/>
    <rect x="35" y="140" width="45" height="85" rx="20" fill="url(#metallic)"/>
    <rect x="200" y="140" width="45" height="85" rx="20" fill="url(#metallic)"/>
    <rect x="45" y="150" width="30" height="65" rx="14" fill="{color2}"/>
    <rect x="205" y="150" width="30" height="65" rx="14" fill="{color2}"/>
    <circle cx="60" cy="182" r="6" fill="#0BB8F5"/>
    <circle cx="220" cy="182" r="6" fill="#0BB8F5"/>
    '''
    elif icon_type == "earbuds":
        svg += f'''
    <!-- Wireless Earbuds Case & Pods -->
    <rect x="65" y="80" width="150" height="120" rx="36" fill="url(#metallic)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2"/>
    <line x1="65" y1="125" x2="215" y2="125" stroke="#475569" stroke-width="2"/>
    <circle cx="140" cy="155" r="5" fill="#38ef7d"/>
    <!-- Earbuds resting -->
    <circle cx="105" cy="65" r="20" fill="url(#mainGrad)"/>
    <rect x="100" y="65" width="10" height="35" rx="5" fill="url(#mainGrad)"/>
    <circle cx="175" cy="65" r="20" fill="url(#mainGrad)"/>
    <rect x="170" y="65" width="10" height="35" rx="5" fill="url(#mainGrad)"/>
    '''
    elif icon_type == "watch":
        svg += f'''
    <!-- Smartwatch -->
    <rect x="110" y="15" width="60" height="270" rx="15" fill="url(#metallic)"/>
    <rect x="75" y="75" width="130" height="150" rx="36" fill="#030712" stroke="url(#mainGrad)" stroke-width="4"/>
    <circle cx="140" cy="150" r="50" fill="url(#mainGrad)" opacity="0.3"/>
    <text x="140" y="142" font-family="-apple-system, sans-serif" font-size="24" font-weight="800" fill="#ffffff" text-anchor="middle">10:08</text>
    <text x="140" y="165" font-family="Poppins, sans-serif" font-size="12" font-weight="600" fill="#38ef7d" text-anchor="middle">12,480 STEPS</text>
    <circle cx="140" cy="150" r="42" fill="none" stroke="#0BB8F5" stroke-width="4" stroke-dasharray="180,50"/>
    '''
    else:
        # Default gadget/accessory generic
        svg += f'''
    <rect x="60" y="50" width="160" height="180" rx="28" fill="url(#mainGrad)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="140" cy="140" r="45" fill="#ffffff" opacity="0.15"/>
    <path d="M 120,140 L 160,140 M 140,120 L 140,160" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
    '''

    svg += f'''
  </g>

  <!-- Title footer -->
  <text x="200" y="375" font-family="Poppins, sans-serif" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="middle" letter-spacing="1">{category.upper()}</text>
</svg>'''

    filepath = f"{folder}/{filename}.svg"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg)

accessories_list = [
    ("apple-20w-adapter", "charger", "#3b82f6", "#1d4ed8"),
    ("samsung-25w-charger", "charger", "#06b6d4", "#0891b2"),
    ("baseus-65w-charger", "charger", "#f59e0b", "#d97706"),
    ("anker-powerbank-20000", "powerbank", "#10b981", "#059669"),
    ("magsafe-charger", "magsafe", "#8b5cf6", "#6d28d9"),
    ("baseus-cable-100w", "cable", "#ec4899", "#be185d"),
    ("privacy-tempered-glass", "case", "#64748b", "#334155"),
    ("magsafe-clear-case", "case", "#0284c7", "#0369a1"),
    ("baseus-car-mount", "magsafe", "#6366f1", "#4338ca"),
    ("camera-lens-protector", "magsafe", "#14b8a6", "#0f766e"),
    ("apple-lightning-cable", "cable", "#a855f7", "#7e22ce"),
    ("silicone-case", "case", "#f43f5e", "#be123c"),
    ("baseus-powerbank-10000", "powerbank", "#0ea5e9", "#0284c7"),
    ("magsafe-wallet", "case", "#d97706", "#b45309"),
    ("xiaomi-33w-charger", "charger", "#ea580c", "#c2410c"),
    ("baseus-audio-adapter", "cable", "#84cc16", "#65a30d"),
    ("waterproof-pouch", "case", "#06b6d4", "#0e7490"),
    ("gaming-sleeves", "generic", "#e11d48", "#9f1239"),
    ("phone-stand", "generic", "#475569", "#1e293b"),
    ("uv-sterilizer", "generic", "#9333ea", "#6b21a8")
]

for name, itype, c1, c2 in accessories_list:
    create_card_svg(name, acc_dir, name, "Original Accessory", itype, c1, c2)

gadgets_list = [
    ("jbl-flip-6", "speaker", "#f97316", "#c2410c"),
    ("sony-wh1000xm5", "headphone", "#334155", "#0f172a"),
    ("soundcore-liberty-4", "earbuds", "#0ea5e9", "#0369a1"),
    ("airpods-pro-2", "earbuds", "#f1f5f9", "#94a3b8"),
    ("galaxy-watch-6", "watch", "#6366f1", "#3730a3"),
    ("xiaomi-band-8", "watch", "#10b981", "#047857"),
    ("jbl-clip-4", "speaker", "#ec4899", "#9d174d"),
    ("baseus-bowie-h1", "headphone", "#8b5cf6", "#5b21b6")
]

for name, itype, c1, c2 in gadgets_list:
    create_card_svg(name, gadgets_dir, name, "Smart Gadget", itype, c1, c2)

print("Generated all accessories and gadget SVGs successfully.")
