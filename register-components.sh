#!/bin/bash

# Backup the existing config
cp theme.config.tsx theme.config.tsx.bak

# Add imports if they do not exist
grep -q "import Image from 'next/image'" theme.config.tsx || \
  sed -i "1i import Image from 'next/image'" theme.config.tsx

grep -q "import TeamCards" theme.config.tsx || \
  sed -i "1i import TeamCards from '@/components/TeamCards'" theme.config.tsx

# Add components registration if not present
grep -q "components:" theme.config.tsx || \
  echo -e "\nexport const components = { Image, TeamCards };" >> theme.config.tsx

echo "✅ Image and TeamCards registered in theme.config.tsx"

