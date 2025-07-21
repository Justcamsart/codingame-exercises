# The Descent 

## Description du problème

Votre vaisseau spatial doit atterrir mais des montagnes bloquent le chemin ! À chaque tour, vous devez **détruire la montagne la plus haute** en tirant dessus pour créer un passage sûr.

### Règles du jeu
- **8 montagnes** avec des hauteurs variables (0-9)
- **Objectif :** Tirer sur la montagne la plus haute à chaque tour
- **Progression :** Le vaisseau descend après chaque tir
- **Répétition :** Le processus continue jusqu'à l'atterrissage

## Format des données

### Entrée
```
8 lignes contenant chacune un entier représentant la hauteur d'une montagne
Ordre : de gauche à droite (index 0 à 7)
```

### Sortie
```
Un entier : l'index de la montagne sur laquelle tirer (0-7)
```

## 🧪 Exemple concret

### Situation initiale :
```
Index:   0  1  2  3  4  5  6  7
Hauteur: 0  1  3  7  2  1  0  4
         ^  ^  ^  ^ ^  ^  ^  ^
```

**Entrée du tour :**
```
0
1  
3
7  ← Plus haute (index 3)
2
1
0
4
```

**Sortie attendue :**
```
3
```

## Stratégie de résolution

### Algorithme optimal
1. **Initialisation :** `maxHeight = -1`, `targetIndex = 0`
2. **Parcours :** Pour chaque montagne (i = 0 à 7)
   - Lire la hauteur actuelle
   - Si `hauteur > maxHeight` → Nouvelle cible trouvée
3. **Résultat :** Retourner l'index de la montagne la plus haute

### Complexité
- **Temps :** O(1) - Exactement 8 itérations constantes
- **Espace :** O(1) - 2 variables seulement
- **Performance :** ~1ms (contrainte : 100ms)

## 🔍 Cas particuliers gérés

| Cas | Comportement | Exemple |
|-----|--------------|---------|
| **Égalité** | Prend la **première** montagne | `[5,5,5]` → index `0` |
| **Toutes nulles** | Prend l'index `0` | `[0,0,0
