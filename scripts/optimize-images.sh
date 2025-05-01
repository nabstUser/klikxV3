#!/bin/bash

# Script d'optimisation des images pour Klikx
# Nécessite l'installation de imagemagick et jpegoptim pour fonctionner
# Installation: sudo apt update && sudo apt install -y imagemagick jpegoptim pngquant

# Répertoire des images
IMAGE_DIR="../public"

# Optimisation des JPG
echo "Optimisation des images JPG..."
find "$IMAGE_DIR" -type f -name "*.jpg" -exec jpegoptim --strip-all --max=85 {} \;

# Optimisation des PNG
echo "Optimisation des images PNG..."
find "$IMAGE_DIR" -type f -name "*.png" -exec pngquant --force --quality=65-80 --skip-if-larger --strip --verbose {} --output {} \;

# Redimensionnement des grandes images (optionnel - à adapter selon vos besoins)
echo "Redimensionnement des images volumineuses..."
find "$IMAGE_DIR" -type f -name "*.jpg" -exec identify -format "%w %h %f\n" {} \; | awk '$1 > 2000 || $2 > 2000 {print $3}' | while read file; do
  echo "Redimensionnement de $file..."
  convert "$IMAGE_DIR/$file" -resize 2000x2000\> "$IMAGE_DIR/$file"
done

echo "Optimisation terminée!"
