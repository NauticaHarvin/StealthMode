#!/usr/bin/env bash
# Downloads every image this site uses from Framer's CDN into assets/img/.
# Run once from the project root:  bash scripts/download-assets.sh
# After this the site has no dependency on Framer.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/img
CDN="https://framerusercontent.com/images"
FILES=(
  "logo.png aLtf2acYdXBlxcdS0fHwHM5k8c.png"
  "hero-bg.png f3nL13iNp1N7Pg6x37FzVgzg.png"
  "gallery-1.jpg TRAoU3epjWbVl0efchYFEO28ugY.jpg"
  "gallery-2.jpg 55ZGT1Yt09uBuw7UDfieDXLbIQ.jpg"
  "gallery-3.jpg 7gYgDLBCFcz6Fp5v6De2M3QsjAk.jpg"
  "gallery-4.jpg 4cNO6HSddAEje7x0Y7YykaHVgCE.jpg"
  "chart-pie.png 5Ldw0dcNe266RHADE34yYcZDZN8.png"
  "avatar-client.jpg HH8KrojyxZx6X20z1r13CSwiiWE.jpg"
  "avatar-team.jpg 1cWxyH3NULyTRplCQ1ZfKK2g.jpg"
  "services-showcase.jpg 3Vaf8IQA9s5gOTr4rddfOwPxJ8.jpg"
  "testimonial-1.jpg aXm7l3DIpRNKp23wuPRMMWGFCxc.jpg"
  "testimonial-2.jpg JKorM5B0WmJOc8WoLSGW2e0hNG8.jpg"
  "testimonial-3.jpg 5P0eN6qtSxQg8Lrk6rw2GR9e7eI.jpg"
  "testimonial-4.jpg SxzTLiNEeuCPxt7HTFNnCyB5Vo.jpg"
  "logo-client-1.svg 6tTbkXggWgQCAJ4DO2QEdXXmgM.svg"
  "logo-client-2.svg 11KSGbIZoRSg4pjdnUoif6MKHI.svg"
  "logo-client-3.png p2FbaquHwbI3DwnTqO8hw76ZWE.png"
  "logo-client-4.png nKrXg0gwBaFmmkTr6JvL9TXFA.png"
  "logo-client-5.png EgT20fKjrobGPJihpg626pQw.png"
  "logo-client-6.png kjBlEte061ge1vs2J99cYZtzBo.png"
  "logo-client-7.png M7qPO1vdDrCfNCYhwDLqXYX6eWU.png"
  "hero-services.jpg bh6twORlGIpOIrIMuIkukevjAZM.jpg"
  "service-brand-identity.jpg RtfWr8jd3VeVSMWUCxaOsrObE44.jpg"
  "service-graphic-design.jpg mwZ7ybDXbnVfQXHMMjzWiP7BpI.jpg"
  "service-framer-design.jpg GjuCEc3VTzQ5osnFXD5Vu6Tx8Y.jpg"
  "service-web-design.jpg 0g1NFFzgEwVSVsRaGntwvAkeSIA.jpg"
  "hero-about.jpg pp9cwGQjxFsdAc3D2ufUtzfufU.jpg"
  "about-mission.jpg jOsKJnuv0mdMiIeuMmIz2NVvts.jpg"
  "about-tour.jpg XOgTNGhNhIIdGFoazkqqnG9QmE.jpg"
  "team-1.jpg 7ckekOZAa0J28C2T3IfYTvNDv5U.jpg"
  "team-2.jpg iABb6ejla3A5ZzE4zgxiPqBaYHI.jpg"
  "team-3.jpg LsJGvkbYbF1y4ifkFrjeNfRfzYM.jpg"
  "team-4.jpg 8jpvtN1LhtGTLfO40jCfOWkYilI.jpg"
  "team-5.jpg rsJ7qH7Mbs7CJkuvl24AzIdFM8Y.jpg"
  "team-6.jpg 1ApcT7kVDOZTELD8XFISmocdiA.jpg"
  "hero-contact.jpg qRhVEP3SUKCDQjJRRVt4OnR4go.jpg"
  "case-greentech-solutions.jpg 12IM56X1J3khgmEakCsZKd9EGLY.jpg"
  "case-healthsync.jpg Ok6cd4z826F0Gks9sFfcGFjFzY.jpg"
  "case-ecobrands.jpg tD5WvGTRPvrCl4Sp2YxwRHyGLCU.jpg"
  "case-fitness-pro.jpg Im1JPurytJLf7jHh3xmzZTG0Q.jpg"
  "case-urban-apparel.jpg lbVqqE24m5hD12toyeGwZW0.jpg"
  "case-brightminds-academy.jpg wEGJDX3FOPrd8O1W1oAwcHOYNQ.jpg"
)
for pair in "${FILES[@]}"; do
  name="${pair%% *}"; id="${pair##* }"
  if [[ -f "assets/img/$name" ]]; then echo "✓ $name (exists)"; continue; fi
  # large photos are capped at 2048px wide to keep the repo light
  q=""; [[ "$id" == *.jpg ]] && q="?scale-down-to=2048"
  curl -fsSL "$CDN/$id$q" -o "assets/img/$name" && echo "↓ $name"
done
echo "Done — $(ls assets/img | wc -l | tr -d " ") files in assets/img"
