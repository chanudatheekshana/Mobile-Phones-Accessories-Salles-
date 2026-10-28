import os

phones_dir = r"assets/images/phones"
acc_dir = r"assets/images/accessories"
gadgets_dir = r"assets/images/gadgets"

os.makedirs(phones_dir, exist_ok=True)
os.makedirs(acc_dir, exist_ok=True)
os.makedirs(gadgets_dir, exist_ok=True)

def phone_svg(title, brand, color1, color2, camera_type="triple"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="{color1}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{color1}"/>
      <stop offset="100%" stop-color="{color2}"/>
    </linearGradient>
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0f1d"/>
      <stop offset="50%" stop-color="#07182f"/>
      <stop offset="100%" stop-color="#030811"/>
    </linearGradient>
    <linearGradient id="screenWallpaper" x1="20%" y1="20%" x2="80%" y2="80%">
      <stop offset="0%" stop-color="{color1}" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#0BB8F5" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#6C5CE7" stop-opacity="0.3"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.5"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="{color1}" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="400" height="400" fill="transparent"/>
  <circle cx="200" cy="200" r="160" fill="url(#bgGlow)"/>

  <!-- Main Phone Body with filter shadow -->
  <g filter="url(#shadow)" transform="translate(115, 45)">
    <!-- Titanium frame -->
    <rect x="0" y="0" width="170" height="310" rx="32" fill="url(#bodyGrad)" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.5"/>
    
    <!-- Screen bezel -->
    <rect x="5" y="5" width="160" height="300" rx="27" fill="#030712"/>
    
    <!-- Dynamic Display Screen -->
    <rect x="8" y="8" width="154" height="294" rx="24" fill="url(#screenGrad)"/>
    
    <!-- Ambient Wallpaper Flow -->
    <path d="M 8,150 Q 80,100 162,170 L 162,302 L 8,302 Z" fill="url(#screenWallpaper)" opacity="0.45"/>
    <circle cx="120" cy="90" r="45" fill="{color1}" opacity="0.35" filter="blur(15px)"/>
    <circle cx="50" cy="220" r="55" fill="#0BB8F5" opacity="0.25" filter="blur(20px)"/>

    <!-- Dynamic Island / Punch hole -->
    <rect x="62" y="16" width="46" height="13" rx="6.5" fill="#000000"/>
    <circle cx="96" cy="22.5" r="3" fill="#1e293b"/>
    <circle cx="72" cy="22.5" r="2" fill="#0ea5e9" opacity="0.8"/>

    <!-- Clock & Date -->
    <text x="85" y="65" font-family="-apple-system, Montserrat, sans-serif" font-size="28" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5">09:41</text>
    <text x="85" y="80" font-family="-apple-system, Montserrat, sans-serif" font-size="9" font-weight="500" fill="#94a3b8" text-anchor="middle">Sunday, October 26</text>

    <!-- Home Indicator -->
    <rect x="55" y="292" width="60" height="3" rx="1.5" fill="#ffffff" opacity="0.7"/>

    <!-- Side buttons -->
    <rect x="-3" y="65" width="3" height="24" rx="1.5" fill="{color2}"/>
    <rect x="-3" y="100" width="3" height="38" rx="1.5" fill="{color2}"/>
    <rect x="-3" y="145" width="3" height="38" rx="1.5" fill="{color2}"/>
    <rect x="170" y="90" width="3" height="50" rx="1.5" fill="{color2}"/>
  </g>

  <!-- Small Brand & Badge overlay -->
  <g transform="translate(115, 365)">
    <text x="85" y="12" font-family="Poppins, sans-serif" font-size="11" font-weight="600" fill="#94a3b8" text-anchor="middle" letter-spacing="1.5">{brand.upper()}</text>
  </g>
</svg>'''

phones = [
    ("iphone-15-pro-max", "Apple", "#2d3748", "#1a202c"),
    ("samsung-s24-ultra", "Samsung", "#4a5568", "#2b2d42"),
    ("samsung-galaxy-a15", "Samsung", "#0083B0", "#00B4DB"),
    ("iphone-13-used", "Apple", "#2b5876", "#4e4376"),
    ("xiaomi-14", "Xiaomi", "#00c6ff", "#0072ff"),
    ("poco-x6-pro", "Poco", "#f7b733", "#fc4a1a"),
    ("redmi-note-13-pro", "Redmi", "#11998e", "#38ef7d"),
    ("samsung-s22-plus-used", "Samsung", "#434343", "#000000"),
    ("vivo-v30-5g", "Vivo", "#00c9ff", "#92fe9d"),
    ("iphone-14-pro-used", "Apple", "#53346B", "#4E54C8")
]

for filename, brand, c1, c2 in phones:
    with open(f"{phones_dir}/{filename}.svg", "w", encoding="utf-8") as f:
        f.write(phone_svg(filename, brand, c1, c2))

print("Created 10 phone SVGs successfully.")
